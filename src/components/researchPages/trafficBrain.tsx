"use client"
import { useState, useEffect } from "react";

type SignalState = "red" | "green" | "yellow";

const TrafficSystem = () => {
  const [redDuration, setRedDuration] = useState(9); // Default 90 seconds
  const [greenDuration, setGreenDuration] = useState(3); // Default 30 seconds
  const [currentSignal, setCurrentSignal] = useState<SignalState>("red");
  const [timeLeft, setTimeLeft] = useState(redDuration);
  const [vehiclesPassed, setVehiclesPassed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      if (timeLeft <= 0) {
        if (currentSignal === "red") {
          setCurrentSignal("green");
          setTimeLeft(greenDuration);
        } else if (currentSignal === "green") {
          setCurrentSignal("yellow");
          setTimeLeft(1); // 5 seconds for yellow light
        } else {
          setCurrentSignal("red");
          setTimeLeft(redDuration);
        }
      }
    }, 800); // 1 computer second = 10 human seconds
    return () => clearInterval(timer);
  }, [timeLeft, currentSignal, redDuration, greenDuration]);

  const moveVehicles = () => {
    if (currentSignal === "green") {
      setVehiclesPassed((prev) => prev + Math.floor(Math.random() * 5 + 1)); // Random vehicles pass
    }
  };

  useEffect(() => {
    if (currentSignal === "green") {
      const vehicleTimer = setInterval(() => moveVehicles(), 300); // Every 3 computer seconds
      return () => clearInterval(vehicleTimer);
    }
  }, [currentSignal]);

  return (
    <div className="flex mt-[10%]">
      {/* Left: Traffic Intersection */}
      <div className="relative grid grid-cols-2 gap-4 w-96 h-96">
        {/* Intersection views (4 angles) */}
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="relative border border-gray-400 bg-gray-100 p-2"
          >
            {/* Vertical lanes */}
            <div
              className={`absolute top-0 left-10 w-4 h-24 ${
                currentSignal === "red" ? "bg-red-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 left-10 w-4 h-24 ${
                currentSignal === "green" ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>

            {/* Horizontal lanes */}
            <div
              className={`absolute top-10 left-0 h-4 w-24 ${
                currentSignal === "red" ? "bg-red-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute top-10 right-0 h-4 w-24 ${
                currentSignal === "green" ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Right: User Control & Status */}
      <div className="ml-8">
        <h2 className="text-xl font-bold">Traffic Control System</h2>
        <div className="my-4">
          <label className="block mb-2">Red Signal Duration (in sec):</label>
          <input
            type="number"
            value={redDuration}
            onChange={(e) => setRedDuration(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="my-4">
          <label className="block mb-2">Green Signal Duration (in sec):</label>
          <input
            type="number"
            value={greenDuration}
            onChange={(e) => setGreenDuration(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="my-4">
          <h3 className="text-lg font-bold">Signal Status:</h3>
          <p
            className={`text-xl font-bold ${
              currentSignal === "red"
                ? "text-red-500"
                : currentSignal === "green"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {currentSignal.toUpperCase()}
          </p>
        </div>
        <div className="my-4">
          <h3 className="text-lg font-bold">Vehicles Passed:</h3>
          <p className="text-2xl">{vehiclesPassed}</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficSystem;
