"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import trash from "@/assets/delete.svg";

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
const initialViewState = { longitude: 70, latitude: 15, zoom: 4 };

// Helper function to get a display name for a cyclone
function getCycloneDisplayName(c: UniqueCyclone, data: CycloneData[]): string {
  // Find all data points for this cyclone
  const cycloneDataPoints = data.filter((d) => {
    const yr = d.datetime.getUTCFullYear();
    const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
    return id === c.id;
  });

  // Sort to find the earliest data point
  cycloneDataPoints.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

  const earliest = cycloneDataPoints[0];
  if (!earliest) {
    // Fallback if no data found
    return "Unknown-Cyclone";
  }

  // 1) If the cyclone has an existing name (non-empty), use that.
  if (earliest.name && earliest.name.trim() !== "") {
    return earliest.name;
  }
  // 2) Otherwise, construct "basin-year" (e.g., "BOB-2019").
  else {
    const year = earliest.datetime.getUTCFullYear();
    return `${earliest.basinoforigin}-${year}`;
  }
}

export default function Cyclones() {
  const [rawData, setRawData] = useState<CycloneData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    info: CycloneData;
  } | null>(null);

  const [showAllYear, setShowAllYear] = useState(false);
  const [cumulativeMode, setCumulativeMode] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCyclones, setSelectedCyclones] = useState<string[]>([]);

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

  const yearData = useMemo(() => {
    if (!selectedYear) return [];
    return rawData.filter((d) => d.datetime.getUTCFullYear() === selectedYear);
  }, [selectedYear, rawData]);

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

  const currentIndex = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return 0;
    const idx = sortedYearData.findIndex(
      (d) => d.datetime.getTime() === currentTime.getTime()
    );
    return idx >= 0 ? idx : 0;
  }, [currentTime, sortedYearData]);

  const handleIndexSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (sortedYearData[idx]) {
      setCurrentTime(sortedYearData[idx].datetime);
    }
  };

  const uniqueCyclones: UniqueCyclone[] = useMemo(() => {
    const cycloneMap = new Map<string, UniqueCyclone>();
    for (const d of rawData) {
      const yr = d.datetime.getUTCFullYear();
      const id = `${yr}-${d.serialnumberofsystemduringyear}-${d.basinoforigin}`;
      if (!cycloneMap.has(id)) {
        cycloneMap.set(id, {
          id,
          name: d.name || "Unknown",
          year: yr,
          basin: d.basinoforigin,
          serial: d.serialnumberofsystemduringyear,
        });
      }
    }
    return Array.from(cycloneMap.values());
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

  const isComparing = selectedCyclones.length > 0;

  const displayedPointsYearMode = useMemo(() => {
    if (showAllYear) {
      return sortedYearData;
    } else {
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
    }
  }, [showAllYear, cumulativeMode, sortedYearData, currentTime]);

  const displayedLinesYearMode = useMemo(() => {
    if (showAllYear) {
      return sortedYearData;
    } else {
      if (!currentTime) return [];
      if (cumulativeMode) {
        return sortedYearData.filter(
          (d) => d.datetime.getTime() <= currentTime.getTime()
        );
      } else {
        const currentTimeValue = currentTime.getTime();
        const exactMatches = sortedYearData.filter(
          (d) => d.datetime.getTime() === currentTimeValue
        );

        if (exactMatches.length === 0) {
          return [];
        } else {
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
      }
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

  const displayedPoints = isComparing
    ? displayedDataSelectedMode
    : displayedPointsYearMode;
  const displayedLines = isComparing
    ? displayedDataSelectedMode
    : displayedLinesYearMode;

  const cycloneGroupsPoints = useMemo(() => {
    const groups: Record<string, CycloneData[]> = {};
    for (const d of displayedPoints) {
      const key = d.serialnumberofsystemduringyear;
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    }
    return groups;
  }, [displayedPoints]);

  const cycloneGroupsLines = useMemo(() => {
    const groups: Record<string, CycloneData[]> = {};
    for (const d of displayedLines) {
      const key = d.serialnumberofsystemduringyear;
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    }
    return groups;
  }, [displayedLines]);

  const features: any[] = [];

  // Add line features
  for (const [key, points] of Object.entries(cycloneGroupsLines)) {
    const sortedPoints = [...points].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = sortedPoints[i];
      const end = sortedPoints[i + 1];
      features.push({
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

  // Add point features
  for (const [key, points] of Object.entries(cycloneGroupsPoints)) {
    for (const p of points) {
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
        properties: { ...p, color: gradeColors[p.gradeText] || "#fff" },
      });
    }
  }

  console.log(cycloneGroupsPoints, cycloneGroupsLines);

  const geojson = {
    type: "FeatureCollection",
    features,
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

  const onHover = useCallback((event: any) => {
    const { features } = event;
    const f =
      features && features.find((f: any) => f.geometry.type === "Point");
    if (f && f.properties) {
      const info: CycloneData = {
        ...f.properties,
        datetime: new Date(f.properties.datetime),
      };
      setHoverInfo({
        longitude: f.geometry.coordinates[0],
        latitude: f.geometry.coordinates[1],
        info,
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  const maxIndex = sortedYearData.length > 0 ? sortedYearData.length - 1 : 0;

  return (
    <div className="h-[90vh] flex mt-[6%]">
      {/* Left side: Map and controls */}
      <div className="flex-1 flex flex-col text-zinc-300">
        <div className="p-4 flex justify-evenly items-center z-10 w-full h-[8vh] bg-zinc-800/80 backdrop-blur-sm text-sm">
          <div>
            <label className="mr-2 font-semibold">Select Year:</label>
            <select
              value={selectedYear || ""}
              onChange={handleYearChange}
              className="bg-zinc-600 rounded p-2"
              disabled={isComparing} // Disable when comparing
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="font-semibold">Show Entire Year:</label>
            <input
              type="checkbox"
              checked={showAllYear}
              onChange={() => setShowAllYear(!showAllYear)}
              disabled={isComparing} // Disable when comparing
            />
          </div>

          {!showAllYear && !isComparing && (
            <div className="flex items-center space-x-2">
              <label className="font-semibold">Cumulative Mode:</label>
              <input
                type="checkbox"
                checked={cumulativeMode}
                onChange={() => setCumulativeMode(!cumulativeMode)}
              />
            </div>
          )}

          {!showAllYear &&
            sortedYearData.length > 0 &&
            currentTime &&
            !isComparing && (
              <div className="flex items-center space-x-2">
                <label className="font-semibold">Time:</label>
                <span className="w-[250px]">{currentTime.toUTCString()}</span>
                <input
                  type="range"
                  min={0}
                  max={maxIndex}
                  step={1}
                  value={currentIndex}
                  onChange={handleIndexSliderChange}
                  className="w-[40vw]"
                />
                <p className="text-zinc-300 text-xs">Animation Slider!</p>
              </div>
            )}
        </div>

        <div className="flex-1 relative">
          <ReactMapGL
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={["points-layer"]}
            onMouseMove={onHover}
          >
            <Source id="cyclones" type="geojson" data={geojson}>
              <Layer
                id="lines-layer"
                type="line"
                filter={["==", "$type", "LineString"]}
                paint={{
                  "line-width": 2,
                  "line-color": ["get", "color"],
                }}
              />

              <Layer
                id="points-layer"
                type="circle"
                paint={{ "circle-radius": 3, "circle-color": ["get", "color"] }}
                filter={["==", "$type", "Point"]}
              />
            </Source>

            {hoverInfo && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div className="text-xs text-zinc-600">
                  <div>
                    <b>Name:</b>{" "}
                    {(() => {
                      // 1) Build a UniqueCyclone from hoverInfo.info
                      const info = hoverInfo.info;
                      const year = info.datetime.getUTCFullYear();
                      const id = `${year}-${info.serialnumberofsystemduringyear}-${info.basinoforigin}`;

                      const hoveredCyclone: UniqueCyclone = {
                        id,
                        name: info.name || "Unknown",
                        year,
                        basin: info.basinoforigin,
                        serial: info.serialnumberofsystemduringyear,
                      };

                      // 2) Call getCycloneDisplayName
                      return getCycloneDisplayName(hoveredCyclone, rawData);
                    })()}
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
          {filteredCyclones.map((c) => {
            const displayName = getCycloneDisplayName(c, rawData);
            return (
              <div
                key={c.id}
                className="mb-2 p-2 bg-zinc-800 border border-zinc-500 rounded cursor-pointer"
                onClick={() => selectCyclone(c)}
              >
                {/* Use the new displayName */}
                <div className="font-semibold text-xs text-zinc-200">
                  {displayName}
                </div>
                <div className="text-[11px] mt-1 text-zinc-200">
                  Year: {c.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="z-10 fixed right-0 bottom-0 w-[18vw] bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl bg-zinc-800 text-zinc-300">
        <h3 className="font-semibold text-sm mb-4">Selected Cyclones:</h3>
        {selectedCycloneDetails.length === 0 && (
          <div className="text-xs text-gray-500">No cyclones selected.</div>
        )}
        {selectedCycloneDetails.map((c) => {
          const displayName = getCycloneDisplayName(c, rawData);
          return (
            <div key={c.id} className="flex items-center justify-between mb-2">
              <div>
                {/* Use the displayName for selected cyclones too */}
                <div className="font-semibold text-xs text-zinc-200 w-full">
                  {displayName}
                </div>
                <div className="text-[11px] mt-1 text-zinc-200">
                  Year: {c.year}
                </div>
              </div>
              <button onClick={() => removeCyclone(c.id)} className="w-10 h-10">
                <Image src={trash} alt="" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
