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
    .sort((a, b) => {
      const na = +a.match(/\d+/)![0];
      const nb = +b.match(/\d+/)![0];
      return na - nb;
    });

  const images = files.map((f) => ({
    src: `/gallery/${f}`,
    alt: f,
  }));

  return (
    <>
      <BackgroundCellAnimation />
      <Gallery images={images} />
    </>
  );
}
