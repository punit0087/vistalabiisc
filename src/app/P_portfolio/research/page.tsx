"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import bg1 from "@/app/P_portfolio/assets/bg1.png";
import star_r from "@/app/P_portfolio/assets/star.svg";
import "@/app/P_portfolio/components/style.css";

import ScrollButton from "@/app/P_portfolio/components/ScrollButton";

interface ResearchItem {
  link: string;
  imageSrc: string;
  title: string;
  description: string;
}

const DEFAULT_IMAGE_WIDTH = 280;
const DEFAULT_IMAGE_HEIGHT = 200;

export default function Research() {
  const [researchData, setResearchData] = useState<ResearchItem[]>([]);

  useEffect(() => {
    fetch("/P_portfolio/research/research.json")
      .then((response) => response.json())
      .then((data) => setResearchData(data));
  }, []);

  return (
    <>
      <ScrollButton />
      <div className="flex justify-center mt-[8%] sm:mt-[30%]">
        <div className="w-fit grid grid-cols-4 sm:grid-cols-1 sm:mx-auto xl:w-[90%]">
          {researchData.map((item, index) => (
            <div key={index} className="info-box shadow-box m-2 w-80 h-fit">
              <Link className="overlay-link" href={item.link}></Link>
              <Image decoding="async" src={bg1} alt="BG" className="bg-img" />
              <Image
                decoding="async"
                src={item.imageSrc}
                alt="Research"
                className="w-[16vw] h-[16vh] object-cover rounded-[20px] p-2"
                unoptimized
                width={DEFAULT_IMAGE_WIDTH}
                height={DEFAULT_IMAGE_HEIGHT}
              />
              <div className="flex align-center justify-between h-16">
                <div className="infos mt-2">
                  <h5>{item.title}</h5>
                  <p className="text-sm w-full text-zinc-200 font-semibold">
                    {item.description}
                  </p>
                </div>
              </div>
              <a href="" className="about-btn w-20 mt-8">
                <Image decoding="async" src={star_r} alt="Star" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
