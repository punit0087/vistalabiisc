"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import bg1 from "@/app/P_portfolio/assets/bg1.png";
import star_r from "@/app/P_portfolio/assets/star.svg";
import "@/app/P_portfolio/components/style.css";

import ScrollButton from "@/app/P_portfolio/components/ScrollButton";
import { fetchPublicJson } from "@/lib/publicData";

type Project = {
  id: number;
  name: string;
  description?: string;
  url: string;
  image?: string;
};

type ProjectsPayload = {
  projects: Project[];
};

const DEFAULT_IMAGE_WIDTH = 280;
const DEFAULT_IMAGE_HEIGHT = 200;

export default function Research() {
  const [researchData, setResearchData] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchPublicJson<ProjectsPayload>(
        "/data/projects.json",
      );
      if (cancelled) return;
      setResearchData(data.projects || []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <ScrollButton />
      <div className="flex justify-center mt-[8%] sm:mt-[30%]">
        <div className="w-fit grid grid-cols-4 sm:grid-cols-1 sm:mx-auto xl:w-[90%]">
          {researchData.map((item, index) => (
            <div key={index} className="info-box shadow-box m-2 w-80 h-fit">
              <Link className="overlay-link" href={item.url}></Link>
              <Image decoding="async" src={bg1} alt="BG" className="bg-img" />
              <Image
                decoding="async"
                src={item.image || "/data/ProjectsCoverIMG/bigdata.png"}
                alt="Research"
                className="w-[20vw] h-[24vh] object-cover rounded-[20px]"
                width={DEFAULT_IMAGE_WIDTH}
                height={DEFAULT_IMAGE_HEIGHT}
              />
              <div className="flex align-center justify-between h-16">
                <div className="mt-2">
                  <h5 className="text-zinc-200 text-sm">{item.name}</h5>
                  {/* <p className="text-sm w-full text-zinc-200 font-semibold">
                    {item.description}
                  </p> */}
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
