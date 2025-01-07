"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import trash from "@/assets/delete.svg";

import playIcon from "@/assets/play.svg";
import pauseIcon from "@/assets/pause.svg";

// shadcn/ui Switch
import { Switch } from "@/components/ui/switch";

// If using react-map-gl v7 with named exports, adjust accordingly:
// import { Map as ReactMapGL } from 'react-map-gl';
const ReactMapGL = require("react-map-gl").default;

interface CycloneData {
  serialnumberofsystemduringyear: string;
  basinoforigin: string;
  name: string;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  cinoorornot: number;
  estimatedcentralpressurehpaorecp: number;
  maximumsustainedsurfacewind: number;
  pressuredrophpaorealdelta: number;
  gradeText: string;
  datetime: Date;
  // AI lat/long
  latitudePlus: number;
  longitudePlus: number;
}

interface UniqueCyclone {
  id: string;
  name: string;
  year: number;
  basin: string;
  serial: string;
}

const gradeColors: Record<string, string> = {
  D: "#78c6a3",
  DD: "#61a2de",
  CS: "#f39c12",
  SCS: "#d35400",
  VSCS: "#e74c3c",
  ESCS: "#c0392b",
  SuCS: "#8e44ad",
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const initialViewState = { longitude: 68, latitude: 15, zoom: 4 };

export default function Cyclones() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rawData, setRawData] = useState<CycloneData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    info?: CycloneData;
    isAI?: boolean;
  } | null>(null);

  // Switch states from shadcn/ui
  const [showAllYear, setShowAllYear] = useState(false);
  const [cumulativeMode, setCumulativeMode] = useState(true);
  const [showAIPrediction, setShowAIPrediction] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCyclones, setSelectedCyclones] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    Papa.parse("/data/combined.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const cleaned = result.data
          .filter(
            (d: any) => d["date-dd-mm-yyyy"] && d["time-utc"] && d["grade-text"]
          )
          .map((d: any) => {
            const [day, month, year] = d["date-dd-mm-yyyy"]
              .split("/")
              .map(Number);
            const timeStr = d["time-utc"].padStart(4, "0");
            const hours = parseInt(timeStr.slice(0, 2), 10);
            const mins = parseInt(timeStr.slice(2, 4), 10);
            const dt = new Date(Date.UTC(year, month - 1, day, hours, mins));

            return {
              serialnumberofsystemduringyear: d.serialnumberofsystemduringyear,
              basinoforigin: d.basinoforigin,
              name: d.name,
              date: d["date-dd-mm-yyyy"],
              time: d["time-utc"],
              latitude: parseFloat(d["latitude-lat"]),
              longitude: parseFloat(d["longitude-long"]),
              cinoorornot: parseFloat(d.cinoorornot),
              estimatedcentralpressurehpaorecp: parseFloat(
                d.estimatedcentralpressurehpaorecp
              ),
              maximumsustainedsurfacewind: parseFloat(
                d["maximumsustainedsurfacewind-kt"]
              ),
              pressuredrophpaorealdelta: parseFloat(
                d.pressuredrophpaorealdelta
              ),
              gradeText: d["grade-text"],
              datetime: dt,

              // AI columns
              latitudePlus: parseFloat(d["latitude-lat-plus"]) || 0,
              longitudePlus: parseFloat(d["longitude-long-plus"]) || 0,
            } as CycloneData;
          });

        setRawData(cleaned);
        const distinctYears = Array.from(
          new Set(cleaned.map((d) => d.datetime.getUTCFullYear()))
        ).sort();
        setYears(distinctYears);
        if (distinctYears.length > 0) {
          setSelectedYear(distinctYears[0]);
        }
      },
    });
  }, []);

  // Filter data by selected year
  const yearData = useMemo(() => {
    if (!selectedYear) return [];
    return rawData.filter((d) => d.datetime.getUTCFullYear() === selectedYear);
  }, [selectedYear, rawData]);

  // Sort by time
  const sortedYearData = useMemo(() => {
    return [...yearData].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );
  }, [yearData]);

  useEffect(() => {
    if (sortedYearData.length > 0 && !currentTime) {
      setCurrentTime(sortedYearData[0].datetime);
    }
  }, [sortedYearData, currentTime]);

  // Determine current index based on currentTime
  const currentIndex = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return 0;
    const idx = sortedYearData.findIndex(
      (d) => d.datetime.getTime() === currentTime.getTime()
    );
    return idx >= 0 ? idx : 0;
  }, [currentTime, sortedYearData]);

  // Keep sliderValue in sync
  useEffect(() => {
    if (sortedYearData.length > 0) {
      setSliderValue(currentIndex);
    }
  }, [currentIndex, sortedYearData.length]);

  // Real-time slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    if (sortedYearData[val]) {
      setCurrentTime(sortedYearData[val].datetime);
    }
  };

  // **Auto-play** effect: increment sliderValue every X ms if isPlaying
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && sortedYearData.length > 0) {
      timer = setInterval(() => {
        setSliderValue((prev) => {
          let next = prev + 1;
          if (next >= sortedYearData.length) {
            next = 0; // loop back or stop
          }
          // Update currentTime
          setCurrentTime(sortedYearData[next].datetime);
          return next;
        });
      }, 100); // every 1 second; adjust as desired
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, sortedYearData]);

  // Build unique cyclones
  const uniqueCyclones: UniqueCyclone[] = useMemo(() => {
    const cycloneMap = new Map<string, UniqueCyclone>();
    for (const d of rawData) {
      const yr = d.datetime.getUTCFullYear();
      const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
      if (!cycloneMap.has(id)) {
        cycloneMap.set(id, {
          id,
          name: d.name.trim(),
          year: yr,
          basin: d.basinoforigin,
          serial: d.serialnumberofsystemduringyear,
        });
      }
    }
    return Array.from(cycloneMap.values());
  }, [rawData]);

  // Filter cyclones by search
  const filteredCyclones = useMemo(() => {
    if (!searchQuery) return uniqueCyclones;
    const q = searchQuery.toLowerCase();
    return uniqueCyclones.filter(
      (c) => c.name.toLowerCase().includes(q) || c.year.toString().includes(q)
    );
  }, [uniqueCyclones, searchQuery]);

  const selectCyclone = (c: UniqueCyclone) => {
    if (selectedCyclones.length >= 4) {
      alert("You can compare up to 4 cyclones only.");
      return;
    }
    if (!selectedCyclones.includes(c.id)) {
      setSelectedCyclones([...selectedCyclones, c.id]);
    }
  };

  const removeCyclone = (id: string) => {
    setSelectedCyclones(selectedCyclones.filter((cid) => cid !== id));
  };

  const selectedCycloneDetails = useMemo(() => {
    const map = new Map<string, UniqueCyclone>();
    for (const c of uniqueCyclones) {
      map.set(c.id, c);
    }
    return selectedCyclones
      .map((id) => map.get(id))
      .filter((c): c is UniqueCyclone => !!c);
  }, [selectedCyclones, uniqueCyclones]);

  const isComparing = selectedCyclones.length > 0;

  // Decide displayed data
  const displayedPointsYearMode = useMemo(() => {
    if (showAllYear) {
      return sortedYearData;
    }
    if (!currentTime) return [];
    if (cumulativeMode) {
      return sortedYearData.filter(
        (d) => d.datetime.getTime() <= currentTime.getTime()
      );
    } else {
      return sortedYearData.filter(
        (d) => d.datetime.getTime() === currentTime.getTime()
      );
    }
  }, [showAllYear, cumulativeMode, sortedYearData, currentTime]);

  const displayedLinesYearMode = useMemo(() => {
    if (showAllYear) return sortedYearData;
    if (!currentTime) return [];
    if (cumulativeMode) {
      return sortedYearData.filter(
        (d) => d.datetime.getTime() <= currentTime.getTime()
      );
    } else {
      // Non-cumulative lines
      const currentTimeValue = currentTime.getTime();
      const exactMatches = sortedYearData.filter(
        (d) => d.datetime.getTime() === currentTimeValue
      );
      if (exactMatches.length === 0) return [];
      const result: CycloneData[] = [];
      for (const match of exactMatches) {
        const cycloneId = match.serialnumberofsystemduringyear;
        const cyclonePoints = sortedYearData.filter(
          (d) =>
            d.serialnumberofsystemduringyear === cycloneId &&
            d.datetime.getTime() <= currentTimeValue
        );
        result.push(...cyclonePoints);
      }
      return result;
    }
  }, [showAllYear, cumulativeMode, sortedYearData, currentTime]);

  const displayedDataSelectedMode = useMemo(() => {
    const selectedSet = new Set(selectedCyclones);
    return rawData.filter((d) => {
      const yr = d.datetime.getUTCFullYear();
      const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
      return selectedSet.has(id);
    });
  }, [rawData, selectedCyclones]);

  // Build sets for actual vs AI
  const displayedPoints = isComparing
    ? displayedDataSelectedMode
    : displayedPointsYearMode;
  const displayedLines = isComparing
    ? displayedDataSelectedMode
    : displayedLinesYearMode;

  // Groups for actual lines/points
  function groupByCycloneId(data: CycloneData[]) {
    const groups: Record<string, CycloneData[]> = {};
    for (const d of data) {
      const key = d.serialnumberofsystemduringyear;
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    }
    return groups;
  }
  const lineGroups = useMemo(
    () => groupByCycloneId(displayedLines),
    [displayedLines]
  );
  const pointGroups = useMemo(
    () => groupByCycloneId(displayedPoints),
    [displayedPoints]
  );

  // ----- Actual Features -----
  const lineFeaturesActual: any[] = [];
  for (const [key, items] of Object.entries(lineGroups)) {
    const sorted = [...items].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );
    for (let i = 0; i < sorted.length - 1; i++) {
      const start = sorted[i];
      const end = sorted[i + 1];
      lineFeaturesActual.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [start.longitude, start.latitude],
            [end.longitude, end.latitude],
          ],
        },
        properties: {
          color: gradeColors[start.gradeText] || "#fff",
        },
      });
    }
  }

  const pointFeaturesActual: any[] = [];
  for (const [key, items] of Object.entries(pointGroups)) {
    for (const p of items) {
      pointFeaturesActual.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
        properties: { ...p, color: gradeColors[p.gradeText] || "#fff" },
      });
    }
  }

  // ----- AI Features (lines only) -----
  let lineFeaturesAI: any[] = [];
  if (showAIPrediction) {
    // Use same lineGroups as actual, but build lines from .longitudePlus/.latitudePlus
    for (const [key, items] of Object.entries(lineGroups)) {
      const sorted = [...items].sort(
        (a, b) => a.datetime.getTime() - b.datetime.getTime()
      );
      for (let i = 0; i < sorted.length - 1; i++) {
        const start = sorted[i];
        const end = sorted[i + 1];
        lineFeaturesAI.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [start.longitudePlus, start.latitudePlus],
              [end.longitudePlus, end.latitudePlus],
            ],
          },
          properties: {
            color: gradeColors[start.gradeText] || "#ccc",
            ai: true, // We'll use this flag to detect hover on AI lines
          },
        });
      }
    }
  }

  // Build 2 separate GeoJSONs
  const geojsonActual = {
    type: "FeatureCollection",
    features: [...lineFeaturesActual, ...pointFeaturesActual],
  };
  const geojsonAI = {
    type: "FeatureCollection",
    features: lineFeaturesAI, // no AI points
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yr = parseInt(e.target.value, 10);
    setSelectedYear(yr);
    const filtered = rawData.filter((d) => d.datetime.getUTCFullYear() === yr);
    if (filtered.length > 0) {
      const sorted = filtered.sort(
        (a, b) => a.datetime.getTime() - b.datetime.getTime()
      );
      setCurrentTime(sorted[0].datetime);
    } else {
      setCurrentTime(null);
    }
  };

  // On hover: if we see a feature from "lines-layer-ai", show "AI predicted"
  // Otherwise, if from actual points or lines, show data
  const onHover = useCallback((event: any) => {
    const { features } = event;
    if (!features || !features.length) {
      setHoverInfo(null);
      return;
    }
    const f = features[0];

    // 1) Check geometry type
    if (f.geometry.type === "Point" && f.properties) {
      // Safe to read f.geometry.coordinates as [lng, lat]
      const coords = f.geometry.coordinates;
      if (!coords || coords.length < 2) {
        setHoverInfo(null);
        return;
      }

      // 2) Convert properties into your CycloneData
      const info: CycloneData = {
        ...f.properties,
        // Convert string => Date
        datetime: new Date(f.properties.datetime),
      };

      // 3) Now set hoverInfo with valid [lng, lat]
      setHoverInfo({
        longitude: coords[0],
        latitude: coords[1],
        info,
        isAI: false,
      });
    }
    // If geometry is a line or something else, ignore or handle differently
    else if (f.layer && f.layer.id === "lines-layer-ai") {
      // For example, show a simpler popup for AI lines only
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        isAI: true,
      });
    } else {
      // Not a point, not AI line => no popup
      setHoverInfo(null);
    }
  }, []);

  const maxIndex = sortedYearData.length > 0 ? sortedYearData.length - 1 : 0;

  // Simple date/time formatting
  const currentDateString = useMemo(() => {
    if (!currentTime) return "";
    return (
      currentTime.toUTCString().slice(5, 16) +
      " " +
      currentTime.toUTCString().slice(17, 22)
    );
  }, [currentTime]);

  return (
    <div className="h-[90vh] flex mt-[6%]">
      {/* Left side: Map and controls */}
      <div className="flex-1 flex flex-col text-zinc-300">
        {/* Top bar */}
        <div className="p-4 flex justify-evenly items-center z-10 w-full h-[8vh] bg-zinc-800/80 backdrop-blur-sm text-xs">
          <div>
            <label className="mr-2 font-semibold">Select Year:</label>
            <select
              value={selectedYear || ""}
              onChange={handleYearChange}
              className="bg-zinc-600 rounded p-2"
              disabled={selectedCyclones.length > 0}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Switch for Show Entire Year */}
          <div className="flex items-center space-x-2">
            <label className="font-semibold">Show Entire Year:</label>
            <Switch
              checked={showAllYear}
              onCheckedChange={(val) => setShowAllYear(val)}
              disabled={selectedCyclones.length > 0}
            />
          </div>

          {/* Switch for Cumulative Mode */}
          {!showAllYear && selectedCyclones.length === 0 && (
            <div className="flex items-center space-x-2">
              <label className="font-semibold">Cumulative Mode:</label>
              <Switch
                checked={cumulativeMode}
                onCheckedChange={(val) => setCumulativeMode(val)}
              />
            </div>
          )}

          {/* Switch for AI Mode */}
          <div className="flex items-center space-x-2">
            <label className="font-semibold">AI Mode:</label>
            <Switch
              checked={showAIPrediction}
              onCheckedChange={(val) => setShowAIPrediction(val)}
            />
          </div>

          {/* Time slider */}
          {!showAllYear &&
            sortedYearData.length > 0 &&
            currentTime &&
            selectedCyclones.length === 0 && (
              <div className="flex items-center space-x-2">
                <label className="font-semibold">Time:</label>
                <span className="w-[250px]">{currentTime.toUTCString()}</span>
                <input
                  type="range"
                  min={0}
                  max={maxIndex}
                  step={1}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-[25vw]"
                />
                <p className="text-zinc-300 text-xs">Animation Slider!</p>
              </div>
            )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <ReactMapGL
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={[
              "lines-layer-actual",
              "points-layer-actual",
              "lines-layer-ai",
            ]} // we want to hover on these
            onMouseMove={onHover}
          >
            {/* Actual source */}
            <Source id="cyclones-actual" type="geojson" data={geojsonActual}>
              <Layer
                id="lines-layer-actual"
                type="line"
                filter={["==", "$type", "LineString"]}
                paint={{
                  "line-width": 2,
                  "line-color": ["get", "color"],
                }}
              />
              <Layer
                id="points-layer-actual"
                type="circle"
                filter={["==", "$type", "Point"]}
                paint={{
                  "circle-radius": 3,
                  "circle-color": ["get", "color"],
                }}
              />
            </Source>

            {/* AI source (lines only) */}
            {showAIPrediction && (
              <Source id="cyclones-ai" type="geojson" data={geojsonAI}>
                <Layer
                  id="lines-layer-ai"
                  type="line"
                  filter={["==", "$type", "LineString"]}
                  paint={{
                    "line-width": 2,
                    "line-dasharray": [2, 2],
                    "line-color": ["get", "color"],
                  }}
                />
              </Source>
            )}

            {/* Popup logic */}
            {hoverInfo && hoverInfo.isAI && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div className="text-xs text-zinc-600 font-semibold">
                  AI Predicted
                </div>
              </Popup>
            )}
            {hoverInfo && hoverInfo.info && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div className="text-xs text-zinc-600">
                  <div>
                    <b>Name:</b> {hoverInfo.info.name}
                  </div>
                  <div>
                    <strong>Wind (kt):</strong>{" "}
                    {hoverInfo.info.maximumsustainedsurfacewind}
                  </div>
                  <div>
                    <strong>Pressure (hPa):</strong>{" "}
                    {hoverInfo.info.estimatedcentralpressurehpaorecp}
                  </div>
                  <div>
                    <strong>Date/Time:</strong>{" "}
                    {hoverInfo.info.datetime.toUTCString()}
                  </div>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>
      </div>

      {/* Sidebar: Search and Compare Cyclones */}
      <div className="z-10 fixed left-1 bottom-1 rounded-xl w-[18vw] h-[40vh] bg-zinc-800/80 backdrop-blur-sm p-4 flex flex-col">
        <h2 className="text-white text-sm mb-5">Compare Cyclones</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name/year"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-3 text-xs bg-transparent text-white border border-zinc-500 rounded-lg w-full"
        />

        <div className="flex-1 overflow-auto">
          {filteredCyclones.map((c) => (
            <div
              key={c.id}
              className="mb-2 p-2 bg-zinc-800 border border-zinc-500 rounded cursor-pointer"
              onClick={() => selectCyclone(c)}
            >
              <div className="font-semibold text-xs text-zinc-200">
                {c.name}
              </div>
              <div className="text-[11px] mt-1 text-zinc-200">
                Year: {c.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between bg-zinc-800/40 backdrop-blur-sm rounded-lg text-white p-4 space-x-4 text-sm w-[250px]">
        {/* Play/Pause Button with image */}
        <button onClick={() => setIsPlaying(!isPlaying)}>
          <Image
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play/Pause"
            width={25}
            height={25}
          />
        </button>

        {/* Current date/time display */}
        <div className="flex items-center justify-center">
          {currentDateString ? currentDateString : "No Data"}
        </div>
      </div>

      {/* Selected Cyclones Box */}
      <div className="z-10 fixed right-0 bottom-0 w-[18vw] bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl text-zinc-300">
        <h3 className="font-semibold text-sm mb-4">Selected Cyclones:</h3>
        {selectedCycloneDetails.length === 0 && (
          <div className="text-xs text-gray-500">No cyclones selected.</div>
        )}
        {selectedCycloneDetails.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between mb-2 bg-zinc-800 p-2 border border-zinc-500 rounded"
          >
            <div>
              <div className="font-semibold text-xs text-zinc-200 w-full">
                {c.name}
              </div>
              <div className="text-[11px] mt-1 text-zinc-200">
                Year: {c.year}
              </div>
            </div>
            <button
              onClick={() => removeCyclone(c.id)}
              className="w-10 h-10 flex-shrink-0 ml-2"
            >
              <Image src={trash} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
