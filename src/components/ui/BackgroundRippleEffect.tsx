"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BackgroundCellAnimation = () => {
  return (
    <div className="relative h-[30rem] mt-20 bg-black flex justify-center overflow-hidden sm:h-[40vh]">
    <BackgroundCellCore />
    <div className="relative z-40 mt-40 pointer-events-none select-none">
      <h1 className="sm:text-4xl text-7xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 pointer-events-none">
       Collaborators
      </h1>
    </div>
  </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPosition = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      pendingPosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (pendingPosition.current) {
          setMousePosition(pendingPosition.current);
        }
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const size = 300;
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="absolute inset-0">
      <div className="absolute h-[20rem] inset-y-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-black [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${
              size / 4
            }px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${
              size / 4
            }px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-white-300 relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-neutral-600" />
      </div>
    </div>
  );
};

const Pattern = ({
  className,
  cellClassName,
}: {
  className?: string;
  cellClassName?: string;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const matrix = useMemo(() => {
    const cols = prefersReducedMotion ? 24 : 47;
    const rows = prefersReducedMotion ? 16 : 30;
    return Array.from({ length: cols }, (_, i) =>
      Array.from({ length: rows }, (_, j) => [i, j])
    );
  }, [prefersReducedMotion]);
  const [clickedCell, setClickedCell] = useState<any>(null);

  return (
    <div className={cn("flex flex-row relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col relative z-20 border-b"
        >
          {row.map((column, colIdx) => (
            <div
              key={`matrix-col-${colIdx}`}
              className={cn(
                "bg-transparent border-l border-b border-neutral-600",
                cellClassName
              )}
              onClick={() => setClickedCell([rowIdx, colIdx])}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={
                  prefersReducedMotion ? undefined : { opacity: [0, 1, 0.5] }
                }
                transition={{ duration: 0.5, ease: "backOut" }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : clickedCell
                    ? {
                        opacity: [
                          0,
                          Math.max(
                            0,
                            1 -
                              Math.hypot(
                                clickedCell[0] - rowIdx,
                                clickedCell[1] - colIdx
                              ) * 0.1
                          ),
                          0,
                        ],
                        transition: {
                          duration: Math.max(
                            0.1,
                            Math.hypot(
                              clickedCell[0] - rowIdx,
                              clickedCell[1] - colIdx
                            ) * 0.2
                          ),
                        },
                      }
                    : { opacity: 0 }
                }
                className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
              ></motion.div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
