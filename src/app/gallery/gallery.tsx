"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import close from "@/assets/close.svg";
import download from "@/assets/download.svg";
import arrowLeft from "@/assets/left.svg";
import arrowRight from "@/assets/right.svg";

export interface GalleryImage {
  thumbSrc: string; // e.g. "/gallery/File_1.jpg"
  fullSrc: string; // e.g. "/gallery/File_1.jpg"
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);
  const handlePrev = useCallback(() => {
    const idx = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(idx);
  }, [selectedIndex, images]);
  const handleNext = useCallback(() => {
    const idx = (selectedIndex + 1) % images.length;
    setSelectedIndex(idx);
  }, [selectedIndex, images]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop()!;
    link.click();
  };

  return (
    <div className="w-full m-auto sm:p-4">
      {/* GRID */}
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-1 mt-32">
        {images.map((image, idx) => (
          <div key={idx} className="p-2">
            <Image
              src={image.thumbSrc}
              alt={image.alt}
              className="w-full h-80 object-cover rounded-lg cursor-pointer hover:cursor-zoom-in transition-transform transform hover:scale-105"
              onClick={() => handleOpen(idx)}
              width={400}
              height={400}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={40}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && images[selectedIndex] && (
        <div className="fixed inset-0 flex flex-col bg-black bg-opacity-90 z-50">
          <div className="flex justify-around items-start mt-20">
            <div className="grid space-y-96">
              <button onClick={handleClose} className="rounded">
                <Image src={close} alt="Close" width={48} height={48} />
              </button>
              <button onClick={handlePrev} className="rounded">
                <Image src={arrowLeft} alt="Previous" width={32} height={32} />
              </button>
            </div>

            <div className="flex items-center justify-center sm:mt-10">
              <Image
                src={images[selectedIndex].fullSrc}
                alt={images[selectedIndex].alt}
                className="object-contain rounded-lg w-[70vw] h-[74vh]"
                width={1400}
                height={1000}
                sizes="70vw"
                quality={90}
                priority
              />
            </div>

            <div className="grid space-y-96">
              <button
                onClick={() => handleDownload(images[selectedIndex].fullSrc)}
                className="rounded"
              >
                <Image src={download} alt="Download" width={48} height={48} />
              </button>
              <button onClick={handleNext} className="rounded">
                <Image src={arrowRight} alt="Next" width={32} height={32} />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto p-2 mt-10">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-24 h-24 p-1 cursor-pointer ${
                  idx === selectedIndex
                    ? "border-2 border-zinc-500 rounded-lg"
                    : ""
                }`}
                onClick={() => handleOpen(idx)}
              >
                <Image
                  src={image.thumbSrc}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded"
                  width={96}
                  height={96}
                  quality={40}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
