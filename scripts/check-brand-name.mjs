/**
 * Fails when the brand name is hardcoded outside src/config/.
 *
 * Terms come from src/config/site.ts (name, shortName, legalName, wordmark,
 * domain, email). A rename stays a one-file edit: this script follows whatever
 * those fields say, and the rest of src/ must not repeat them.
 *
 * Usage: node scripts/check-brand-name.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const configPath = join(root, "src", "config", "site.ts");
const srcRoot = join(root, "src");
const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".md",
  ".svg",
  ".json",
  ".html",
]);

function readField(source, key) {
  const pattern = new RegExp(
    `\\b${key}\\s*:\\s*(["'])((?:\\\\.|(?!\\1).)*)\\1`,
  );
  const match = source.match(pattern);
  return match ? match[2] : "";
}

function walk(dir, files) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const info = statSync(full);
    if (info.isDirectory()) {
      if (relative(srcRoot, full).split(/[/\\]/).includes("config")) continue;
      walk(full, files);
      continue;
    }
    if (textExtensions.has(extname(full))) files.push(full);
  }
  return files;
}

if (!existsSync(configPath)) {
  console.error("check-brand-name: missing src/config/site.ts");
  process.exit(1);
}

const configSource = readFileSync(configPath, "utf8");
const fields = ["name", "shortName", "legalName", "wordmarkText", "domain", "email"];
const terms = [
  ...new Set(
    fields
      .map((key) => readField(configSource, key).trim().toLowerCase())
      .filter((value) => value.length >= 4),
  ),
];

if (!readField(configSource, "name")) {
  console.error(
    "check-brand-name: could not read brand.name from src/config/site.ts",
  );
  process.exit(1);
}

if (terms.length === 0) {
  console.error("check-brand-name: no brand terms to search for");
  process.exit(1);
}

const hits = [];
for (const file of walk(srcRoot, [])) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    const found = terms.find((term) => lower.includes(term));
    if (!found) return;
    hits.push({
      file: relative(root, file),
      line: index + 1,
      term: found,
      text: line.trim().slice(0, 180),
    });
  });
}

const logoPng = join(root, "public", "logo.png");
if (existsSync(logoPng)) {
  hits.push({
    file: "public/logo.png",
    line: 1,
    term: "logo.png",
    text: "PNG bakes the company name into the image. Use the text wordmark.",
  });
}

if (hits.length > 0) {
  console.error(
    "Brand strings are hardcoded outside src/config/. Move them into src/config/site.ts.\n",
  );
  for (const hit of hits) {
    console.error(`${hit.file}:${hit.line}: found "${hit.term}"`);
    console.error(`  ${hit.text}`);
  }
  process.exit(1);
}

console.log(
  `check-brand-name: ok (${terms.length} terms from src/config/site.ts, src/ is clear)`,
);
