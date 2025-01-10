import { useEffect, useRef } from "react";

const Legend = ({
  legendItems,
}: {
  legendItems: { label: string; color: string }[];
}) => {
  return (
    <div className="z-[9] fixed right-4 top-[20%] w-[15vw] bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl text-zinc-300">
      {legendItems.map((item) => (
        <div
          key={item.label}
          className="flex items-end justify-end space-x-2 space-y-2"
        >
          {/* Label Text */}
          <span className="text-zinc-300 text-xs">{item.label}</span>
          {/* Color Box */}
          <div
            className="w-4 h-4 rounded-sm hover:scale-125 transition-all"
            style={{ backgroundColor: item.color }}
          />
        </div>
      ))}
    </div>
  );
};

export default Legend;
