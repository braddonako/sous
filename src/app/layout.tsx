import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { brand, theme } from "@/config/site";
import { home } from "@/content/home";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
    type: "website",
    locale: "en_US",
    siteName: brand.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
