// src/app/gallery/page.tsx
import fs from "fs";
import path from "path";
import { BackgroundCellAnimation } from "@/app/gallery/BackgroundRippleEffect";
import Gallery from "@/app/gallery/gallery";

export default async function GalleryPage() {
  // This runs at build time
  const dir = path.join(process.cwd(), "public", "gallery");
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => ({
      name: f,
      mtimeMs: fs.statSync(path.join(dir, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .map((f) => f.name);

  const images = files.map((f) => ({
    thumbSrc: `/gallery/${f}`,
    fullSrc: `/gallery/${f}`,
    alt: f,
  }));

  return (
    <>
      <BackgroundCellAnimation />
      <Gallery images={images} />
    </>
  );
}
