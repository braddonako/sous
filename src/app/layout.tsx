import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import { home } from "@/content/home";
import { withBasePath } from "@/lib/base-path";
import { fill } from "@/lib/fill";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const title = fill(home.meta.title);
const description = fill(home.meta.description);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  icons: {
    icon: [
      { url: withBasePath(site.assets.favicon), type: "image/svg+xml" },
      { url: withBasePath(site.assets.favicon32), sizes: "32x32", type: "image/png" },
      { url: withBasePath(site.assets.favicon16), sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: withBasePath(site.assets.appleTouch), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: site.assets.social, width: 400, height: 400, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: site.theme === "kitchen" ? "#F6F0E4" : "#121417",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeClass = site.theme === "kitchen" ? "theme-kitchen" : "";
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plex.variable} ${fraunces.variable} ${themeClass}`.trim()}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
