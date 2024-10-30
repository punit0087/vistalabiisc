"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./loading.css"; // Import the CSS file

interface CounterProps {
  className: string;
  animationDelay?: number;
  duration: number;
  delay?: number;
}

const Counter: React.FC<CounterProps> = ({
  className,
  animationDelay = 0,
  duration,
  delay,
}) => {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateCounter = () => {
      const numElements = counterRef.current!.querySelectorAll(".num");
      const numHeight = numElements[0].clientHeight;
      const totalDistance =
        className === "counter-1"
          ? numHeight * 11
          : (numElements.length - 1) * numHeight;

      gsap.to(counterRef.current!, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power4.inOut",
      });
    };

    animateCounter();
  }, [animationDelay, duration, delay, className]);

  return (
    <div ref={counterRef} className={className}>
      {/* Create 11 elements for counter-1 to scroll through 0-9 and stop at 1 */}
      {[...Array(11)].map((_, index) => (
        <div key={index} className="num">
          {index === 10 ? 1 : index}{" "}
          {/* Display 1 for the last element in counter-1 */}
        </div>
      ))}
      {/* Remaining elements for other counters (unchanged) */}
      {[...Array(10)].map((_, index) => (
        <div key={index} className="num">
          {index}
        </div>
      ))}
    </div>
  );
};

