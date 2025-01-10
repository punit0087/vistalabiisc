"use client";

import React from "react";
import Image from "next/image";

import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";

// ============ COMPONENT PLACEHOLDERS ============

function SelectYearPlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">Select Year</h2>
      <div className="text-xs text-zinc-300">
        <p>
          This dropdown menu allows you to select a specific year of cyclone
          data to visualize. Once a year is chosen, the map and timeline will
          update to display only that year&apos;s data.
        </p>
      </div>
      <div className="bg-zinc-600 p-2 rounded-md inline-block">
        <select disabled className="bg-zinc-500 p-2 text-zinc-200 rounded">
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
        </select>
      </div>
    </div>
  );
}

function TripleTogglePlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">Triple Toggle</h2>
      <div className="text-xs text-zinc-300">
        <p>
          Switch between three viewing modes:
          <br />
          <strong>Entire Year</strong>: Show all points/tracks for the selected
          year.
          <br />
          <strong>Single Events</strong>: Show only the data at the current
          timeline position.
          <br />
          <strong>Cumulative</strong>: Show all data up to and including the
          current timeline position.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative w-[300px] h-10 bg-zinc-600 rounded-full flex items-center justify-between p-2">
          <div
            className="absolute w-24 h-8 bg-zinc-400 rounded-full transition-all"
            style={{ left: "4px" }}
          />
          <button className="relative z-10 text-xs text-zinc-100 w-1/3">
            Entire Year
          </button>
          <button className="relative z-10 text-xs text-zinc-100 w-1/3">
            Single Events
          </button>
          <button className="relative z-10 text-xs text-zinc-100 w-1/3">
            Cumulative
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayPausePlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">Play / Pause</h2>
      <div className="text-xs text-zinc-300">
        <p>
          These buttons allow you to animate the timeline. Click{" "}
          <strong>Play</strong> to run through the timeline, and{" "}
          <strong>Pause</strong> to halt playback.
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button className="">
          <Image src={play} alt="" className="w-6 h-6" />
        </button>
        <button className="">
          <Image src={pause} alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function SliderYearDatePlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">
        Date / Year Slider
      </h2>
      <div className="text-xs text-zinc-300">
        <p>
          This component ties the selected year to specific time steps. As you
          move the slider, the date and time will update to reflect the current
          selection in that year.
        </p>
      </div>
      <div className="flex flex-col space-y-1 bg-zinc-600 p-3 rounded">
        <p className="text-zinc-100 text-xs">2022-10-12 06:00 UTC</p>
        <input type="range" disabled min={0} max={10} className="w-full" />
      </div>
    </div>
  );
}

function AIPredictionButtonPlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">
        AI-Prediction Button
      </h2>
      <div className="text-xs text-zinc-300">
        <p>
          Enable or disable AI-predicted cyclone paths. When enabled, the map
          will overlay an additional dashed line showing the predicted route for
          each storm.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-zinc-100 font-medium">AI Predictions</span>
        <div
          className="w-14 h-6 bg-zinc-600 rounded-full relative cursor-pointer"
          role="switch"
          aria-checked="false"
        >
          <div
            className="w-6 h-6 bg-zinc-300 rounded-full absolute top-0 left-0 transition-all"
            style={{ transform: "translateX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}

function CompareCyclonesPlaceholder() {
  return (
    <div className="flex flex-col space-y-2 bg-zinc-900 rounded-md p-4 border border-zinc-600">
      <h2 className="text-zinc-100 font-semibold text-lg">Compare Cyclones</h2>
      <div className="text-xs text-zinc-300">
        <p>
          Select up to four cyclones to display simultaneously on the map. Type
          a cyclone name or year into the search box to find and add it to your
          comparison list.
        </p>
      </div>
      <div className="bg-zinc-600 p-3 rounded-md flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Search by name/year"
          disabled
          className="p-2 text-xs bg-zinc-500 text-zinc-100 rounded"
        />
        <div className="text-xs text-zinc-100">
          [ List of matching cyclones... ]
        </div>
      </div>
    </div>
  );
}

// ============ OVERLAY COMPONENT ============

interface ManualOverlayProps {
  onClose: () => void;
}

export function ManualOverlay({ onClose }: ManualOverlayProps) {
  return (
    <div className="z-10 bg-zinc-800/60 backdrop-blur-sm w-screen h-[89vh] fixed inset-0 flex items-center justify-center text-xs ">
      {/* Inner card: center-aligned container */}
      <div className="max-w-[50%] bg-zinc-800 p-6 rounded-xl border border-zinc-600 relative">
        {/* Title & Intro Text */}
        <h1 className="text-2xl text-zinc-100 mb-4">
          Cyclone Visualization User Manual
        </h1>
        <p className="text-xs text-zinc-300 mb-6 w-[60%]">
          Below is a detailed explanation of each UI component in this cyclone
          visualization. All visuals here are static placeholders with no real
          functionality.
        </p>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-100 px-2 py-1 bg-zinc-900 rounded hover:bg-zinc-600"
        >
          X
        </button>
        {/* Scrollable Content */}
        <div className="grid grid-cols-2 gap-4 h-[50vh] overflow-auto">
          <SelectYearPlaceholder />
          <TripleTogglePlaceholder />
          <PlayPausePlaceholder />
          <SliderYearDatePlaceholder />
          <AIPredictionButtonPlaceholder />
          <CompareCyclonesPlaceholder />
        </div>
      </div>
    </div>
  );
}
