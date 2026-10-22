import { basePath } from "@/config/site";

export { basePath };

/** Prefix a root-relative public asset so it resolves under the Pages path. */
export function withBasePath(path: string): string {
  const prefix = basePath === "/" ? "" : basePath.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${suffix}`;
}
