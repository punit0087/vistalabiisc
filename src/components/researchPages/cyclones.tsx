"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { Popup, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

import { ManualOverlay } from "@/components/ui/ManualOverlay";
import { Switch } from "@/components/ui/switch";
import trash from "@/assets/delete.svg";
import playIcon from "@/assets/play.svg";
import pauseIcon from "@/assets/pause.svg";
import resetIcon from "@/assets/reset.svg";
import QuestionIcon from "@/assets/question.svg";
import Legend from "../ui/legend";

import mosdac from "@/assets/mosdac.png";
import isro from "@/assets/isro_logo.svg";

const ReactMapGL = require("react-map-gl").default;

interface CycloneData {
  datetime: Date; // Combined from date_dd-mm-yyyy + time-utc
  serial_number_of_system_during_year: string;
  basin_of_origin: string;
  name: string;
  date_dd_mm_yyyy: string; // original string from CSV
  time_utc: string; // original string from CSV
  lat: number;
  long: number;
  ci_no: number;
  estimated_central_pressure_hPa: number;
  maximum_sustained_surface_wind_kt: number;
  pressure_drop_hPa: number;
  grade: string;
  flow: string;
  basin_at_time: string;
  data_type: string;
}

interface UniqueCyclone {
  id: string;
  name: string;
  year: number;
  basin: string;
  serial: string;
}

type DisplayMode = "single" | "cumulative" | "showYear";

const gradeColors: Record<string, string> = {
  D: "#1491de",
  DD: "#6ec1ea",
  CS: "#4cffff",
  SCS: "#c0ffbf",
  VSCS: "#ffd98c",
  ESCS: "#ff738a",
  SuCS: "#a188fc",
};

const aiGradeColors: Record<string, string> = {
  D: "#1491de",
  DD: "#6ec1ea",
  CS: "#4cffff",
  SCS: "#c0ffbf",
  VSCS: "#ffd98c",
  ESCS: "#ff738a",
  SuCS: "#a188fc",
};

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGVva29uZGEiLCJhIjoiY200c3RjanQ2MDN3YjJxczRjbnFweTVhciJ9.OrD4H7eWIrHnABf_Y1Nn4A";

const initialViewState = { longitude: 76, latitude: 15, zoom: 4 };

interface AiRow {
  image_name: string;
  serial_number_of_system_during_year: string;
  basin_of_origin: string;
  name: string;
  "date-dd-mm-yyyy": string; // "DD-MM-YYYY"
  "time-utc": string; // "HHmm"
  predicted_lat: string;
  predicted_long: string;
  predicted_class: string;
  gt_class: string;
  lat_error: string;
  long_error: string;
  distance_from_closest_gt: string;
  __parsedDate?: Date;
  matchedGrade: string; // Add this optional property
}

