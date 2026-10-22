import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "src/config/site.ts");
const config = fs.readFileSync(configPath, "utf8");

function readExport(name) {
  const match = config.match(
    new RegExp(`export const ${name} = ("[^"]*"|\\[[\\s\\S]*?\\])`),
  );
  if (!match) {
    console.error(`Could not read export const ${name} from src/config/site.ts`);
    process.exit(1);
  }
  return match[1];
}

const brandName = readExport("brandName").replace(/^"|"$/g, "");
const guardLiterals = [...readExport("brandGuard").matchAll(/"([^"]+)"/g)].map(
  (match) => match[1],
);

if (!brandName || brandName.length < 2) {
  console.error("brandName is missing.");
  process.exit(1);
}

if (!guardLiterals.some((literal) => literal.toLowerCase() === brandName.toLowerCase())) {
  console.error("brandGuard must include brandName so a rename cannot drift.");
  process.exit(1);
}

function readProp(prop) {
  const match = config.match(new RegExp(`\\b${prop}:\\s*"([^"]*)"`));
  return match ? match[1] : null;
}

const bookingUrl = readProp("bookingUrl");
const bookingFallback = readProp("bookingFallback");
if (bookingUrl === "#") {
  console.error('site.bookingUrl must not be "#". Leave it empty until a real https URL exists.');
  process.exit(1);
}
if (!bookingFallback || bookingFallback === "#" || !bookingFallback.startsWith("mailto:")) {
  console.error("site.bookingFallback must be a mailto: URL and must not be \"#\".");
  process.exit(1);
}

const needles = [...new Set([brandName, ...guardLiterals])].filter((value) => value.trim().length >= 2);

const proofBanned = [
  "800K",
  "800,000",
  "Emporia",
  "What We've Cooked",
  "What We’ve Cooked",
  "Let Us Cook",
  "Book a Table",
  "Future Client",
  "Sleep Diagnostics",
  "Energy Management Platform",
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "config" && path.basename(dir) === "src") continue;
      files.push(...walk(full));
    } else if (/\.(tsx?|jsx?|css|mjs|svg|md)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(path.join(root, "src"));
const failures = [];

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const lower = text.toLowerCase();

  for (const needle of needles) {
    const found = lower.indexOf(needle.toLowerCase());
    if (found !== -1) {
      failures.push(
        `${relative}:${lineOf(text, found)} brand literal "${needle}" is hardcoded outside src/config`,
      );
    }
  }

  for (const banned of proofBanned) {
    const found = text.indexOf(banned);
    if (found !== -1) {
      failures.push(`${relative}:${lineOf(text, found)} day-job proof "${banned}" must stay off the site`);
    }
  }

  const hashLink = text.match(/href\s*=\s*(?:\{\s*)?(["'`])#\1/);
  if (hashLink) {
    failures.push(
      `${relative}:${lineOf(text, hashLink.index)} href="#" is not allowed. Book-a-call uses getBookCall().`,
    );
  }

  if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
    const price = text.match(/\$\s?\d/);
    if (price) {
      failures.push(
        `${relative}:${lineOf(text, price.index)} prices stay commented in src/content/home.ts. The page says "Scoped on a call".`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Brand and copy checks failed:\n");
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(
  `Brand check passed. "${brandName}" is confined to src/config, booking links are not "#", and day-job proof is absent.`,
);
