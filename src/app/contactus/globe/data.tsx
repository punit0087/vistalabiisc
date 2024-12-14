"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeD() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#596059",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,1)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 300,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 35.45, lng: 78.08 },
    autoRotate: true,
    autoRotateSpeed: 2,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.2088,
      endLat: 12.9716,
      endLng: 77.5946,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 12.9716,
      startLng: 77.5946,
      endLat: 27.0238,
      endLng: 74.2179,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <div className="flex py-20 h-screen md:h-auto bg-black  relative w-[40%] sm:w-full sm:py-0">
      <div className="mx-auto w-full relative overflow-hidden h-full md:h-[40rem]">
        <div className="absolute w-full bottom-0 inset-x-0 h-96 bg-gradient-to-b pointer-events-none select-none from-transparent to-black z-40" />
        <div className="absolute w-full h-full md:h-full z-10 sm:w-full">
          <World data={sampleArcs} globeConfig={globeConfig} />;
        </div>
      </div>
    </div>
  );
}
