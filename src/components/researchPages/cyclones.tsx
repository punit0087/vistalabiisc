"use client";
import {
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer to avoid server-side rendering issues
const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

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
  const [year, setYear] = useState<number>(2019);
  const [zoom, setZoom] = useState<number>(5);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationIndex, setAnimationIndex] = useState<number>(0); // Index to track current position in animation
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // To track whether the animation is running

  const animationRef = useRef<any>(null);

  useEffect(() => {
    fetch("/data/cyclonic_events.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.slice(1).map((row: any) => {
          const latitude = parseFloat(row.field6);
          const longitude = parseFloat(row.field7);
          const windSpeed = parseFloat(row.field10) * 1.852; // Convert knots to km/h

          return {
            date: row.field4,
            time: row.field5,
            latitude: !isNaN(latitude) ? latitude : null,
            longitude: !isNaN(longitude) ? longitude : null,
            grade: row.field12,
            windSpeed: !isNaN(windSpeed) ? windSpeed : 0,
            cycloneId: parseInt(row.field1 || row.field13.split(".")[0]),
            pressure: parseInt(row.field9) || 0,
            basin: row.field2,
            shape: row.field8,
            name: row.field3,
          };
        });

        const validData = transformedData.filter(
          (point) => point.latitude !== null && point.longitude !== null
        );

        setCycloneData(validData);
      })
      .catch((error) => console.error("Error fetching cyclone data:", error));
  }, []);

  // Filter and group data for the selected year
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

  // Animation Logic with manual control
  useEffect(() => {
    // Only start the animation if it's not being controlled manually
    if (isAnimating) {
      const maxIndex = Math.max(
        ...Object.values(groupedData).map((points) => points.length)
      );

      // Animation step interval (for updating position)
      const interval = setInterval(() => {
        setAnimationIndex((prevIndex) => (prevIndex + 1) % maxIndex);
      }, 1000); // Update every second

      animationRef.current = interval;

      return () => {
        clearInterval(animationRef.current);
      };
    }
  }, [isAnimating, groupedData]);

  // Zoom hook inside MapContainer
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

      // Cleanup function
      return () => {
        map.off("zoomend", handleZoom);
      };
    }, [map, onZoomChange]);

    return null;
  };

  return (
    <div style={{ position: "relative" }}>
      <DynamicMapContainer
        className="mt-[5.5%]"
        center={[14, 70]}
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
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <ZoomComponent onZoomChange={setZoom} />
        {Object.values(groupedData).map((points, index) => {
          const currentPoints = points.slice(0, animationIndex); // Slice points based on animation index
          return (
            <Polyline
              key={index}
              positions={currentPoints.map((point) => [
                point.latitude,
                point.longitude,
              ])}
              color={gradeColors[points[0].grade] || "#000"}
              weight={1} // Thinner line
            >
              {currentPoints.map((point, idx) => (
                <CircleMarker
                  key={idx}
                  center={[point.latitude, point.longitude]}
                  color={gradeColors[point.grade] || "#000"}
                  radius={hoveredPoint === idx ? 4 : 2} // Scale dot on hover
                  eventHandlers={{
                    mouseover: () => setHoveredPoint(idx),
                    mouseout: () => setHoveredPoint(null),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div>
                      <strong>Date:</strong> {point.date} <br />
                      <strong>Time:</strong> {point.time} <br />
                      <strong>Grade:</strong> {point.grade} <br />
                      <strong>Wind Speed:</strong> {point.windSpeed.toFixed(2)}{" "}
                      km/h <br />
                      <strong>Pressure:</strong> {point.pressure} hPa <br />
                      <strong>Basin:</strong> {point.basin} <br />
                      <strong>Name:</strong> {point.name} <br />
                      <strong>Cyclone ID:</strong> {point.cycloneId}
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
            </Polyline>
          );
        })}
      </DynamicMapContainer>

      <div
        className="absolute bottom-4 flex flex-col z-50 w-full px-32 items-center"
        style={{ position: "fixed", zIndex: 999999 }}
      >
        <div className="bg-zinc-600/70 rounded-xl backdrop-blur-sm w-[80%] p-5">
          {/* Year Slider */}
          <div className="flex w-full">
            <p className="w-full text-white">Year Slider</p>
            <input
              type="range"
              min="1982"
              max="2024"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-screen"
            />
            <div className="ml-4 text-sm font-medium text-white">{year}</div>
          </div>

          {/* Animation Control Slider */}
          <div className="flex w-full">
            <p className="w-full text-white">Animation Control Slider</p>
            <input
              className="w-screen"
              type="range"
              min="0"
              max="100"
              value={animationIndex}
              onChange={(e) => setAnimationIndex(parseInt(e.target.value))}
              onMouseDown={() => setIsAnimating(false)} // Stop animation while interacting
              onMouseUp={() => setIsAnimating(true)} // Restart animation after interaction
            />
            <div className="ml-4 text-sm font-medium text-white">
              {animationIndex}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cyclones;
