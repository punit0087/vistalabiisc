"use client";
import React, { useEffect, useMemo, useState } from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

import Link from "next/link";
import { fetchPublicJson } from "@/lib/publicData";

type Project = {
  id: number;
  name: string;
  description?: string;
  researchers?: string[];
  tech?: string[];
  data?: string[];
  fundedBy?: string[];
  url: string;
};

type ProjectsPayload = {
  projects: Project[];
};

export default function Section2() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map known research route slugs to images
  const imageBySlug = useMemo(
    () => ({
      cyc: "/P_portfolio/img/cyclone.gif",
      TB: "/P_portfolio/img/Traffic-Flow-Optimizer.gif",
      reid: "/P_portfolio/img/VehicleREID.jpeg",
      DC: "/P_portfolio/img/deep_clustering.gif",
      AMLWD: "/P_portfolio/img/amlwatchdog.gif",
      VSec: "/P_portfolio/img/vehiclesec.gif",
      IADS: "/P_portfolio/img/ADAS.gif",
      CW: "/P_portfolio/img/Edge-Analytics-for-UAVs.gif",
      upgrid: "/P_portfolio/img/PowerGrid-IDS.gif",
      WAna: "/P_portfolio/img/wreckanalyzer.gif",
      roadDNA: "/P_portfolio/img/RoadSurfacePro.gif",
      dbshmi: "/P_portfolio/img/Driving_Behaviour_T_ITS.png",
      dba: "/P_portfolio/img/udb.png",
      frcd: "/P_portfolio/img/Fake_review.png",
      bdca: "/P_portfolio/img/bigdata.png",
      lstp: "/P_portfolio/img/TrajectoryClusteringDiagram.png",
      sme: "/P_portfolio/img/drift.png",
      iot: "/P_portfolio/img/fitzroyvis.jpg",
      sasd: "/P_portfolio/img/bigdata.png",
      roadinfraapi: "/P_portfolio/img/roadinfraapi.png",
      roadsense77: "/P_portfolio/img/roadsense77.png",
    }),
    []
  );

  // Fallback URL mapping when projects.json has placeholder '#'
  const fallbackUrlByName = useMemo(
    () => ({
     
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPublicJson<ProjectsPayload>(
          "/data/projects.json"
        );
        if (cancelled) return;
        setProjects(data.projects || []);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const inName = p.name?.toLowerCase().includes(q);
      const inFunder = (p.fundedBy || []).some((f) =>
        f.toLowerCase().includes(q)
      );
      const inTech = (p.tech || []).some((t) => t.toLowerCase().includes(q));
      return inName || inFunder || inTech;
    });
  }, [projects, searchQuery]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black overflow-x-auto scrollbar-custom overflow-y-hidden sm:mt-20">
      {/* Optional: simple error/empty states without changing layout */}
      {error && <div className="text-red-400 text-sm px-6">{error}</div>}
      <div className="mr-20 delay-500 absolute right-0 border-b sm:mr-10">
        <input
          className={`pb-2 searchtext outline-none bg-transparent text-white text-xs placeholder-white focus:outline-none transition-all duration-500 ease-in-out ${
            isHovered ? "w-40" : "w-0"
          }`}
          type="text"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          placeholder="Search by name, tech, or funder"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="w-32">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2258.11 579"
              fill="#fff"
            >
              <g id="Page-1">
                <g id="Icon-Set">
                  <g id="search">
                    <path d="M241.72,440.99c-112.95,0-204.53-89.96-204.53-201.12S128.77,38.53,241.72,38.53s204.53,90.14,204.53,201.31-91.59,201.12-204.53,201.12h0v.03ZM569.07,545.14l-148.32-146.01c38.84-42.2,62.69-97.88,62.69-159.29C483.44,108.39,375.21,1.9,241.72,1.9S0,108.39,0,239.84s108.22,237.76,241.72,237.76c57.68,0,110.59-19.94,152.15-53.17l148.9,146.54c7.27,7.19,19.03,7.19,26.29,0,7.27-7.01,7.27-18.68,0-25.85h0v.03Z" />
                  </g>
                </g>
              </g>
              <g>
                <path d="M901.38,110.85c-12.3,11.89-31.06,17.83-56.28,17.83h-41.55v90.23h-28.22V2.79h69.77c24.39,0,42.95,5.89,55.66,17.67,12.71,11.78,19.07,26.98,19.07,45.58s-6.15,32.92-18.45,44.81ZM879.83,95.19c7.44-6.82,11.16-16.54,11.16-29.15,0-26.67-15.3-40-45.89-40h-41.55v79.38h41.55c15.71,0,27.29-3.41,34.73-10.23Z" />
                <path d="M1068.67,218.92l-51.47-88.37h-34.11v88.37h-28.22V2.79h69.77c16.33,0,30.13,2.79,41.4,8.37,11.26,5.58,19.69,13.13,25.27,22.64s8.37,20.36,8.37,32.56c0,14.88-4.29,28.01-12.87,39.38s-21.45,18.92-38.6,22.64l54.26,90.54h-33.8ZM983.09,107.91h41.55c15.3,0,26.77-3.77,34.42-11.32,7.65-7.54,11.47-17.62,11.47-30.23s-3.77-22.74-11.32-29.77c-7.55-7.03-19.07-10.54-34.57-10.54h-41.55v81.86h0Z" />
                <path d="M1186.5,206.98c-16.54-9.4-29.61-22.53-39.23-39.38-9.61-16.85-14.42-35.81-14.42-56.9s4.81-40.05,14.42-56.9c9.61-16.85,22.68-29.97,39.23-39.38,16.54-9.4,34.83-14.11,54.88-14.11s38.65,4.7,55.19,14.11,29.56,22.48,39.07,39.23c9.5,16.74,14.26,35.77,14.26,57.05s-4.76,40.31-14.26,57.05c-9.51,16.74-22.53,29.82-39.07,39.23s-34.94,14.11-55.19,14.11-38.35-4.7-54.88-14.11h0ZM1282.16,186.05c12.09-7.03,21.6-17.05,28.53-30.08,6.92-13.02,10.39-28.11,10.39-45.27s-3.46-32.5-10.39-45.43c-6.93-12.92-16.39-22.89-28.37-29.92-11.99-7.03-25.63-10.54-40.93-10.54s-28.94,3.52-40.93,10.54c-11.99,7.03-21.45,17.01-28.37,29.92-6.93,12.92-10.39,28.06-10.39,45.43s3.46,32.25,10.39,45.27c6.92,13.02,16.43,23.05,28.53,30.08,12.09,7.03,25.68,10.54,40.78,10.54s28.68-3.51,40.78-10.54h-.02Z" />
                <path d="M1495.95,2.79v159.69c0,17.78-5.48,31.99-16.43,42.64-10.96,10.65-25.43,15.97-43.41,15.97s-32.77-5.43-43.72-16.28c-10.96-10.85-16.43-25.68-16.43-44.5h28.22c.2,10.54,2.95,19.12,8.22,25.74,5.27,6.62,13.18,9.92,23.72,9.92s18.4-3.15,23.57-9.46c5.17-6.3,7.75-14.31,7.75-24.03V2.79h28.53-.02Z" />
                <path d="M1579.68,25.74v72.25h78.76v23.26h-78.76v74.42h88.06v23.26h-116.28V2.48h116.28v23.26h-88.06Z" />
                <path d="M1714.24,53.8c9.51-16.85,22.48-30.02,38.92-39.54,16.43-9.51,34.68-14.26,54.73-14.26,23.57,0,44.13,5.69,61.71,17.05,17.57,11.37,30.39,27.5,38.45,48.37h-33.8c-6-13.02-14.63-23.05-25.89-30.08-11.27-7.03-24.76-10.54-40.46-10.54s-28.63,3.52-40.62,10.54c-11.99,7.03-21.4,17.01-28.22,29.92-6.82,12.92-10.23,28.06-10.23,45.43s3.41,32.2,10.23,45.12,16.23,22.9,28.22,29.92c11.99,7.03,25.53,10.54,40.62,10.54s29.2-3.46,40.46-10.39c11.26-6.92,19.89-16.9,25.89-29.92h33.8c-8.06,20.67-20.88,36.64-38.45,47.91s-38.14,16.9-61.71,16.9c-20.05,0-38.29-4.7-54.73-14.11-16.43-9.4-29.41-22.48-38.92-39.22s-14.26-35.66-14.26-56.74,4.75-40.05,14.26-56.9h0Z" />
                <path d="M2082.93,2.79v22.95h-58.92v193.18h-28.22V25.74h-59.22V2.79h146.36Z" />
                <path d="M2147.88,213.49c-11.27-5.06-20.11-12.09-26.51-21.09-6.41-8.99-9.72-19.38-9.92-31.16h30.08c1.03,10.13,5.22,18.66,12.56,25.58,7.33,6.93,18.03,10.39,32.09,10.39s24.03-3.36,31.78-10.08c7.75-6.71,11.63-15.35,11.63-25.89,0-8.27-2.28-14.99-6.82-20.16-4.55-5.16-10.23-9.09-17.05-11.78-6.82-2.68-16.02-5.58-27.6-8.68-14.26-3.72-25.69-7.44-34.26-11.16-8.58-3.72-15.92-9.56-22.02-17.52-6.1-7.96-9.15-18.65-9.15-32.09,0-11.78,2.99-22.22,8.99-31.32,5.99-9.09,14.42-16.12,25.27-21.09S2170.25,0,2184.31,0c20.26,0,36.85,5.07,49.77,15.19,12.92,10.13,20.2,23.57,21.86,40.31h-31.01c-1.04-8.27-5.38-15.55-13.02-21.86-7.65-6.3-17.78-9.46-30.39-9.46-11.78,0-21.4,3.05-28.84,9.15s-11.16,14.63-11.16,25.58c0,7.86,2.22,14.26,6.67,19.23,4.44,4.96,9.92,8.74,16.43,11.32,6.51,2.59,15.66,5.53,27.44,8.84,14.26,3.93,25.74,7.81,34.42,11.63,8.68,3.83,16.12,9.72,22.33,17.67,6.2,7.96,9.3,18.76,9.3,32.4,0,10.54-2.79,20.47-8.37,29.77s-13.85,16.85-24.81,22.64c-10.96,5.79-23.88,8.68-38.76,8.68s-27.03-2.53-38.29-7.6h0Z" />
              </g>
              <g>
                <path d="M826.58,569.58c-15.33-6.28-27.57-15.57-36.74-27.89-9.17-12.31-14.01-27.13-14.51-44.47h68.58c1,9.8,4.39,17.28,10.17,22.42,5.78,5.15,13.31,7.72,22.61,7.72s17.08-2.2,22.61-6.59c5.52-4.4,8.29-10.49,8.29-18.28,0-6.53-2.2-11.93-6.59-16.2-4.4-4.27-9.8-7.78-16.2-10.55-6.41-2.76-15.51-5.9-27.32-9.42-17.09-5.27-31.03-10.55-41.83-15.82-10.8-5.28-20.1-13.06-27.89-23.37-7.79-10.29-11.68-23.74-11.68-40.32,0-24.62,8.91-43.9,26.75-57.85,17.83-13.94,41.07-20.91,69.71-20.91s52.63,6.97,70.46,20.91c17.83,13.94,27.38,33.35,28.64,58.22h-69.71c-.51-8.54-3.64-15.26-9.42-20.16-5.78-4.9-13.19-7.35-22.23-7.35-7.79,0-14.07,2.08-18.84,6.22-4.77,4.14-7.16,10.11-7.16,17.9,0,8.54,4.01,15.2,12.06,19.97,8.04,4.78,20.6,9.93,37.68,15.45,17.08,5.78,30.96,11.31,41.64,16.58,10.67,5.27,19.91,12.94,27.7,22.99,7.78,10.05,11.68,22.98,11.68,38.81s-3.83,28.76-11.49,41.07c-7.66,12.31-18.78,22.11-33.35,29.39-14.57,7.29-31.78,10.93-51.63,10.93s-36.68-3.14-52-9.42Z" />
                <path d="M1079.05,363.45v53.51h86.29v49.74h-86.29v58.03h97.6v51.63h-162.03v-264.53h162.03v51.62h-97.6Z" />
                <path d="M1383.14,529.63h-98.73l-15.83,46.73h-67.45l95.71-264.53h74.61l95.71,264.53h-68.2l-15.83-46.73ZM1366.55,479.89l-32.78-96.84-32.41,96.84h65.19Z" />
                <path d="M1631.09,576.36l-55.02-99.86h-15.45v99.86h-64.44v-264.53h108.15c20.85,0,38.62,3.64,53.32,10.93,14.7,7.29,25.68,17.28,32.97,29.96,7.28,12.69,10.93,26.82,10.93,42.4,0,17.59-4.96,33.29-14.89,47.1-9.93,13.81-24.56,23.61-43.9,29.39l61.05,104.76h-72.73ZM1560.62,430.91h39.94c11.8,0,20.66-2.89,26.56-8.67,5.9-5.78,8.85-13.94,8.85-24.49s-2.95-17.96-8.85-23.74c-5.91-5.78-14.76-8.67-26.56-8.67h-39.94v65.57Z" />
                <path d="M1747.9,373.82c11.3-20.47,27.07-36.42,47.29-47.86,20.22-11.43,43.15-17.14,68.77-17.14,31.4,0,58.28,8.29,80.64,24.87,22.36,16.58,37.3,39.19,44.84,67.83h-70.84c-5.27-11.05-12.75-19.47-22.42-25.25-9.68-5.78-20.67-8.67-32.97-8.67-19.85,0-35.93,6.92-48.23,20.72-12.31,13.82-18.47,32.29-18.47,55.39s6.15,41.58,18.47,55.4c12.3,13.81,28.38,20.72,48.23,20.72,12.3,0,23.3-2.89,32.97-8.67,9.67-5.78,17.14-14.19,22.42-25.25h70.84c-7.54,28.64-22.49,51.19-44.84,67.64-22.36,16.46-49.24,24.68-80.64,24.68-25.62,0-48.55-5.71-68.77-17.14-20.22-11.43-35.99-27.32-47.29-47.67-11.31-20.35-16.96-43.58-16.96-69.71s5.65-49.42,16.96-69.9Z" />
                <path d="M2258.11,311.83v264.53h-64.44v-108.9h-100.24v108.9h-64.44v-264.53h64.44v103.62h100.24v-103.62h64.44Z" />
              </g>
            </svg>
          </p>
        </button>
      </div>
      <div className="flex mt-24 pb-6">
        {filteredProjects.map((project, index) => {
          const url =
            project.url && project.url !== "#"
              ? project.url
              : fallbackUrlByName[
                  project.name as keyof typeof fallbackUrlByName
                ] || "#";
          const slug = url.split("/").filter(Boolean).pop() || "";
          const image =
            imageBySlug[slug as keyof typeof imageBySlug] ||
            "/P_portfolio/img/bigdata.png";
          return (
            <Link href={url} key={`${project.id}-${index}`}>
              <div className="h-[27vh] border border-white/[0.2] flex flex-col items-start mx-auto p-4 relative z-30 ml-4 rounded-lg sm:h-full">
                {/* <Icon className="absolute h- w- -top-3 -left-3 text-white" />
              <Icon className="absolute h- w- -bottom-3 -left-3 text-white" />
              <Icon className="absolute h- w- -top-3 -right-3 text-white" />
              <Icon className="absolute h- w- -bottom-3 -right-3 text-white" /> */}

                <EvervaultCard key={index} image={image} />

                <h2 className="text-white mt-4 text-base font-light">
                  {project.name}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
