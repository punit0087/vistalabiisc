"use client";
import {
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
  MapContainerProps,
} from "react-leaflet";
import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer to avoid server-side rendering issues
const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
) as React.ComponentType<MapContainerProps>;

type CycloneDataPoint = {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  grade: string;
  windSpeed: number;
  cycloneId: number;
  pressure: number;
  basin: string;
  shape: string;
  name: string;
};

// Define grade colors for cyclone categories
const gradeColors: Record<string, string> = {
  D: "#78c6a3", // Depression
  DD: "#61a2de", // Deep Depression
  CS: "#f39c12", // Cyclonic Storm
  SCS: "#d35400", // Severe Cyclonic Storm
  VSCS: "#e74c3c", // Very Severe Cyclonic Storm
  ESCS: "#c0392b", // Extremely Severe Cyclonic Storm
  SuCS: "#8e44ad", // Super Cyclonic Storm
};

const Cyclones: React.FC = () => {
  const [cycloneData, setCycloneData] = useState<CycloneDataPoint[]>([]);
  const [year, setYear] = useState<number>(2000);
  const [zoom, setZoom] = useState<number>(4);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationTimestamp, setAnimationTimestamp] =
    useState<string>("00/00/0000");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const animationRef = useRef<any>(null);

  useEffect(() => {
    fetch("/data/cyclonic_events.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((row: any) => {
          const latitude = parseFloat(row["latitude-lat"]);
          const longitude = parseFloat(row["longitude-long"]);
          const windSpeed =
            parseFloat(row["maximumsustainedsurfacewind-kt"]) * 1.852; // Convert knots to km/h
          const pressure =
            parseInt(row["estimatedcentralpressurehpaorecp"]) || 0;
          const cycloneId = parseInt(
            row["serialnumberofsystemduringyear"] ||
              row["serialnumberofsystemduringyear"].split(".")[0]
          );

          return {
            date: row["date-dd-mm-yyyy"],
            time: row["time-utc"],
            latitude: !isNaN(latitude) ? latitude : null,
            longitude: !isNaN(longitude) ? longitude : null,
            grade: row["grade-text"],
            windSpeed: !isNaN(windSpeed) ? windSpeed : 0,
            cycloneId: cycloneId,
            pressure: pressure,
            basin: row["basinoforigin"],
            shape: row["cinoorornot"],
            name: row["name"] || "Unknown",
          };
        });

        const validData: CycloneDataPoint[] = transformedData.filter(
          (point: CycloneDataPoint) =>
            point.latitude !== null && point.longitude !== null
        );

        setCycloneData(validData);
      })
      .catch((error) => console.error("Error fetching cyclone data:", error));
  }, []);

  const filteredData = useMemo(
    () =>
      cycloneData.filter(
        (point) => new Date(point.date).getFullYear() === year
      ),
    [cycloneData, year]
  );

  const groupedData = useMemo(
    () =>
      filteredData.reduce<Record<number, CycloneDataPoint[]>>((acc, point) => {
        if (!acc[point.cycloneId]) acc[point.cycloneId] = [];
        acc[point.cycloneId].push(point);
        return acc;
      }, {}),
    [filteredData]
  );

  const uniqueTimestamps = useMemo(
    () => [
      ...new Set(filteredData.map((point) => `${point.date} ${point.time}`)),
    ],
    [filteredData]
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timestamp = uniqueTimestamps[parseInt(e.target.value)];
    setAnimationTimestamp(timestamp);
  };

  const currentCycloneData = useMemo(() => {
    return filteredData.filter(
      (point) => `${point.date} ${point.time}` === animationTimestamp
    );
  }, [filteredData, animationTimestamp]);

  const ZoomComponent = ({
    onZoomChange,
  }: {
    onZoomChange: (zoom: number) => void;
  }) => {
    const map = useMap();

    useEffect(() => {
      const handleZoom = () => {
        const zoom = map.getZoom();
        onZoomChange(zoom);
      };

      map.on("zoomend", handleZoom);

      return () => {
        map.off("zoomend", handleZoom);
      };
    }, [map, onZoomChange]);

    return null;
  };

  const center: [number, number] = [14, 70];

  return (
    <div style={{ position: "relative" }}>
      <DynamicMapContainer
        className="mt-[5.5%]"
        center={center}
        zoom={zoom}
        style={{ height: "90vh", width: "100%" }}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          options={{
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          }}
        />
        <ZoomComponent onZoomChange={setZoom} />

        {Object.entries(groupedData).map(([cycloneId, points]) => {
          return (
            <React.Fragment key={cycloneId}>
              {points
                .filter(
                  (point) =>
                    `${point.date} ${point.time}` === animationTimestamp
                )
                .map((point, index) => (
                  <React.Fragment key={index}>
                    <CircleMarker
                      center={[point.latitude, point.longitude]}
                      pathOptions={{
                        color: gradeColors[point.grade] || "#000",
                      }}
                      radius={hoveredPoint === index ? 4 : 2}
                      eventHandlers={{
                        mouseover: () => setHoveredPoint(index),
                        mouseout: () => setHoveredPoint(null),
                      }}
                    >
                      <Tooltip>
                        <div>
                          <strong>Name:</strong> {point.name}
                          <br />
                          <strong>Grade:</strong> {point.grade}
                          <br />
                          <strong>Wind Speed:</strong> {point.windSpeed} km/h
                          <br />
                          <strong>Pressure:</strong> {point.pressure} hPa
                          <br />
                          <strong>Latitude:</strong> {point.latitude}
                          <br />
                          <strong>Longitude:</strong> {point.longitude}
                          <br />
                          <strong>Basin:</strong> {point.basin}
                          <br />
                          <strong>Shape:</strong> {point.shape}
                          <br />
                          <strong>Date:</strong> {point.date}
                          <br />
                          <strong>Time:</strong> {point.time}
                          <br />
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  </React.Fragment>
                ))}
            </React.Fragment>
          );
        })}
      </DynamicMapContainer>

      <div
        className="absolute bottom-4 flex flex-col z-50 w-full items-center"
        style={{ position: "fixed", zIndex: 999999 }}
      >
        <div className="bg-zinc-600/70 rounded-xl backdrop-blur-sm w-[80%] p-5">
          <div className="flex w-full">
            <p className="w-full text-white">Year Slider</p>
            <div className="ml-4 w-[300px] text-sm font-medium text-white">
              {year}
            </div>
            <input
              type="range"
              min="2000"
              max="2022"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-screen scrollbar-custom"
            />
          </div>

          <div className="flex w-full">
            <p className="w-full text-white">Animation Control Slider</p>
            <div className="ml-4 w-[300px] text-sm font-medium text-white">
              {animationTimestamp}
            </div>
            <input
              className="w-screen scrollbar-custom"
              type="range"
              min="0"
              max={uniqueTimestamps.length - 1}
              value={uniqueTimestamps.indexOf(animationTimestamp)}
              onChange={handleSliderChange}
              onMouseDown={() => setIsAnimating(false)}
              onMouseUp={() => setIsAnimating(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cyclones;
