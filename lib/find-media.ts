import fs from "node:fs";
import path from "node:path";

// Server-only helper: returns the public URL of the first `<dir>/<basename>.<ext>`
// that exists under /public, so media can be added just by dropping in a file.
export function findMedia(dir: string, basename: string, exts: string[]) {
  for (const ext of exts) {
    const file = `${basename}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", dir, file))) return `/${dir}/${file}`;
  }
  return undefined;
}

export const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "avif"];
export const VIDEO_EXTS = ["mp4", "webm"];
export const LOGO_EXTS  = ["svg", "png", "webp"];