function Loading() {
  useEffect(() => {
    gsap.to(".digit", {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div className="Loading">
      <div className="loading-screen">
        <div className="svgg">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 923.08 374.44"
            fill="#fff"
          >
            <g>
              <path d="M219.02,2.74l-105.79,275.83h-7.84L0,2.74h9.01l100.3,264.08L210.4,2.74h8.62Z" />
              <path d="M271.91,2.74v275.83h-7.84V2.74h7.84Z" />
              <path d="M368.48,271.91c-12.93-6.27-22.92-14.56-29.97-24.88-7.05-10.32-11.23-21.48-12.54-33.5h7.84c1.3,9.15,4.63,18.29,9.99,27.43,5.35,9.15,13.84,16.98,25.47,23.51,11.62,6.53,26.58,9.79,44.86,9.79,14.63,0,27.55-2.8,38.79-8.42,11.23-5.61,19.85-13.13,25.86-22.53,6.01-9.4,9.01-19.85,9.01-31.34,0-14.89-3.4-26.7-10.19-35.46-6.79-8.75-15.22-15.21-25.27-19.39-10.06-4.18-23.58-8.49-40.55-12.93-17.77-4.7-32-9.4-42.71-14.1-10.71-4.7-19.79-11.95-27.23-21.75-7.44-9.79-11.17-23.05-11.17-39.77,0-12.01,3.33-23.31,9.99-33.89,6.66-10.58,16.19-19,28.6-25.27,12.4-6.27,26.58-9.4,42.51-9.4s30.17,2.88,41.92,8.62c11.75,5.75,20.96,13,27.62,21.75,6.66,8.75,11.03,17.96,13.12,27.62h-7.84c-1.83-7.57-5.62-15.28-11.36-23.12-5.75-7.84-13.98-14.43-24.68-19.79-10.71-5.35-23.64-8.03-38.79-8.03-13.32,0-25.53,2.55-36.63,7.64-11.11,5.09-19.98,12.28-26.64,21.55-6.66,9.27-9.99,20.05-9.99,32.32,0,15.15,3.46,27.23,10.38,36.24,6.92,9.01,15.48,15.67,25.66,19.98,10.19,4.31,23.77,8.69,40.75,13.13,17.76,4.7,31.93,9.34,42.51,13.91,10.58,4.57,19.52,11.63,26.84,21.16,7.31,9.54,10.97,22.53,10.97,38.98,0,11.5-3.07,22.6-9.21,33.3-6.14,10.71-15.35,19.39-27.62,26.06-12.28,6.66-27.17,9.99-44.67,9.99s-32.72-3.13-45.65-9.4Z" />
              <path d="M691.53,2.74v7.05h-80.32v268.78h-7.84V9.8h-80.32V2.74h168.48Z" />
              <path d="M885.47,202.56h-136.35l-28.99,76.01h-9.01L813.37,10.97h7.84l101.87,267.6h-9.01l-28.6-76.01ZM882.72,195.51l-65.43-172-65.43,172h130.86Z" />
            </g>
            <g>
              <path d="M457.39,365.95h16.56v7.99h-26.64v-50.26h10.08v42.26Z" />
              <path d="M511.89,364.36h-20.02l-3.31,9.58h-10.58l18.07-50.33h11.74l18.07,50.33h-10.66l-3.31-9.58ZM509.16,356.3l-7.27-21.02-7.27,21.02h14.54Z" />
              <path d="M568.84,352.41c1.82,2.3,2.74,4.94,2.74,7.92,0,2.69-.66,5.05-1.98,7.09s-3.23,3.64-5.72,4.79c-2.5,1.15-5.45,1.73-8.86,1.73h-21.67v-50.26h20.74c3.41,0,6.35.55,8.82,1.66,2.47,1.1,4.34,2.64,5.62,4.61,1.27,1.97,1.91,4.2,1.91,6.7,0,2.93-.78,5.38-2.34,7.34-1.56,1.97-3.64,3.36-6.23,4.18,2.83.53,5.16,1.94,6.98,4.25ZM543.43,344.42h9.22c2.4,0,4.25-.54,5.54-1.62s1.94-2.63,1.94-4.64-.65-3.58-1.94-4.68c-1.3-1.1-3.14-1.66-5.54-1.66h-9.22v12.6ZM559.3,364c1.37-1.15,2.05-2.78,2.05-4.9s-.72-3.85-2.16-5.08c-1.44-1.22-3.38-1.84-5.83-1.84h-9.94v13.54h10.15c2.45,0,4.36-.58,5.72-1.73Z" />
              <path d="M590.73,371.13c-3.94-2.21-7.06-5.27-9.36-9.18-2.3-3.91-3.46-8.34-3.46-13.28s1.15-9.3,3.46-13.21c2.3-3.91,5.42-6.97,9.36-9.18,3.94-2.21,8.25-3.31,12.96-3.31s9.08,1.1,13,3.31c3.91,2.21,7.01,5.27,9.29,9.18,2.28,3.91,3.42,8.32,3.42,13.21s-1.14,9.37-3.42,13.28c-2.28,3.91-5.39,6.97-9.32,9.18-3.94,2.21-8.26,3.31-12.96,3.31s-9.02-1.1-12.96-3.31ZM611.68,363.39c2.3-1.37,4.1-3.32,5.4-5.87,1.3-2.54,1.94-5.5,1.94-8.86s-.65-6.3-1.94-8.82c-1.3-2.52-3.1-4.45-5.4-5.8s-4.97-2.02-7.99-2.02-5.7.67-8.03,2.02-4.14,3.28-5.44,5.8c-1.3,2.52-1.94,5.46-1.94,8.82s.65,6.31,1.94,8.86c1.3,2.54,3.11,4.5,5.44,5.87s5,2.05,8.03,2.05,5.69-.68,7.99-2.05Z" />
              <path d="M663.52,373.94l-11.09-19.58h-4.75v19.58h-10.08v-50.26h18.86c3.89,0,7.2.68,9.94,2.05,2.74,1.37,4.79,3.22,6.16,5.54,1.37,2.33,2.05,4.93,2.05,7.81,0,3.31-.96,6.3-2.88,8.96s-4.78,4.5-8.57,5.51l12.02,20.38h-11.66ZM647.68,346.8h8.42c2.74,0,4.78-.66,6.12-1.98,1.34-1.32,2.02-3.16,2.02-5.51s-.67-4.09-2.02-5.36c-1.34-1.27-3.38-1.91-6.12-1.91h-8.42v14.76Z" />
              <path d="M715.29,364.36h-20.02l-3.31,9.58h-10.58l18.07-50.33h11.74l18.07,50.33h-10.66l-3.31-9.58ZM712.55,356.3l-7.27-21.02-7.27,21.02h14.54Z" />
              <path d="M770.95,323.68v8.14h-13.39v42.12h-10.08v-42.12h-13.39v-8.14h36.86Z" />
              <path d="M789.38,371.13c-3.94-2.21-7.06-5.27-9.36-9.18-2.3-3.91-3.46-8.34-3.46-13.28s1.15-9.3,3.46-13.21c2.3-3.91,5.42-6.97,9.36-9.18,3.94-2.21,8.25-3.31,12.96-3.31s9.08,1.1,13,3.31c3.91,2.21,7.01,5.27,9.29,9.18,2.28,3.91,3.42,8.32,3.42,13.21s-1.14,9.37-3.42,13.28c-2.28,3.91-5.39,6.97-9.32,9.18-3.94,2.21-8.26,3.31-12.96,3.31s-9.02-1.1-12.96-3.31ZM810.33,363.39c2.3-1.37,4.1-3.32,5.4-5.87,1.3-2.54,1.94-5.5,1.94-8.86s-.65-6.3-1.94-8.82c-1.3-2.52-3.1-4.45-5.4-5.8s-4.97-2.02-7.99-2.02-5.7.67-8.03,2.02-4.14,3.28-5.44,5.8c-1.3,2.52-1.94,5.46-1.94,8.82s.65,6.31,1.94,8.86c1.3,2.54,3.11,4.5,5.44,5.87s5,2.05,8.03,2.05,5.69-.68,7.99-2.05Z" />
              <path d="M862.17,373.94l-11.09-19.58h-4.75v19.58h-10.08v-50.26h18.86c3.89,0,7.2.68,9.94,2.05,2.74,1.37,4.79,3.22,6.16,5.54,1.37,2.33,2.05,4.93,2.05,7.81,0,3.31-.96,6.3-2.88,8.96s-4.78,4.5-8.57,5.51l12.02,20.38h-11.66ZM846.33,346.8h8.42c2.74,0,4.78-.66,6.12-1.98,1.34-1.32,2.02-3.16,2.02-5.51s-.67-4.09-2.02-5.36c-1.34-1.27-3.38-1.91-6.12-1.91h-8.42v14.76Z" />
              <path d="M923.08,323.68l-16.99,32.76v17.5h-10.08v-17.5l-17.06-32.76h11.38l10.8,22.97,10.73-22.97h11.23Z" />
            </g>
          </svg>{" "}
        </div>

        <div className="counter">
          <Counter
            className="counter-1"
            animationDelay={0}
            duration={2}
            delay={4}
          />
          <Counter className="counter-2" animationDelay={1} duration={6} />
          <Counter className="counter-3" animationDelay={2} duration={5} />
        </div>
      </div>
    </div>
  );
}

export default Loading;