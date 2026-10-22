import type { Metadata } from "next";
import { site } from "@/config/site";
import { fill } from "@/lib/fill";

/** Per-page title, description, and social tags. Image paths stay relative to metadataBase. */
export function pageMeta(title: string, description: string, path: string): Metadata {
  const resolvedTitle = fill(title);
  const resolvedDescription = fill(description);
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: site.assets.social,
          width: 400,
          height: 400,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [site.assets.social],
    },
  };
}