export default function Cyclones() {
  const [showManual, setShowManual] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [rawData, setRawData] = useState<CycloneData[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Searching & comparing cyclones
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCyclones, setSelectedCyclones] = useState<string[]>([]);
  const isComparing = selectedCyclones.length > 0;

  // Playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  // Hover info
  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    isAI?: boolean;
    aiInfo?: AiRow;
    actualInfo?: CycloneData;
  } | null>(null);

  // Triple toggle
  const [displayMode, setDisplayMode] = useState<DisplayMode>("cumulative");

  // AI toggle
  const [showAIPrediction, setShowAIPrediction] = useState(false);
  const [disableAiToggle, setDisableAiToggle] = useState(false);

  // We'll store our map's viewState in state
  const [viewState, setViewState] = useState({
    ...initialViewState,
    bearing: 0,
    pitch: 0,
    transitionDuration: 0,
  });

  // ---------------------------
  // RESET MAP each time a cyclone is selected or removed
  // ---------------------------
  // If you only want to reset when adding, but not removing, you can condition that.
  function resetMapView() {
    setViewState((prev) => ({
      ...prev,
      longitude: initialViewState.longitude,
      latitude: initialViewState.latitude,
      zoom: initialViewState.zoom,
      transitionDuration: 1500, // animate
    }));
  }

  // Whenever we add or remove from `selectedCyclones`, reset the map:
  useEffect(() => {
    if (selectedCyclones.length > 0) {
      resetMapView();
    }
  }, [selectedCyclones.length]);

  // -------------- LOADING CSV: COMBINED --------------
  useEffect(() => {
    Papa.parse("/data/combined.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed: CycloneData[] = (result.data as any[])
          .map((d) => {
            if (!d["date_dd-mm-yyyy"] || !d["time-utc"] || !d["grade"]) {
              return null; // skip invalid rows
            }

            // 1) Normalize the date part (replace any '-' with '/')
            const dateStr = d["date_dd-mm-yyyy"].trim().replace(/-/g, "/");
            const [day, month, year] = dateStr.split("/").map(Number);

            // 2) Time can be e.g. '900', so we pad to 4 chars
            const timeStr = d["time-utc"].toString().padStart(4, "0");
            const hours = parseInt(timeStr.slice(0, 2), 10);
            const mins = parseInt(timeStr.slice(2, 4), 10);

            // Validate
            if (
              isNaN(day) ||
              isNaN(month) ||
              isNaN(year) ||
              isNaN(hours) ||
              isNaN(mins)
            ) {
              return null;
            }

            // 3) Build a JS Date in UTC
            const dt = new Date(Date.UTC(year, month - 1, day, hours, mins));

            return {
              datetime: dt,
              serial_number_of_system_during_year:
                d.serial_number_of_system_during_year,
              basin_of_origin: d.basin_of_origin,
              name: d.name,
              date_dd_mm_yyyy: d["date_dd-mm-yyyy"],
              time_utc: d["time-utc"],
              lat: parseFloat(d.lat),
              long: parseFloat(d.long),
              ci_no: parseFloat(d.ci_no),
              estimated_central_pressure_hPa: parseFloat(
                d.estimated_central_pressure_hPa
              ),
              maximum_sustained_surface_wind_kt: parseFloat(
                d.maximum_sustained_surface_wind_kt
              ),
              pressure_drop_hPa: parseFloat(d.pressure_drop_hPa),
              grade: d.grade,
              flow: d.flow,
              basin_at_time: d.basin_at_time,
              data_type: d.data_type,
            } as CycloneData;
          })
          .filter((row): row is CycloneData => !!row);

        setRawData(parsed);

        // Distinct years
        const distinctYears = Array.from(
          new Set(parsed.map((row) => row.datetime.getUTCFullYear()))
        ).sort();
        setYears(distinctYears);

        // If none chosen, pick the first
        if (distinctYears.length > 0 && selectedYear === null) {
          setSelectedYear(distinctYears[0]);
        }
      },
    });
  }, [selectedYear]);

  // -------------- LOADING CSV: AI_PREDICTED --------------
  const [aiData, setAiData] = useState<AiRow[]>([]);
  useEffect(() => {
    Papa.parse("/data/ai_predicted.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const raw: AiRow[] = res.data as AiRow[];
        const cleaned: AiRow[] = [];

        raw.forEach((row) => {
          if (!row["date-dd-mm-yyyy"] || !row["time-utc"]) return;
          const dateStr = row["date-dd-mm-yyyy"];
          const timeStr = row["time-utc"].padStart(4, "0");

          const normalized = dateStr.replace(/-/g, "/");
          const [dd, mm, yyyy] = normalized.split("/");
          if (!dd || !mm || !yyyy) return;

          const day = parseInt(dd, 10);
          const month = parseInt(mm, 10) - 1;
          const year = parseInt(yyyy, 10);
          const hh = parseInt(timeStr.slice(0, 2), 10);
          const mins = parseInt(timeStr.slice(2, 4), 10);

          if (
            isNaN(day) ||
            isNaN(month) ||
            isNaN(year) ||
            isNaN(hh) ||
            isNaN(mins)
          ) {
            return;
          }
          row.__parsedDate = new Date(Date.UTC(year, month, day, hh, mins));

          // Validate predicted lat/long
          const lat = parseFloat(row.predicted_lat);
          const lon = parseFloat(row.predicted_long);
          if (isNaN(lat) || isNaN(lon)) return;

          cleaned.push(row);
        });

        setAiData(cleaned);
      },
    });
  }, []);

  // -------------- SET currentTime once selectedYear changes --------------
  useEffect(() => {
    if (selectedYear === null) return;
    const filtered = rawData.filter(
      (r) => r.datetime.getUTCFullYear() === selectedYear
    );
    if (filtered.length > 0) {
      const sorted = [...filtered].sort(
        (a, b) => a.datetime.getTime() - b.datetime.getTime()
      );
      setCurrentTime(sorted[0].datetime);
    } else {
      setCurrentTime(null);
    }
  }, [selectedYear, rawData]);

  // Sort + filter actual data for the chosen year
  const yearData = useMemo(() => {
    if (!selectedYear) return [];
    return rawData.filter((d) => d.datetime.getUTCFullYear() === selectedYear);
  }, [rawData, selectedYear]);

  const sortedYearData = useMemo(() => {
    return [...yearData].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );
  }, [yearData]);

  // If currentTime not set, pick first
  useEffect(() => {
    if (!currentTime && sortedYearData.length > 0) {
      setCurrentTime(sortedYearData[0].datetime);
    }
  }, [currentTime, sortedYearData]);

  // Index of currentTime in sortedYearData
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

  // On slider change => set currentTime
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    if (sortedYearData[val]) {
      setCurrentTime(sortedYearData[val].datetime);
    }
  };

  // Playback
  useEffect(() => {
    if (!isPlaying || sortedYearData.length === 0) return;
    let timer: NodeJS.Timeout | null = null;
    timer = setInterval(() => {
      setSliderValue((prev) => {
        const next = prev + 1;
        if (next >= sortedYearData.length) {
          clearInterval(timer!);
          setIsPlaying(false);
          return prev;
        }
        setCurrentTime(sortedYearData[next].datetime);
        return next;
      });
    }, 50);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, sortedYearData]);

  // Unique cyclones
  const uniqueCyclones: UniqueCyclone[] = useMemo(() => {
    const map = new Map<string, UniqueCyclone>();
    rawData.forEach((d) => {
      const yr = d.datetime.getUTCFullYear();
      const key = `${yr}-${d.serial_number_of_system_during_year}-${d.basin_of_origin}`;
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          name: d.name.trim(),
          year: yr,
          basin: d.basin_of_origin,
          serial: d.serial_number_of_system_during_year,
        });
      }
    });
    return Array.from(map.values());
  }, [rawData]);

  const filteredCyclones = useMemo(() => {
    if (!searchQuery) return uniqueCyclones;
    const q = searchQuery.toLowerCase();
    return uniqueCyclones.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.year.toString().includes(q) ||
        c.basin.toLowerCase().includes(q)
    );
  }, [uniqueCyclones, searchQuery]);

  // selecting & removing
  function selectCyclone(c: UniqueCyclone) {
    if (selectedCyclones.length >= 4) {
      alert("You can compare up to 4 cyclones only.");
      return;
    }
    if (!selectedCyclones.includes(c.id)) {
      setSelectedCyclones([...selectedCyclones, c.id]);
    }
  }

  function removeCyclone(id: string) {
    setSelectedCyclones(selectedCyclones.filter((cid) => cid !== id));
  }

  const selectedCycloneDetails = useMemo(() => {
    const map = new Map<string, UniqueCyclone>();
    uniqueCyclones.forEach((u) => map.set(u.id, u));
    return selectedCyclones
      .map((id) => map.get(id))
      .filter((x): x is UniqueCyclone => !!x);
  }, [uniqueCyclones, selectedCyclones]);

  // ----------------------------------
  // ACTUAL data displayed
  // ----------------------------------
  // Depending on displayMode, we choose how many actual points to show
  const displayedPointsYearMode = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return [];
    switch (displayMode) {
      case "showYear":
        return sortedYearData;
      case "single":
        // only exact matches
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

  // For lines
  const displayedLinesYearMode = useMemo(() => {
    if (!currentTime || sortedYearData.length === 0) return [];
    const tVal = currentTime.getTime();
    switch (displayMode) {
      case "showYear":
        return sortedYearData;
      case "single": {
        // gather partial lines for any row that exactly matches currentTime
        const exactMatches = sortedYearData.filter(
          (d) => d.datetime.getTime() === tVal
        );
        if (exactMatches.length === 0) return [];
        const result: CycloneData[] = [];
        exactMatches.forEach((match) => {
          const cycId = match.serial_number_of_system_during_year;
          const partial = sortedYearData.filter(
            (x) =>
              x.serial_number_of_system_during_year === cycId &&
              x.datetime.getTime() <= tVal
          );
          result.push(...partial);
        });
        return result;
      }
      case "cumulative":
      default:
        return sortedYearData.filter((d) => d.datetime.getTime() <= tVal);
    }
  }, [displayMode, sortedYearData, currentTime]);

  // If comparing => only show selected cyclones
  const displayedDataSelectedMode = useMemo(() => {
    if (!isComparing) return [];
    const setSel = new Set(selectedCyclones);
    return rawData.filter((d) => {
      const y = d.datetime.getUTCFullYear();
      const key = `${y}-${d.serial_number_of_system_during_year}-${d.basin_of_origin}`;
      return setSel.has(key);
    });
  }, [isComparing, rawData, selectedCyclones]);

  // The final displayed actual points + lines
  const displayedPoints = isComparing
    ? displayedDataSelectedMode
    : displayedPointsYearMode;
  const displayedLines = isComparing
    ? displayedDataSelectedMode
    : displayedLinesYearMode;

  function groupByCycloneId(data: CycloneData[]) {
    const groups: Record<string, CycloneData[]> = {};
    data.forEach((row) => {
      const k = row.serial_number_of_system_during_year;
      if (!groups[k]) groups[k] = [];
      groups[k].push(row);
    });
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

  // Build GeoJSON for actual
  const lineFeaturesActual: any[] = [];
  Object.values(lineGroups).forEach((group) => {
    const sorted = [...group].sort(
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
            [start.long, start.lat],
            [end.long, end.lat],
          ],
        },
        properties: {
          color: gradeColors[start.grade] || "#fff",
          grade: start.grade,
          data_type: start.data_type,
        },
      });
    }
  });

  const pointFeaturesActual: any[] = [];
  Object.values(pointGroups).forEach((group) => {
    group.forEach((row) => {
      pointFeaturesActual.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [row.long, row.lat] },
        properties: {
          ...row,
          color: gradeColors[row.grade] || "#fff",
        },
      });
    });
  });

  const geojsonActual = {
    type: "FeatureCollection",
    features: [...lineFeaturesActual, ...pointFeaturesActual],
  };

  // ----------------------------------
  // AI data displayed
  // ----------------------------------
  // We directly match each displayed actual row’s date/time with an AI row
  // so that AI “disappears” after the time passes, same as actual data.
  function findAiMatchForRow(
    actual: CycloneData
  ): (AiRow & { matchedGrade?: string }) | null {
    const actualYear = actual.datetime.getUTCFullYear();
    const actualMonth = actual.datetime.getUTCMonth();
    const actualDay = actual.datetime.getUTCDate();
    const actualHour = actual.datetime.getUTCHours();
    const actualMin = actual.datetime.getUTCMinutes();

    const found = aiData.find((ai) => {
      if (!ai.__parsedDate) return false;
      if (
        ai.serial_number_of_system_during_year !==
        actual.serial_number_of_system_during_year
      )
        return false;
      if (ai.basin_of_origin !== actual.basin_of_origin) return false;

      const dt = ai.__parsedDate;
      return (
        dt.getUTCFullYear() === actualYear &&
        dt.getUTCMonth() === actualMonth &&
        dt.getUTCDate() === actualDay &&
        dt.getUTCHours() === actualHour &&
        dt.getUTCMinutes() === actualMin
      );
    });

    if (found) {
      return {
        ...found,
        matchedGrade: actual.grade,
      };
    }

    return null;
  }

  // 1) Build AI points from displayedPoints
  const matchedAiPoints: AiRow[] = useMemo(() => {
    if (!showAIPrediction || disableAiToggle) return [];
    const result: AiRow[] = [];
    displayedPoints.forEach((row) => {
      const found = findAiMatchForRow(row);
      if (found) {
        result.push(found);
      }
    });
    return result;
  }, [showAIPrediction, disableAiToggle, displayedPoints]);

  // 2) Build AI lines from displayedLines
  const matchedAiLines: AiRow[] = useMemo(() => {
    if (!showAIPrediction || disableAiToggle) return [];
    const result: AiRow[] = [];
    displayedLines.forEach((row) => {
      const found = findAiMatchForRow(row);
      if (found) {
        result.push(found);
      }
    });
    return result;
  }, [showAIPrediction, disableAiToggle, displayedLines]);

  // Group the AI lines by (serial+basin)
  function groupAi(rows: AiRow[]) {
    const map: Record<string, AiRow[]> = {};
    rows.forEach((row) => {
      const k =
        row.serial_number_of_system_during_year + "_" + row.basin_of_origin;
      if (!map[k]) map[k] = [];
      map[k].push(row);
    });
    return map;
  }

  const aiPointsGroup = matchedAiPoints;
  const aiLinesGroup = useMemo(() => groupAi(matchedAiLines), [matchedAiLines]);

  // Build features
  const lineFeaturesAI: any[] = [];
  Object.values(aiLinesGroup).forEach((arr) => {
    const sorted = [...arr].sort(
      (a, b) => a.__parsedDate!.getTime() - b.__parsedDate!.getTime()
    );
    for (let i = 0; i < sorted.length - 1; i++) {
      const start = sorted[i];
      const end = sorted[i + 1];
      lineFeaturesAI.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [parseFloat(start.predicted_long), parseFloat(start.predicted_lat)],
            [parseFloat(end.predicted_long), parseFloat(end.predicted_lat)],
          ],
        },
        properties: {
          color: aiGradeColors[start.matchedGrade] || "#ccc",
          isAI: true,
        },
      });
    }
  });

  const pointFeaturesAI: any[] = [];
  aiPointsGroup.forEach((row) => {
    if (!row.__parsedDate) return;
    pointFeaturesAI.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(row.predicted_long),
          parseFloat(row.predicted_lat),
        ],
      },
      properties: {
        ...row,
        color: aiGradeColors[row.matchedGrade] || "#ccc",
        isAI: true,
      },
    });
  });

  const geojsonAI = useMemo(() => {
    if (!showAIPrediction || disableAiToggle) {
      return { type: "FeatureCollection", features: [] };
    }
    return {
      type: "FeatureCollection",
      features: [...lineFeaturesAI, ...pointFeaturesAI],
    };
  }, [showAIPrediction, disableAiToggle, lineFeaturesAI, pointFeaturesAI]);

  // Hover
  const onHover = useCallback((event: any) => {
    const { features } = event;
    if (!features || !features.length) {
      setHoverInfo(null);
      return;
    }
    const f = features[0];
    if (f.geometry.type === "Point" && f.properties) {
      const coords = f.geometry.coordinates;
      if (!coords || coords.length < 2) {
        setHoverInfo(null);
        return;
      }
      const isAI = f.properties.isAI === "true" || f.properties.isAI === true;
      if (isAI) {
        const row: AiRow = {
          image_name: f.properties.image_name,
          serial_number_of_system_during_year:
            f.properties.serial_number_of_system_during_year,
          basin_of_origin: f.properties.basin_of_origin,
          name: f.properties.name,
          "date-dd-mm-yyyy": f.properties["date-dd-mm-yyyy"],
          "time-utc": f.properties["time-utc"],
          predicted_lat: f.properties.predicted_lat,
          predicted_long: f.properties.predicted_long,
          predicted_class: f.properties.predicted_class,
          gt_class: f.properties.gt_class,
          lat_error: f.properties.lat_error,
          long_error: f.properties.long_error,
          distance_from_closest_gt: f.properties.distance_from_closest_gt,
          __parsedDate: undefined,
          matchedGrade: "",
        };
        setHoverInfo({
          longitude: coords[0],
          latitude: coords[1],
          isAI: true,
          aiInfo: row,
        });
      } else {
        const actual: CycloneData = {
          ...f.properties,
          datetime: new Date(f.properties.datetime),
        };
        setHoverInfo({
          longitude: coords[0],
          latitude: coords[1],
          isAI: false,
          actualInfo: actual,
        });
      }
    } else if (f.layer && f.layer.id === "lines-layer-ai") {
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        isAI: true,
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  // Playback button
  const maxIndex = sortedYearData.length > 0 ? sortedYearData.length - 1 : 0;
  function handleReset() {
    setIsPlaying(false);
    setSliderValue(0);
    if (sortedYearData.length > 0) {
      setCurrentTime(sortedYearData[0].datetime);
    }
  }
  function handleSingleButtonClick() {
    if (sliderValue === maxIndex) {
      handleReset();
    } else {
      setIsPlaying(!isPlaying);
    }
  }
  let buttonIcon = playIcon;
  if (isPlaying) buttonIcon = pauseIcon;
  if (sliderValue === maxIndex) buttonIcon = resetIcon;

  // Start Experience overlay
  if (!hasStarted) {
    return (
      <div className="relative w-full h-[90vh] flex items-center justify-center bg-black text-white">
        <div className="w-full h-full bg-black flex flex-col items-center justify-center">
          <h1 className="text-xl mb-1 text-zinc-200">
            Welcome to the <span className="font-semibold">Cyclone_AI</span>{" "}
            Visualization
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
    { label: "Depression (D)", color: "#1491de" },
    { label: "Deep Depression (DD)", color: "#6ec1ea" },
    { label: "Cyclonic Storm (CS)", color: "#4cffff" },
    { label: "Severe Cyclonic Storm (SCS)", color: "#c0ffbf" },
    { label: "Very Severe Cyclonic Storm (VSCS)", color: "#ffd98c" },
    { label: "Extremely Severe Cyclonic Storm (ESCS)", color: "#ff738a" },
    { label: "Super Cyclonic Storm (SuCS)", color: "#a188fc" },
  ];

  // A button to reset the map manually (irrespective of any modes)
  function handleMapResetButton() {
    resetMapView();
  }

  return (
    <div className="h-[88vh] flex" style={{ marginTop: "103px" }}>
      {/* Left side: Map & top bar */}
      <div className="flex-1 flex flex-col text-zinc-300">
        {/* Top bar */}
        <div className="flex items-center justify-around z-10 w-full h-[8vh] bg-zinc-800/80 backdrop-blur-sm text-xs">
          {/* Year Selector (hide if comparing) */}

          <div
            style={{
              opacity: isComparing ? 0.3 : 1,
              pointerEvents: isComparing ? "none" : "auto",
            }}
          >
            <label className="mr-2 font-semibold">Select Year:</label>
            <select
              value={selectedYear || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setSelectedYear(val);
                setIsPlaying(false);
                setSliderValue(0);
              }}
              className="bg-zinc-600 rounded p-2"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Triple Toggle (hide if comparing) */}

          <div
            className="flex items-center space-x-2"
            style={{
              opacity: isComparing ? 0.3 : 1,
              pointerEvents: isComparing ? "none" : "auto",
            }}
          >
            <div className="relative w-[350px] h-10 border border-zinc-600 rounded-full flex items-center">
              <div
                className="absolute w-[107px] h-8 bg-zinc-600 rounded-full transition-all"
                style={{
                  left:
                    displayMode === "single"
                      ? "4px"
                      : displayMode === "cumulative"
                      ? "calc(50% - 54px)"
                      : "calc(100% - 110px)",
                }}
              ></div>
              <button
                className="relative  text-zinc-200 w-1/3"
                onClick={() => setDisplayMode("single")}
              >
                Single Event
              </button>
              <button
                className="relative  text-zinc-200 w-1/3"
                onClick={() => setDisplayMode("cumulative")}
              >
                Cumulative
              </button>
              <button
                className="relative  text-zinc-200 w-1/3"
                onClick={() => setDisplayMode("showYear")}
              >
                Entire Year
              </button>
            </div>
          </div>

          {/* AI Toggle */}
          <div className="flex items-center space-x-2">
            <label className="font-semibold">AI-Predictions:</label>
            <Switch
              disabled={disableAiToggle}
              checked={showAIPrediction}
              onCheckedChange={(val) => setShowAIPrediction(val)}
            />
          </div>
          <button
            style={{}}
            className="text-xs font-semibold hover:scale-105 transition-all duration-300 h-6 border border-zinc-600 px-2 rounded-full"
            onClick={handleMapResetButton}
          >
            Reset View
          </button>
          {/* className="flex items-center space-x-2 " */}
          {/* Manual Button */}
          <button onClick={() => setShowManual(true)} style={{ top: "12rem" }}>
            <Image src={QuestionIcon} alt="Info" width={25} height={25} />
          </button>
          {showManual && <ManualOverlay onClose={() => setShowManual(false)} />}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <ReactMapGL
            {...viewState}
            onMove={(evt: any) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={[
              "lines-layer-actual",
              "points-layer-actual",
              "lines-layer-ai",
              "points-layer-ai",
            ]}
            onMouseMove={onHover}
          >
            {/* ACTUAL data source */}
            <Source id="cyclones-actual" type="geojson" data={geojsonActual}>
              <Layer
                id="lines-layer-actual"
                type="line"
                filter={["==", "$type", "LineString"]}
                paint={{
                  // - If single mode => line-width depends on grade
                  "line-width": [
                    "case",
                    ["==", ["literal", displayMode], "single"],
                    [
                      "match",
                      ["get", "grade"],
                      "D",
                      1,
                      "DD",
                      2,
                      "CS",
                      3,
                      "SCS",
                      4,
                      "VSCS",
                      5,
                      "ESCS",
                      6,
                      "SuCS",
                      7,
                      1, // fallback
                    ],
                    1,
                  ],
                  "line-color": ["get", "color"],
                }}
              />
              <Layer
                id="points-layer-actual"
                type="circle"
                filter={["==", "$type", "Point"]}
                paint={{
                  "circle-radius": [
                    "case",
                    ["==", ["literal", displayMode], "single"],
                    [
                      "+",
                      [
                        "match",
                        ["get", "grade"],
                        "D",
                        1,
                        "DD",
                        2,
                        "CS",
                        3,
                        "SCS",
                        4,
                        "VSCS",
                        5,
                        "ESCS",
                        6,
                        "SuCS",
                        7,
                        1,
                      ],
                      2,
                    ],
                    [
                      "case",
                      ["==", ["get", "data_type"], "BT"],
                      4,
                      ["==", ["get", "data_type"], "IPL"],
                      0,
                      3,
                    ],
                  ],
                  "circle-color": ["get", "color"],
                }}
              />
            </Source>

            {/* AI data source (lines + points) */}
            {showAIPrediction && !disableAiToggle && (
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
                    "circle-stroke-color": "#fff",
                    "circle-stroke-width": 0.5,
                    "circle-color": ["get", "color"],
                  }}
                />
              </Source>
            )}

            {/* Popups */}
            {hoverInfo && hoverInfo.isAI && hoverInfo.aiInfo && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
                className="no-bg-popup"
              >
                <div className="text-xs p-2 bg-zinc-800 text-white border border-zinc-500">
                  <div>
                    <b>Name:</b> {hoverInfo.aiInfo.name}
                  </div>
                  <div>
                    <b>Predicted Latitude:</b> {hoverInfo.aiInfo.predicted_lat}
                  </div>
                  <div>
                    <b>Predicted Longitude:</b>{" "}
                    {hoverInfo.aiInfo.predicted_long}
                  </div>
                  <div>
                    <b>Date/Time:</b> {hoverInfo.aiInfo["date-dd-mm-yyyy"]}{" "}
                    {hoverInfo.aiInfo["time-utc"]}
                  </div>
                  <div>
                    <b>Predicted Class:</b> {hoverInfo.aiInfo.predicted_class}
                  </div>
                  <div>
                    <b>GT Class:</b> {hoverInfo.aiInfo.gt_class}
                  </div>
                  <div>
                    <b>Lat Error:</b> {hoverInfo.aiInfo.lat_error}
                  </div>
                  <div>
                    <b>Long Error:</b> {hoverInfo.aiInfo.long_error}
                  </div>
                  <div>
                    <b>Distance from Closest GT:</b>{" "}
                    {hoverInfo.aiInfo.distance_from_closest_gt}
                  </div>
                </div>
              </Popup>
            )}

            {hoverInfo && !hoverInfo.isAI && hoverInfo.actualInfo && (
              <Popup
                className="no-bg-popup"
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
                style={{ padding: "0px" }}
              >
                <div
                  className="text-xs text-black p-2"
                  style={{
                    backgroundColor:
                      gradeColors[hoverInfo.actualInfo.grade] || "#444",
                  }}
                >
                  <div>
                    <b>Name:</b> {hoverInfo.actualInfo.name}
                  </div>
                  <div>
                    <strong>Latitude:</strong> {hoverInfo.actualInfo.lat}
                  </div>
                  <div>
                    <strong>Longitude:</strong> {hoverInfo.actualInfo.long}
                  </div>
                  <div>
                    <strong>Date/Time:</strong>{" "}
                    {hoverInfo.actualInfo.datetime.toUTCString()}
                  </div>
                  <div>
                    <strong>Pressure (hPa):</strong>{" "}
                    {hoverInfo.actualInfo.estimated_central_pressure_hPa}
                  </div>
                  <div>
                    <strong>Wind (kt):</strong>{" "}
                    {hoverInfo.actualInfo.maximum_sustained_surface_wind_kt}
                  </div>
                  <div>
                    <strong>Grade:</strong> {hoverInfo.actualInfo.grade}
                  </div>
                  <div>
                    <strong>Data type:</strong> {hoverInfo.actualInfo.data_type}
                  </div>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>
      </div>

      <div className="fixed right-3" style={{ top: "11.6rem" }}>
        {/* Legend */}
        <Legend legendItems={legendItems} />
      </div>
      <div
        className="fixed left-4 flex flex-col"
        style={{ top: "11.6rem", width: "276px" }}
      >
        <div className="flex flex-col items-center rounded-xl bg-zinc-800/80 backdrop-blur-sm p-4">
          <Image src={mosdac} alt="" className="px-3" />{" "}
          <div className="flex">
            <a
              href="https://www.isro.gov.in/"
              target="_blank"
              className="text-xs font-semibold text-zinc-400 mt-2 no-underline"
            >
              Funded by ISRO
            </a>
            <p className="text-xs font-semibold text-zinc-400 mt-2">
              &thinsp; | &thinsp;
            </p>
            <a
              href="https://www.mosdac.gov.in/"
              target="_blank"
              className="text-xs font-semibold text-zinc-400 mt-2 no-underline"
            >
              Supported by MOSDAC
            </a>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-4 left-4 rounded-xl bg-zinc-800/80 backdrop-blur-sm p-4 z-[9]"
        style={{ width: "276px" }}
      >
        <div className="mb-4">
          <h2 className="text-white ">Compare Cyclones</h2>
        </div>
        <input
          type="text"
          placeholder="Search by name/year"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-3 text-xs bg-transparent text-white border border-zinc-500 rounded-lg w-full"
        />
        <div className="flex-1 overflow-auto" style={{ height: "28vh" }}>
          {filteredCyclones
            .sort((a, b) => b.year - a.year)
            .map((c) => (
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

      <div
        className="fixed bottom-4 mb-2 z-[9] w-full flex items-center justify-center align-middle text-white text-xs"
        style={{
          opacity: displayMode === "showYear" || isComparing ? 0.3 : 1,
          pointerEvents:
            displayMode === "showYear" || isComparing ? "none" : "auto",
        }}
      >
        <div className="fixed bottom-4 mb-2 z-[9] w-full flex items-center justify-center align-middle text-white text-xs">
          <div className="bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl flex">
            {/* Playback button */}
            <button onClick={handleSingleButtonClick} className="mr-6">
              <Image
                src={buttonIcon}
                alt="Play/Pause/Reset"
                width={25}
                height={25}
              />
            </button>

            {/* Slider */}
            {sortedYearData.length > 0 && currentTime && (
              <div className="flex items-center">
                <span className="w-[240px] pl-3">
                  {currentTime.toUTCString()}
                </span>
                <input
                  type="range"
                  min={0}
                  max={sortedYearData.length - 1}
                  step={1}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-[20vw]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Cyclones (Right Sidebar) */}
      <div
        className="z-[9] fixed right-4 bottom-4 bg-zinc-800/80 backdrop-blur-sm p-4 rounded-xl text-zinc-300"
        style={{ width: "18rem" }}
      >
        <h3 className="font-semibold text-zinc-200  mb-4">
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
