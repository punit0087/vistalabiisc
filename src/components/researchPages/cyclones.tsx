"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

// shadcn/ui Switch
import { Switch } from "@/components/ui/switch";

import { ManualOverlay } from "@/components/ui/ManualOverlay";
import Legend from "../ui/legend";

import trash from "@/assets/delete.svg";
import playIcon from "@/assets/play.svg";
import pauseIcon from "@/assets/pause.svg";
import resetIcon from "@/assets/reset.svg";
import infoIcon from "@/assets/info.svg";

// If using react-map-gl v7 with named exports, adjust accordingly:
const ReactMapGL = require("react-map-gl").default;

/**************************************************************
 * Types & Constants
 **************************************************************/
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

type DisplayMode = "showYear" | "single" | "cumulative";

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
  const [showManual, setShowManual] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Data / states
  const [rawData, setRawData] = useState<CycloneData[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCyclones, setSelectedCyclones] = useState<string[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const [displayMode, setDisplayMode] = useState<DisplayMode>("cumulative");
  const [showAIPrediction, setShowAIPrediction] = useState(false);

  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    info?: CycloneData;
    isAI?: {
      name: string;
      latitudePlus: number;
      longitudePlus: number;
      gradeText: string;
    };
  } | null>(null);

  // If user has at least one selected cyclone => comparing
  const isComparing = selectedCyclones.length > 0;

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
              // AI coords
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

  // Derived: filter by year
  const yearData = useMemo(() => {
    if (!selectedYear) return [];
    return rawData.filter((d) => d.datetime.getUTCFullYear() === selectedYear);
  }, [selectedYear, rawData]);

  // Sort year data by time
  const sortedYearData = useMemo(() => {
    return [...yearData].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );
  }, [yearData]);

  // If we haven't set currentTime, default to earliest
  useEffect(() => {
    if (sortedYearData.length > 0 && !currentTime) {
      setCurrentTime(sortedYearData[0].datetime);
    }
  }, [sortedYearData, currentTime]);

  // Find the index of currentTime in sortedYearData
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

  // On slider => set currentTime
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    if (sortedYearData[val]) {
      setCurrentTime(sortedYearData[val].datetime);
    }
  };

  // Auto-play logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && sortedYearData.length > 0) {
      timer = setInterval(() => {
        setSliderValue((prev) => {
          let next = prev + 1;
          if (next >= sortedYearData.length) {
            clearInterval(timer!);
            setIsPlaying(false);
            return prev; // remain on last
          }
          setCurrentTime(sortedYearData[next].datetime);
          return next;
        });
      }, 200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, sortedYearData]);

  // Searching & comparing
  const uniqueCyclones: UniqueCyclone[] = useMemo(() => {
    const map = new Map<string, UniqueCyclone>();
    for (const d of rawData) {
      const yr = d.datetime.getUTCFullYear();
      const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
      if (!map.has(id)) {
        map.set(id, {
          id,
          name: d.name.trim(),
          year: yr,
          basin: d.basinoforigin,
          serial: d.serialnumberofsystemduringyear,
        });
      }
    }
    return Array.from(map.values());
  }, [rawData]);

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

  // Decide displayed data
  const displayedPointsYearMode = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return [];
    switch (displayMode) {
      case "showYear":
        return sortedYearData;
      case "single":
        return sortedYearData.filter(
          (d) => d.datetime.getTime() === currentTime.getTime()
        );
      case "cumulative":
      default:
        return sortedYearData.filter(
          (d) => d.datetime.getTime() <= currentTime.getTime()
        );
    }
  }, [displayMode, sortedYearData, currentTime]);

  const displayedLinesYearMode = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return [];
    switch (displayMode) {
      case "showYear":
        return sortedYearData;
      case "single": {
        const tVal = currentTime.getTime();
        const exactMatches = sortedYearData.filter(
          (d) => d.datetime.getTime() === tVal
        );
        if (exactMatches.length === 0) return [];
        const result: CycloneData[] = [];
        for (const match of exactMatches) {
          const cid = match.serialnumberofsystemduringyear;
          const partial = sortedYearData.filter(
            (d) =>
              d.serialnumberofsystemduringyear === cid &&
              d.datetime <= match.datetime
          );
          result.push(...partial);
        }
        return result;
      }
      case "cumulative":
      default:
        return sortedYearData.filter(
          (d) => d.datetime.getTime() <= currentTime.getTime()
        );
    }
  }, [displayMode, sortedYearData, currentTime]);

  // If comparing => only selected
  const displayedDataSelectedMode = useMemo(() => {
    const selectedSet = new Set(selectedCyclones);
    return rawData.filter((d) => {
      const yr = d.datetime.getUTCFullYear();
      const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
      return selectedSet.has(id);
    });
  }, [rawData, selectedCyclones]);

  const displayedPoints = isComparing
    ? displayedDataSelectedMode
    : displayedPointsYearMode;
  const displayedLines = isComparing
    ? displayedDataSelectedMode
    : displayedLinesYearMode;

  // Group by ID
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

  // Actual lines
  const lineFeaturesActual: any[] = [];
  for (const items of Object.values(lineGroups)) {
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

  // Actual points
  const pointFeaturesActual: any[] = [];
  for (const items of Object.values(pointGroups)) {
    for (const p of items) {
      pointFeaturesActual.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
        properties: {
          ...p,
          color: gradeColors[p.gradeText] || "#fff",
        },
      });
    }
  }

  /****************** AI Lines & Points ********************/
  // Build AI lines only if showAIPrediction is on
  let lineFeaturesAI: any[] = [];
  let pointFeaturesAI: any[] = [];

  if (showAIPrediction) {
    // AI lines
    for (const items of Object.values(lineGroups)) {
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
            ai: true,
          },
        });
      }
    }

    // AI points
    for (const items of Object.values(pointGroups)) {
      for (const p of items) {
        // Add a separate point using latPlus/longPlus
        // so we can style them or show a popup
        pointFeaturesAI.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.longitudePlus, p.latitudePlus],
          },
          properties: {
            name: p.name,
            latitudePlus: p.latitudePlus,
            longitudePlus: p.longitudePlus,
            gradeText: p.gradeText,
            color: gradeColors[p.gradeText] || "#ccc",
            ai: true,
          },
        });
      }
    }
  }

  // Combine them
  const geojsonActual = {
    type: "FeatureCollection",
    features: [...lineFeaturesActual, ...pointFeaturesActual],
  };

  const geojsonAI = {
    type: "FeatureCollection",
    features: [...lineFeaturesAI, ...pointFeaturesAI],
  };

  /****************** Handlers ********************/
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

  // Single button with 3 states: Play, Pause, Reset
  function handleReset() {
    setIsPlaying(false);
    setSliderValue(0);
    if (sortedYearData.length > 0) {
      setCurrentTime(sortedYearData[0].datetime);
    }
  }

  function handleSingleButtonClick() {
    if (sliderValue === sortedYearData.length - 1) {
      // at the end => reset
      handleReset();
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  let buttonIcon = playIcon;
  if (isPlaying) {
    buttonIcon = pauseIcon;
  }
  if (sliderValue === sortedYearData.length - 1) {
    buttonIcon = resetIcon;
  }

  const maxIndex = sortedYearData.length > 0 ? sortedYearData.length - 1 : 0;
  const currentDateString = useMemo(() => {
    if (!currentTime) return "";
    return (
      currentTime.toUTCString().slice(5, 16) +
      " " +
      currentTime.toUTCString().slice(17, 22)
    );
  }, [currentTime]);

  // On hover
  const onHover = useCallback((event: any) => {
    const { features } = event;
    if (!features || features.length === 0) {
      setHoverInfo(null);
      return;
    }

    const f = features[0];
    if (!f.geometry || !f.geometry.coordinates) {
      setHoverInfo(null);
      return;
    }

    const coords = f.geometry.coordinates;
    if (f.geometry.type === "Point" && f.properties) {
      // Check if it's from the AI layer
      if (f.layer?.id === "points-layer-ai") {
        // AI point
        setHoverInfo({
          longitude: coords[0],
          latitude: coords[1],
          isAI: {
            name: f.properties.name || "AI-Point",
            latitudePlus: coords[1],
            longitudePlus: coords[0],
            gradeText: f.properties.gradeText || "D",
          },
        });
      } else if (f.layer?.id === "points-layer-actual") {
        // actual point
        const info: CycloneData = {
          ...f.properties,
          datetime: new Date(f.properties.datetime),
        };
        setHoverInfo({
          longitude: coords[0],
          latitude: coords[1],
          info,
        });
      } else {
        setHoverInfo(null);
      }
    } else {
      setHoverInfo(null);
    }
  }, []);

  // Overlay if not started
  if (!hasStarted) {
    return (
      <div className="relative w-full h-[90vh] flex items-center justify-center bg-black text-white">
        <div className="w-full h-full bg-black flex flex-col items-center justify-center">
          <h1 className="text-xl mb-1 text-zinc-200">
            Welcome to the Cyclone_AI Visualization
          </h1>
          <p className="text-xs text-zinc-400 font-semibold mb-8">
            Developed by VistaLab
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="px-4 py-2 bg-zinc-900 text-sm"
          >
            Start Experience
          </button>
        </div>
      </div>
    );
  }

  const legendItems = [
    { label: "Depression", color: "#78c6a3" },
    { label: "Deep Depression", color: "#61a2de" },
    { label: "Cyclonic Storm", color: "#f39c12" },
    { label: "Severe Cyclonic Storm", color: "#d35400" },
    { label: "Very Severe Cyclonic Storm", color: "#e74c3c" },
    { label: "Extremely Severe Cyclonic Storm", color: "#c0392b" },
    { label: "Super Cyclonic Storm", color: "#8e44ad" },
  ];

  return (
    <div className="h-[89vh] flex mt-[6%]">
      {/* Left side: Map & top bar */}
      <div className="flex-1 flex flex-col text-zinc-300">
        {/* Top bar */}
        <div className="flex items-center justify-around z-10 w-full h-[8vh] bg-zinc-800/80 backdrop-blur-sm text-sm">
          {/* Year Selector (hide if comparing) */}
          {!isComparing && (
            <div>
              <label className="mr-2 font-semibold">Select Year:</label>
              <select
                value={selectedYear || ""}
                onChange={handleYearChange}
                className="bg-zinc-600 rounded p-2"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Triple Toggle (hide if comparing) */}
          {!isComparing && (
            <div className="flex items-center space-x-2">
              <div className="relative w-[350px] h-10 border border-zinc-600 rounded-full flex items-center">
                <div
                  className="absolute w-[107px] h-8 bg-zinc-600 rounded-full transition-all"
                  style={{
                    left:
                      displayMode === "showYear"
                        ? "4px"
                        : displayMode === "single"
                        ? "calc(50% - 54px)"
                        : "calc(100% - 110px)",
                  }}
                />
                <button
                  className="relative text-sm text-zinc-200 w-1/3"
                  onClick={() => setDisplayMode("showYear")}
                >
                  Entire Year
                </button>
                <button
                  className="relative text-sm text-zinc-200 w-1/3"
                  onClick={() => setDisplayMode("single")}
                >
                  Single Events
                </button>
                <button
                  className="relative text-sm text-zinc-200 w-1/3"
                  onClick={() => setDisplayMode("cumulative")}
                >
                  Cumulative
                </button>
              </div>
            </div>
          )}

          {/* Single Button (Play/Pause/Reset), hide if showYear or comparing */}
          {displayMode !== "showYear" && !isComparing && (
            <button onClick={handleSingleButtonClick}>
              <Image
                src={buttonIcon}
                alt="Play/Pause/Reset"
                width={25}
                height={25}
              />
            </button>
          )}

          {/* Slider (only if not "show entire year" & not comparing) */}
          {displayMode !== "showYear" &&
            sortedYearData.length > 0 &&
            currentTime &&
            !isComparing && (
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min={0}
                  max={maxIndex}
                  step={1}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-[20vw]"
                />
                <span className="w-[250px] pl-3">
                  {currentTime.toUTCString()}
                </span>
              </div>
            )}

          {/* AI Toggle */}
          <div className="flex items-center space-x-2">
            <label className="font-semibold">AI-Predictions:</label>
            <Switch
              checked={showAIPrediction}
              onCheckedChange={(val) => setShowAIPrediction(val)}
            />
          </div>

          {/* Manual Overlay Trigger */}
          <button
            onClick={() => setShowManual(true)}
            className="flex items-center space-x-2 px-3 py-2"
          >
            <Image src={infoIcon} alt="Info" width={16} height={16} />
            <span className="text-sm">Manual</span>
          </button>
          {showManual && <ManualOverlay onClose={() => setShowManual(false)} />}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <ReactMapGL
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}
            // Add "points-layer-ai" to interactiveLayers if you want to hover them
            interactiveLayerIds={[
              "lines-layer-actual",
              "points-layer-actual",
              "lines-layer-ai",
              "points-layer-ai",
            ]}
            onMouseMove={onHover}
            // Force the default arrow cursor instead of a pointer
            getCursor={() => "default"}
          >
            {/* Actual source/layers */}
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

            {/* AI source/layers (only if toggled on) */}
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
                <Layer
                  id="points-layer-ai"
                  type="circle"
                  filter={["==", "$type", "Point"]}
                  paint={{
                    "circle-radius": 3,
                    "circle-color": ["get", "color"],
                  }}
                />
              </Source>
            )}

            {/* Popups */}
            {/* AI Popup */}
            {hoverInfo && hoverInfo.isAI && (
              <Popup
                className="no-bg-popup"
                longitude={hoverInfo.isAI.longitudePlus}
                latitude={hoverInfo.isAI.latitudePlus}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div
                  className="text-xs text-white p-2"
                  style={{
                    backgroundColor:
                      gradeColors[hoverInfo.isAI.gradeText] || "#ccc",
                  }}
                >
                  <div>
                    <b>Name:</b> {hoverInfo.isAI.name}
                  </div>
                  <div>
                    <b>Latitude:</b> {hoverInfo.isAI.latitudePlus}
                  </div>
                  <div>
                    <b>Longitude:</b> {hoverInfo.isAI.longitudePlus}
                  </div>
                </div>
              </Popup>
            )}

            {/* Actual Data Popup */}
            {hoverInfo && hoverInfo.info && (
              <Popup
                className="no-bg-popup"
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div
                  className="text-xs text-white p-2"
                  style={{
                    backgroundColor:
                      gradeColors[hoverInfo.info.gradeText] || "#fff",
                  }}
                >
                  <div>
                    <b>Name:</b> {hoverInfo.info.name}
                  </div>
                  <div>
                    <strong>Pressure (hPa):</strong>{" "}
                    {hoverInfo.info.estimatedcentralpressurehpaorecp}
                  </div>
                  <div>
                    <strong>Date/Time:</strong>{" "}
                    {hoverInfo.info.datetime.toUTCString()}
                  </div>
                  <div>
                    <strong>Wind (kt):</strong>{" "}
                    {hoverInfo.info.maximumsustainedsurfacewind}
                  </div>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>
      </div>

      {/* Legend */}
      <Legend
        legendItems={[
          { label: "Depression", color: "#78c6a3" },
          { label: "Deep Depression", color: "#61a2de" },
          { label: "Cyclonic Storm", color: "#f39c12" },
          { label: "Severe Cyclonic Storm", color: "#d35400" },
          { label: "Very Severe Cyclonic Storm", color: "#e74c3c" },
          { label: "Extremely Severe Cyclonic Storm", color: "#c0392b" },
          { label: "Super Cyclonic Storm", color: "#8e44ad" },
        ]}
      />

      {/* Sidebar (Compare Cyclones) */}
      <div className="z-[9] fixed left-4 bottom-4 rounded-xl w-[18vw] h-[35vh] bg-zinc-800/80 backdrop-blur-sm p-4 flex flex-col">
        <h2 className="text-white text-sm mb-5">Compare Cyclones</h2>
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
              <div className="text-[10px] mt-1 text-zinc-200">
                Year: {c.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Cyclones Box */}
      <div className="z-[9] fixed right-4 bottom-4 w-[18vw] bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl text-zinc-300">
        <h3 className="font-semibold text-zinc-200 text-sm mb-4">
          Selected Cyclones:
        </h3>
        {selectedCycloneDetails.length === 0 && (
          <div className="text-xs text-zinc-500">No cyclones selected.</div>
        )}
        {selectedCycloneDetails.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between mb-2 bg-zinc-800 p-2 border border-zinc-500 rounded"
          >
            <div>
              <div className="font-semibold text-xs text-zinc-200">
                {c.name}
              </div>
              <div className="text-[10px] mt-1 text-zinc-200">
                Year: {c.year}
              </div>
            </div>
            <button
              onClick={() => removeCyclone(c.id)}
              className="w-10 h-10 flex-shrink-0 ml-2"
            >
              <Image src={trash} alt="Remove" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
