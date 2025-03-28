import { useEffect, useRef } from "react";

const Legend = ({
  legendItems,
}: {
  legendItems: { label: string; color: string }[];
}) => {
  return (
    <div
      className="z-[9] bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl text-zinc-300"
      style={{ width: "18rem" }}
    >
      <p className="text-xs font-semibold mb-4 w-full flex flex-col text-center justify-between">
        <a href="https://mausam.imd.gov.in" target="_blank">
          India Meteorological Department
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Tropical_cyclone_intensity_scales"
          target="_blank"
        >
          Tropical Cyclone Intensity Scale
        </a>
      </p>
      {legendItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-around"
          style={{ height: "1.5rem" }}
        >
          {/* Color Box */}
          <div
            className="w-4 h-4 rounded-sm hover:scale-125 transition-all"
            style={{ backgroundColor: item.color }}
          />
          {/* Label Text */}
          <span className="text-zinc-300 text-xs ml-2 w-full">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
