"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import Image1 from "@/assets/gallery/File_1.jpeg";
import Image2 from "@/assets/gallery/File_2.jpeg";
import Image3 from "@/assets/gallery/File_3.jpeg";
import Image4 from "@/assets/gallery/File_4.jpeg";
import Image5 from "@/assets/gallery/File_5.jpeg";
import Image6 from "@/assets/gallery/File_6.jpeg";
import Image7 from "@/assets/gallery/File_7.jpeg";
import Image8 from "@/assets/gallery/File_8.jpeg";
import Image9 from "@/assets/gallery/File_9.jpeg";
import Image10 from "@/assets/gallery/File_10.jpg";
import Image11 from "@/assets/gallery/File_11.jpg";
import Image12 from "@/assets/gallery/File_12.jpg";

import close from "@/assets/close.svg";
import download from "@/assets/download.svg";
import arrowLeft from "@/assets/left.svg";
import arrowRight from "@/assets/right.svg";

const images = [
  { src: Image1, alt: "Image 1" },
  { src: Image2, alt: "Image 2" },
  { src: Image3, alt: "Image 3" },
  { src: Image4, alt: "Image 4" },
  { src: Image5, alt: "Image 5" },
  { src: Image6, alt: "Image 6" },
  { src: Image7, alt: "Image 7" },
  { src: Image8, alt: "Image 8" },
  { src: Image9, alt: "Image 9" },
  { src: Image10, alt: "Image 10" },
  { src: Image11, alt: "Image 11" },
  { src: Image12, alt: "Image 12" },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | StaticImageData | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handlePrev = useCallback(() => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex].src);
    setSelectedIndex(newIndex);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[newIndex].src);
    setSelectedIndex(newIndex);
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleOpen = (src: string | StaticImageData, index: number) => {
    setSelectedImage(src);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleDownload = (src: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop()!;
    link.click();
  };

  return (
    <div className="w-full m-auto sm:p-4">
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-1 mt-32">
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <Image
              src={image.src as StaticImageData}
              alt={image.alt}
              className="w-full h-80 object-cover rounded-lg cursor-pointer hover:cursor-zoom-in transition-transform transform hover:scale-105"
              onClick={() => handleOpen(image.src, index)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex flex-col bg-black bg-opacity-90"
          style={{ zIndex: 99 }}
        >
          <div className="flex justify-around items-start mt-32">
            <div className="grid space-y-96">
              <button className="rounded" onClick={handleClose}>
                <Image src={close} alt="" className="w-12" />
              </button>
              <button className="rounded" onClick={handlePrev}>
                <Image src={arrowLeft} alt="Previous" className="w-8" />
              </button>
            </div>

            <div className="flex items-center justify-center sm:mt-10">
              <Image
                src={selectedImage as StaticImageData}
                alt="Selected Image"
                width={1000}
                height={1000}
                className="object-contain rounded-lg"
              />
            </div>
            <div className="grid space-y-96">
              <button
                className="rounded"
                onClick={() =>
                  handleDownload((selectedImage as StaticImageData).src)
                }
              >
                <Image src={download} alt="" className="w-12" />
              </button>
              <button className="rounded" onClick={handleNext}>
                <Image src={arrowRight} alt="Next" className="w-8" />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto p-2 mt-10">
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-24 h-24 p-1 cursor-pointer ${
                  index === selectedIndex
                    ? "border-2 border-zinc-500 rounded-lg"
                    : ""
                }`}
                onClick={() => handleOpen(image.src, index)}
              >
                <Image
                  src={image.src as StaticImageData}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded"
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
