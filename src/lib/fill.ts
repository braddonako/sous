import { site } from "@/config/site";

/** Replace copy tokens. The brand name stays in src/config/site.ts. */
export function fill(input: string): string {
  return input
    .replaceAll("{brand}", site.name)
    .replaceAll("{location}", site.location)
    .replaceAll("{serviceArea}", site.serviceArea)
    .replaceAll("{year}", String(new Date().getFullYear()));
}
