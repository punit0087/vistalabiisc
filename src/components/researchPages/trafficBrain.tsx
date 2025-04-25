"use client";
import React from "react";
import Image from "next/image";

//
// ──────────────────────────────────────────────────────────────────────────
//  CONSTANTS, TYPES,  INITIAL‑SETUP (UNCHANGED)
// ──────────────────────────────────────────────────────────────────────────
//

const BACKGROUND_SRC = "/images/intersection.svg";
const RED_SIGNAL_SRC = "/images/signals/red.svg";
const YELLOW_SIGNAL_SRC = "/images/signals/yellow.svg";
const GREEN_SIGNAL_SRC = "/images/signals/green.svg";
const Drag = "/images/draggable.svg";
const signal = "/images/signals/signals.svg";
const signaln = "/images/signals/signals_n.svg";

const resetIcon = "/images/reset.svg";
const playIcon = "/images/play.svg";
const pauseIcon = "/images/pause.svg";

type VehicleClass = "car" | "bus" | "truck" | "bike";
type Direction = "right" | "down" | "left" | "up";
type ModeType = "default" | "manual" | "ai";

interface TrafficSignal {
  red: number;
  yellow: number;
  green: number;
}

interface Vehicle {
  lane: number;
  vehicleClass: VehicleClass;
  speed: number;
  directionNumber: number;
  direction: Direction;
  x: number;
  y: number;
  crossed: number;
  willTurn: number;
  turned: number;
  rotateAngle: number;
  index: number;
  crossedIndex: number;
  stop: number;
  width: number;
  height: number;
  color: string;
}

// --- vehicle specs, coords, helpers … UNCHANGED ----------------------------------

const vehicleSpecs: Record<
  VehicleClass,
  { speed: number; width: number; height: number; color: string }
> = {
  car: { speed: 200, width: 10, height: 10, color: "#ff00b4" },
  bus: { speed: 200, width: 10, height: 10, color: "#00ffbc" },
  truck: { speed: 200, width: 10, height: 10, color: "#8ea5ff" },
  bike: { speed: 200, width: 10, height: 10, color: "#c493ff" },
};

const directionNumbers: Record<number, Direction> = {
  0: "right",
  1: "down",
  2: "left",
  3: "up",
};

const vehicleTypes: Record<number, VehicleClass> = {
  0: "car",
  1: "bus",
  2: "truck",
  3: "bike",
};

// starting coords, stop‑lines … UNCHANGED
const xCoords: Record<Direction, number[]> = {
  right: [0, 0, 0],
  down: [755, 713, 690],
  left: [1366, 1366, 1366],
  up: [660, 643, 665],
};
const yCoords: Record<Direction, number[]> = {
  right: [300, 300, 322],
  down: [0, 0, 0],
  left: [300, 346, 368],
  up: [768, 768, 768],
};
const stopLines: Record<Direction, number> = {
  right: 560,
  down: 220,
  left: 802,
  up: 460,
};
const defaultStop: Record<Direction, number> = {
  right: 555,
  down: 210,
  left: 812,
  up: 470,
};

function StopLineVisual({
  direction,
  position,
  color = "red",
  type = "stop", // "stop" or "default"
}: {
  direction: Direction;
  position: number;
  color?: string;
  type?: "stop" | "default";
}) {
  const thickness = 2;
  const lineStyle = {
    position: "absolute" as const,
    backgroundColor: color,
    opacity: type === "default" ? 0.5 : 1,
    zIndex: 5,
  };

  switch (direction) {
    case "right":
    case "left":
      return (
        <div
          style={{
            ...lineStyle,
            top: 0,
            bottom: 0,
            left: position,
            width: thickness,
          }}
        />
      );
    case "up":
    case "down":
      return (
        <div
          style={{
            ...lineStyle,
            left: 0,
            right: 0,
            top: position,
            height: thickness,
          }}
        />
      );
    default:
      return null;
  }
}

function isInViewport(v: Vehicle) {
  const canvasWidth = 1366;
  const canvasHeight = 768;
  const xRight = v.x + v.width;
  const yBottom = v.y + v.height;
  return (
    xRight >= 0 && v.x <= canvasWidth && yBottom >= 0 && v.y <= canvasHeight
  );
}

// Logs for each cycle
const cycleLogs: {
  cycleNumber: number;
  westOrigin: number;
  northOrigin: number;
  eastOrigin: number;
  southOrigin: number;
  totalPassed: number;
}[] = [];

// --- data‑structures for vehicles, turns, etc.  (UNCHANGED) ----------------------

const vehiclesObj: Record<
  Direction,
  { 0: Vehicle[]; 1: Vehicle[]; 2: Vehicle[]; crossed: number }
> = {
  right: { 0: [], 1: [], 2: [], crossed: 0 },
  down: { 0: [], 1: [], 2: [], crossed: 0 },
  left: { 0: [], 1: [], 2: [], crossed: 0 },
  up: { 0: [], 1: [], 2: [], crossed: 0 },
};

const vehiclesTurned: Record<Direction, { 1: Vehicle[]; 2: Vehicle[] }> = {
  right: { 1: [], 2: [] },
  down: { 1: [], 2: [] },
  left: { 1: [], 2: [] },
  up: { 1: [], 2: [] },
};
const vehiclesNotTurned: Record<Direction, { 1: Vehicle[]; 2: Vehicle[] }> = {
  right: { 1: [], 2: [] },
  down: { 1: [], 2: [] },
  left: { 1: [], 2: [] },
  up: { 1: [], 2: [] },
};

//
// ──────────────────────────────────────────────────────────────────────────
//  SIGNAL‑CYCLE STATE  (UNCHANGED LOGIC)
// ──────────────────────────────────────────────────────────────────────────
//

// start West (2) green
let cycleIndex = 0;
let currentGreen = 2;
let currentYellow = 0;
let nextGreen = 3;

const TOTAL_VEHICLES = 1440;
let spawnedCount = 0;
let remainingToSpawn = TOTAL_VEHICLES;

const directionOriginCounts = { right: 0, down: 0, left: 0, up: 0 };

let cycleCount = 0;
let cycleStartTime = 0;
let previousTotalPassed = 0;

const signals: TrafficSignal[] = [
  { red: 24, green: 10, yellow: 2 }, // East
  { red: 36, green: 10, yellow: 2 }, // South
  { red: 0, green: 10, yellow: 2 }, // West (initially green)
  { red: 12, green: 10, yellow: 2 }, // North
];

const signalCoords: [number, number][] = [
  [516, 180],
  [742, 162],
  [759, 390],
  [529, 408],
];

const stoppingGap = 5;
const movingGap = 7;
const rotationAngle = 650;
const signalSequence = [2, 3, 0, 1]; // W → N → E → S

//
// ──────────────────────────────────────────────────────────────────────────
//  UTILS TO RESET SIGNALS FOR DEFAULT MODE
// ──────────────────────────────────────────────────────────────────────────
//
function setDefaultCycleTimes() {
  signals[0] = { red: 24, green: 10, yellow: 2 };
  signals[1] = { red: 36, green: 10, yellow: 2 };
  signals[2] = { red: 0, green: 10, yellow: 2 };
  signals[3] = { red: 12, green: 10, yellow: 2 };

  cycleIndex = 0;
  currentGreen = 2;
  currentYellow = 0;
  nextGreen = 3;
}

//
// ------- SIGNAL & CYCLE FUNCTIONS -------
//

function finishCurrentDirection(simTime: number) {
  // Reset the current green
  signals[currentGreen].green = 10;
  signals[currentGreen].yellow = 2;
  signals[currentGreen].red = 36;

  // Exactly like your Python code does:
  // "When the current green finishes, reset .stop = defaultStop"
  // for all vehicles in that direction (so next cycle doesn't push them further).
  const dirStr = directionNumbers[currentGreen];
  for (let lane = 0; lane < 3; lane++) {
    const arr = vehiclesObj[dirStr][lane as 0 | 1 | 2];
    for (let i = 0; i < arr.length; i++) {
      arr[i].stop = defaultStop[dirStr];
    }
  }

  // Move to next direction
  cycleIndex = (cycleIndex + 1) % 4;
  currentGreen = signalSequence[cycleIndex];
  currentYellow = 0;
  nextGreen = signalSequence[(cycleIndex + 1) % 4];
  signals[currentGreen].red = 0;

  // If we cycle back to West=2 => new cycle
  if (currentGreen === 2) {
    cycleCount++;
    const westOrigin = directionOriginCounts.left;
    const northOrigin = directionOriginCounts.up;
    const eastOrigin = directionOriginCounts.right;
    const southOrigin = directionOriginCounts.down;

    const totalPassedNow =
      vehiclesObj.right.crossed +
      vehiclesObj.down.crossed +
      vehiclesObj.left.crossed +
      vehiclesObj.up.crossed;
    const passedThisCycle = totalPassedNow - previousTotalPassed;
    previousTotalPassed = totalPassedNow;

    cycleLogs.push({
      cycleNumber: cycleCount,
      westOrigin,
      northOrigin,
      eastOrigin,
      southOrigin,
      totalPassed: passedThisCycle,
    });

    cycleStartTime = simTime;
  }
}

function updateSignalTimers(simTime: number) {
  const sg = signals[currentGreen];
  // Decrement green, then go to yellow
  if (currentYellow === 0) {
    sg.green -= 1;
    if (sg.green <= 0) {
      currentYellow = 1;
    }
  } else {
    sg.yellow -= 1;
    if (sg.yellow <= 0) {
      finishCurrentDirection(simTime);
    }
  }
  // Decrement red for all others
  for (let i = 0; i < 4; i++) {
    if (i !== currentGreen && signals[i].red > 0) {
      signals[i].red -= 1;
    }
  }
}

//
// ------- VEHICLE SPAWNING -------
//

// 6 vehicles/second => East(0)x2, West(2)x2, North(3)x1, South(1)x1
function spawnVehiclesPerSecond() {
  if (remainingToSpawn <= 0) return;
  const needed = Math.min(6, remainingToSpawn);

  const directions = [0, 0, 2, 2, 3, 1];
  for (let i = 0; i < needed; i++) {
    const v = spawnVehicleForDirection(directions[i]);
    if (v) {
      spawnedCount++;
      remainingToSpawn--;
    }
  }
}

// We replicate Python logic: 40% chance to turn if lane=1 or lane=2
function spawnVehicleForDirection(directionIdx: number) {
  const vtIdx = Math.floor(Math.random() * 4);
  const lane = Math.random() < 0.5 ? 1 : 2;
  let willTurn = 0;
  if (lane === 1 && Math.random() < 0.4) {
    willTurn = 1;
  } else if (lane === 2 && Math.random() < 0.4) {
    willTurn = 1;
  }
  return createVehicle(lane, vtIdx, directionIdx, willTurn);
}

//
// ------- CREATE VEHICLE (Queue if last isn't crossed, else defaultStop) & SHIFT x/y
//

function createVehicle(
  lane: number,
  vehicleTypeIdx: number,
  directionIdx: number,
  willTurn: number
): Vehicle | null {
  const dir = directionNumbers[directionIdx];
  const vClass = vehicleTypes[vehicleTypeIdx];
  const spec = vehicleSpecs[vClass];

  const arr = vehiclesObj[dir][lane as 0 | 1 | 2];

  // 1) Build new Vehicle
  const newV: Vehicle = {
    lane,
    vehicleClass: vClass,
    speed: spec.speed,
    directionNumber: directionIdx,
    direction: dir,
    // start coords from xCoords,yCoords so we don't stack
    x: xCoords[dir][lane],
    y: yCoords[dir][lane],
    crossed: 0,
    willTurn,
    turned: 0,
    rotateAngle: 0,
    index: arr.length,
    crossedIndex: 0,
    stop: defaultStop[dir],
    width: spec.width,
    height: spec.height,
    color: spec.color,
  };

  // 2) If last vehicle in the lane hasn't crossed => queue behind it
  if (arr.length > 0) {
    const prev = arr[arr.length - 1];
    if (prev.crossed === 0) {
      // queue behind it
      switch (dir) {
        case "right":
          newV.stop = prev.stop - (prev.width + stoppingGap);
          break;
        case "left":
          newV.stop = prev.stop + (prev.width + stoppingGap);
          break;
        case "down":
          newV.stop = prev.stop - (prev.height + stoppingGap);
          break;
        case "up":
          newV.stop = prev.stop + (prev.height + stoppingGap);
          break;
      }
    } else {
      // else revert to defaultStop
      newV.stop = defaultStop[dir];
    }
  } else {
    // no vehicles => defaultStop
    newV.stop = defaultStop[dir];
  }

  console.log(
    "Spawned a new",
    dir,
    "vehicle in lane",
    lane,
    "with stop=",
    newV.stop,
    " startXY=(",
    newV.x,
    ",",
    newV.y,
    ")"
  );

  // 3) Insert in lane array
  arr.push(newV);

  // 4) SHIFT xCoord or yCoord, so the next new spawn is physically behind it
  //    so we never see them stack at the spawn point.
  //    This is exactly what your Python code does near the end of Vehicle.__init__.
  if (dir === "right") {
    // shift xCoord to the left by (width + stoppingGap) so next spawn is behind
    xCoords[dir][lane] -= spec.width + stoppingGap;
  } else if (dir === "left") {
    xCoords[dir][lane] += spec.width + stoppingGap;
  } else if (dir === "down") {
    yCoords[dir][lane] -= spec.height + stoppingGap;
  } else if (dir === "up") {
    yCoords[dir][lane] += spec.height + stoppingGap;
  }

  // 5) Update origin counts
  if (dir === "right") directionOriginCounts.right++;
  else if (dir === "down") directionOriginCounts.down++;
  else if (dir === "left") directionOriginCounts.left++;
  else if (dir === "up") directionOriginCounts.up++;

  return newV;
}

//
// ------- MOVEMENT -------
//

function markCrossed(v: Vehicle) {
  v.crossed = 1;
  vehiclesObj[v.direction].crossed += 1;
}

function moveAllVehicles(dtSec: number) {
  for (const dirKey in vehiclesObj) {
    for (let lane = 0; lane < 3; lane++) {
      const arr = vehiclesObj[dirKey as Direction][lane as 0 | 1 | 2];
      for (let i = 0; i < arr.length; i++) {
        moveVehicle(arr[i], dtSec);
      }
    }
  }
}

function moveVehicle(v: Vehicle, dtSec: number) {
  const dir = v.direction;
  const isMyLight = v.directionNumber === currentGreen;

  // Before moving, enforce gap with vehicle ahead
  const laneArr = vehiclesObj[dir][v.lane as 0 | 1 | 2];
  if (v.index > 0) {
    const prev = laneArr[v.index - 1];
    if (prev.crossed === 0 && !prev.turned) {
      // Check distance based on direction
      const gap = movingGap;
      let tooClose = false;
      switch (dir) {
        case "right":
          tooClose = v.x + v.width > prev.x - gap;
          break;
        case "left":
          tooClose = v.x < prev.x + prev.width + gap;
          break;
        case "down":
          tooClose = v.y + v.height > prev.y - gap;
          break;
        case "up":
          tooClose = v.y < prev.y + prev.height + gap;
          break;
      }
      if (tooClose) return; // don't move
    }
  }

  if (!v.crossed) {
    let atVehicleStop = false;
    switch (dir) {
      case "right":
        atVehicleStop = v.x + v.width >= v.stop;
        break;
      case "left":
        atVehicleStop = v.x <= v.stop;
        break;
      case "down":
        atVehicleStop = v.y + v.height >= v.stop;
        break;
      case "up":
        atVehicleStop = v.y <= v.stop;
        break;
    }
    if (atVehicleStop && !isMyLight) {
      // freeze at the stop
      switch (dir) {
        case "right":
          v.x = v.stop - v.width;
          break;
        case "left":
          v.x = v.stop;
          break;
        case "down":
          v.y = v.stop - v.height;
          break;
        case "up":
          v.y = v.stop;
          break;
      }
      return;
    }
  }

  // Movement logic
  if (dir === "right") {
    if (!v.crossed && v.x + v.width > stopLines[dir]) {
      markCrossed(v);
      if (v.willTurn === 0) {
        vehiclesNotTurned[dir][v.lane as 1 | 2].push(v);
        v.crossedIndex = vehiclesNotTurned[dir][v.lane as 1 | 2].length - 1;
      }
    }
    if (v.willTurn === 1 && v.lane === 1) {
      if (!v.crossed || v.x + v.width < stopLines[dir] + 40) {
        v.x += v.speed * dtSec;
      } else {
        // Arc
        if (!v.turned) {
          const turnFactor = v.speed;
          v.rotateAngle += rotationAngle * dtSec;
          v.x += 2.4 * turnFactor * dtSec;
          v.y -= 2.8 * turnFactor * dtSec;
          if (v.rotateAngle >= 90) {
            v.turned = 1;
            v.rotateAngle = 90;
            vehiclesTurned[dir][v.lane].push(v);
            v.crossedIndex = vehiclesTurned[dir][v.lane].length - 1;
          }
        } else {
          // traveling up
          const arr = vehiclesTurned[dir][v.lane];
          const gap = movingGap;
          if (
            v.crossedIndex === 0 ||
            v.y >
              arr[v.crossedIndex - 1].y + arr[v.crossedIndex - 1].height + gap
          ) {
            v.y -= v.speed * dtSec;
          }
        }
      }
    } else if (v.willTurn === 1 && v.lane === 2) {
      if (!v.crossed) {
        v.x += v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.x + v.width < arr[v.crossedIndex - 1].x - gap
        ) {
          v.x += v.speed * dtSec;
        }
      }
    } else {
      if (!v.crossed) {
        v.x += v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane as 1 | 2];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.x + v.width < arr[v.crossedIndex - 1].x - gap
        ) {
          v.x += v.speed * dtSec;
        }
      }
    }
  } else if (dir === "down") {
    if (!v.crossed && v.y + v.height > stopLines[dir]) {
      markCrossed(v);
      if (v.willTurn === 0) {
        vehiclesNotTurned[dir][v.lane as 1 | 2].push(v);
        v.crossedIndex = vehiclesNotTurned[dir][v.lane as 1 | 2].length - 1;
      }
    }
    if (v.willTurn === 1 && v.lane === 1) {
      if (!v.crossed || v.y + v.height < stopLines[dir] + 50) {
        v.y += v.speed * dtSec;
      } else {
        if (!v.turned) {
          const turnFactor = v.speed;
          v.rotateAngle += rotationAngle * dtSec;
          v.x += 1.2 * turnFactor * dtSec;
          v.y += 1.8 * turnFactor * dtSec;
          if (v.rotateAngle >= 90) {
            v.turned = 1;
            v.rotateAngle = 90;
            vehiclesTurned[dir][v.lane].push(v);
            v.crossedIndex = vehiclesTurned[dir][v.lane].length - 1;
          }
        } else {
          const arr = vehiclesTurned[dir][v.lane];
          const gap = movingGap;
          if (
            v.crossedIndex === 0 ||
            v.x + v.width < arr[v.crossedIndex - 1].x - gap
          ) {
            v.x += v.speed * dtSec;
          }
        }
      }
    } else if (v.willTurn === 1 && v.lane === 2) {
      if (!v.crossed) {
        v.y += v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.y + v.height < arr[v.crossedIndex - 1].y - gap
        ) {
          v.y += v.speed * dtSec;
        }
      }
    } else {
      if (!v.crossed) {
        v.y += v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane as 1 | 2];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.y + v.height < arr[v.crossedIndex - 1].y - gap
        ) {
          v.y += v.speed * dtSec;
        }
      }
    }
  } else if (dir === "left") {
    if (!v.crossed && v.x < stopLines[dir]) {
      markCrossed(v);
      if (v.willTurn === 0) {
        vehiclesNotTurned[dir][v.lane as 1 | 2].push(v);
        v.crossedIndex = vehiclesNotTurned[dir][v.lane as 1 | 2].length - 1;
      }
    }
    if (v.willTurn === 1 && v.lane === 1) {
      if (!v.crossed || v.x > stopLines[dir] - 70) {
        v.x -= v.speed * dtSec;
      } else {
        if (!v.turned) {
          const turnFactor = v.speed;
          v.rotateAngle += rotationAngle * dtSec;
          v.x -= 1 * turnFactor * dtSec;
          v.y += 1.2 * turnFactor * dtSec;
          if (v.rotateAngle >= 90) {
            v.turned = 1;
            v.rotateAngle = 90;
            vehiclesTurned[dir][v.lane].push(v);
            v.crossedIndex = vehiclesTurned[dir][v.lane].length - 1;
          }
        } else {
          const arr = vehiclesTurned[dir][v.lane];
          const gap = movingGap;
          if (
            v.crossedIndex === 0 ||
            v.y + v.height < arr[v.crossedIndex - 1].y - gap
          ) {
            v.y += v.speed * dtSec;
          }
        }
      }
    } else if (v.willTurn === 1 && v.lane === 2) {
      if (!v.crossed) {
        v.x -= v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.x > arr[v.crossedIndex - 1].x + arr[v.crossedIndex - 1].width + gap
        ) {
          v.x -= v.speed * dtSec;
        }
      }
    } else {
      if (!v.crossed) {
        v.x -= v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane as 1 | 2];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.x > arr[v.crossedIndex - 1].x + arr[v.crossedIndex - 1].width + gap
        ) {
          v.x -= v.speed * dtSec;
        }
      }
    }
  } else if (dir === "up") {
    if (!v.crossed && v.y < stopLines[dir]) {
      markCrossed(v);
      if (!v.willTurn) {
        vehiclesNotTurned[dir][v.lane as 1 | 2].push(v);
        v.crossedIndex = vehiclesNotTurned[dir][v.lane as 1 | 2].length - 1;
      }
    }
    if (v.willTurn === 1 && v.lane === 1) {
      if (!v.crossed || v.y > stopLines[dir] - 60) {
        v.y -= v.speed * dtSec;
      } else {
        if (!v.turned) {
          const turnFactor = v.speed;
          v.rotateAngle += rotationAngle * dtSec;
          v.x -= 1.2 * turnFactor * dtSec;
          v.y -= 1.5 * turnFactor * dtSec;
          if (v.rotateAngle >= 90) {
            v.turned = 1;
            v.rotateAngle = 90;
            vehiclesTurned[dir][v.lane].push(v);
            v.crossedIndex = vehiclesTurned[dir][v.lane].length - 1;
          }
        } else {
          const arr = vehiclesTurned[dir][v.lane];
          const gap = movingGap;
          if (
            v.crossedIndex === 0 ||
            v.x >
              arr[v.crossedIndex - 1].x + arr[v.crossedIndex - 1].width + gap
          ) {
            v.x -= v.speed * dtSec;
          }
        }
      }
    } else if (v.willTurn === 1 && v.lane === 2) {
      if (!v.crossed) {
        v.y -= v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.y > arr[v.crossedIndex - 1].y + arr[v.crossedIndex - 1].height + gap
        ) {
          v.y -= v.speed * dtSec;
        }
      }
    } else {
      if (!v.crossed) {
        v.y -= v.speed * dtSec;
      } else {
        const arr = vehiclesNotTurned[dir][v.lane as 1 | 2];
        const gap = movingGap;
        if (
          v.crossedIndex === 0 ||
          v.y > arr[v.crossedIndex - 1].y + arr[v.crossedIndex - 1].height + gap
        ) {
          v.y -= v.speed * dtSec;
        }
      }
    }
  }
}

function ModeToggle({
  mode,
  setMode,
}: {
  mode: ModeType;
  setMode: (m: ModeType) => void;
}) {
  return (
    <div className="relative w-[350px] h-10 border border-zinc-600 rounded-full flex items-center">
      <div
        className="absolute w-[107px] h-8 bg-zinc-600 rounded-full transition-all"
        style={{
          left:
            mode === "default"
              ? "4px"
              : mode === "manual"
              ? "calc(50% - 54px)"
              : "calc(100% - 110px)",
        }}
      />
      <button
        className="relative w-1/3 text-zinc-200"
        onClick={() => setMode("default")}
      >
        Default
      </button>
      <button
        className="relative w-1/3 text-zinc-200"
        onClick={() => setMode("manual")}
      >
        Manual
      </button>
      <button
        className="relative w-1/3 text-zinc-200"
        onClick={() => setMode("ai")}
      >
        AI
      </button>
    </div>
  );
}

//
// ------- LOGS WINDOW -------
//

function LogsWindow() {
  const [pos, setPos] = React.useState({ x: 30, y: 450 });
  const [dragging, setDragging] = React.useState(false);
  const [rel, setRel] = React.useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setRel({ x: e.pageX - pos.x, y: e.pageY - pos.y });
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPos({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    e.stopPropagation();
    e.preventDefault();
  };

  const display = cycleLogs.map((c) => (
    <div key={c.cycleNumber} style={{ marginBottom: 8 }}>
      <strong>Cycle {c.cycleNumber}</strong>
      <div>West origin: {c.westOrigin}</div>
      <div>North origin: {c.northOrigin}</div>
      <div>East origin: {c.eastOrigin}</div>
      <div>South origin: {c.southOrigin}</div>
      <div>Vehicle Passed: {c.totalPassed}</div>
    </div>
  ));

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: 250,
        backgroundColor: "#25252B",
        border: "1px solid #aaa",
        zIndex: 9999,
        borderRadius: "10px",
        cursor: dragging ? "move" : "default",
      }}
      className="text-sm"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#414149",
          color: "#d4d4d8",
          padding: "6px",
          fontWeight: "bold",
          cursor: "move",
          userSelect: "none",
          borderRadius: "10px",
        }}
        onMouseDown={onMouseDown}
      >
        Logs&nbsp;
        <Image src={Drag} alt="" width={15} height={10} className="inline" />
      </div>
      <div
        style={{
          padding: 8,
          overflowY: "auto",
          maxHeight: 200,
          color: "#a1a1aa",
        }}
      >
        {display}
      </div>
    </div>
  );
}

function getActiveVehicleCount() {
  const setOfVehicles = new Set<Vehicle>();

  (["right", "down", "left", "up"] as Direction[]).forEach((dir) => {
    for (let lane = 0; lane < 3; lane++) {
      vehiclesObj[dir][lane as 0 | 1 | 2].forEach((v) => setOfVehicles.add(v));
    }
  });
  (["right", "down", "left", "up"] as Direction[]).forEach((dir) => {
    [1, 2].forEach((lane) => {
      vehiclesTurned[dir][lane as 1 | 2].forEach((v) => setOfVehicles.add(v));
      vehiclesNotTurned[dir][lane as 1 | 2].forEach((v) =>
        setOfVehicles.add(v)
      );
    });
  });

  for (let v of setOfVehicles) {
    if (!isInViewport(v)) {
      setOfVehicles.delete(v);
    }
  }
  return setOfVehicles.size;
}

export default function TrafficSimulation() {
  // ——————————————————— state & refs ————————————————————
  const [hasStarted, setHasStarted] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  const [timeScale, setTimeScale] = React.useState(1);
  const timeScaleRef = React.useRef(1); // keeps sim running on speed‑change
  React.useEffect(() => {
    timeScaleRef.current = timeScale;
  }, [timeScale]);

  const [tempGreen, setTempGreen] = React.useState(10);
  const [tempYellow, setTempYellow] = React.useState(2);
  const [mode, setMode] = React.useState<ModeType>("default");

  const animationFrameRef = React.useRef<number | null>(null);
  const lastFrameRef = React.useRef(0);
  const spawnAccumulatorRef = React.useRef(0);
  const signalAccumulatorRef = React.useRef(0);

  // ——————————————————— AI presets ————————————————————
  const aiPresets = [
    { green: 15, yellow: 4 },
    // { green: 12, yellow: 3 },
    // { green: 15, yellow: 3 },
    // { green: 10, yellow: 4 },
    // { green: 14, yellow: 4 },
  ];

  // ——————————————————— helpers to switch mode ————————————————————
  function handleDefaultMode() {
    setMode("default");
    setTempGreen(10);
    setTempYellow(2);
    setDefaultCycleTimes();
  }

  function handleAI() {
    const preset = aiPresets[Math.floor(Math.random() * aiPresets.length)];
    setMode("ai");
    setTempGreen(preset.green);
    setTempYellow(preset.yellow);

    // apply AI timings to all four directions
    signals[currentGreen].green = preset.green;
    signals[currentGreen].yellow = preset.yellow;
    signals[currentGreen].red = 0;
    for (let i = 1; i <= 3; i++) {
      signals[(currentGreen + i) % 4].green = preset.green;
      signals[(currentGreen + i) % 4].yellow = preset.yellow;
      signals[(currentGreen + i) % 4].red = i * (preset.green + preset.yellow);
    }
  }

  // manual: we only enable UI; actual apply is via “Set” button
  function handleManualToggle() {
    setMode("manual");
  }

  function handleSet() {
    if (mode !== "manual") return; // safety guard

    const g = tempGreen;
    const y = tempYellow;

    /* ---------- update the four approaches ---------- */
    currentYellow = 0; // restart the cycle with fresh green
    signals[currentGreen].green = g;
    signals[currentGreen].yellow = y;
    signals[currentGreen].red = 0;

    for (let i = 1; i <= 3; i++) {
      const idx = (currentGreen + i) % 4;
      signals[idx].green = g;
      signals[idx].yellow = y;
      signals[idx].red = i * (g + y); // 0, 1·(g+y), 2·(g+y), 3·(g+y)
    }

    /* ---------- NEW:  start the sim if it’s idle ---------- */
    if (!running) {
      // (<‑‑ add these three lines)
      startSimulation();
    }
  }

  // ——————————————————— animation‑loop ————————————————————
  React.useEffect(() => () => stopSimulation(), []);

  const FIXED_DT = 0.016; // ~60 FPS fixed timestep (16ms)

  function animateFrame(timestamp: number) {
    if (!lastFrameRef.current) lastFrameRef.current = timestamp;
    let deltaMs = timestamp - lastFrameRef.current;
    lastFrameRef.current = timestamp;

    // Scale deltaMs by current timeScale
    deltaMs *= timeScaleRef.current;

    // Convert deltaMs to seconds
    spawnAccumulatorRef.current += deltaMs / 1000;
    signalAccumulatorRef.current += deltaMs / 1000;

    // Perform fixed-step updates (movement and logic)
    while (deltaMs >= FIXED_DT * 1000) {
      setTimeElapsed((t) => {
        const next = Math.min(t + FIXED_DT, 292);
        if (next >= 292) stopSimulation();
        return next;
      });

      if (timeElapsed >= 292) return;

      // spawn vehicles exactly once per second (accumulator logic)
      if (spawnAccumulatorRef.current >= 1) {
        spawnAccumulatorRef.current -= 1;
        if (spawnedCount < TOTAL_VEHICLES) spawnVehiclesPerSecond();
      }

      // update signal timers exactly once per second
      if (signalAccumulatorRef.current >= 1) {
        signalAccumulatorRef.current -= 1;
        updateSignalTimers(Math.floor(timeElapsed));
      }

      // critical: movement logic always with FIXED_DT
      moveAllVehicles(FIXED_DT);

      deltaMs -= FIXED_DT * 1000;
    }

    animationFrameRef.current = requestAnimationFrame(animateFrame);
  }

  function startSimulation() {
    if (running) return;
    setRunning(true);
    lastFrameRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animateFrame);
  }
  function stopSimulation() {
    setRunning(false);
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  // —— resetAll (UNCHANGED except it calls handleDefaultMode at end) ————
  function resetAll() {
    stopSimulation();
    setTimeElapsed(0);
    cycleLogs.length = 0;
    cycleCount = 0;
    cycleStartTime = 0;
    spawnedCount = 0;
    remainingToSpawn = TOTAL_VEHICLES;
    previousTotalPassed = 0;

    // Clear
    for (let d = 0; d < 4; d++) {
      const dir = directionNumbers[d];
      vehiclesObj[dir][0] = [];
      vehiclesObj[dir][1] = [];
      vehiclesObj[dir][2] = [];
      vehiclesObj[dir].crossed = 0;
    }
    (["right", "down", "left", "up"] as Direction[]).forEach((dir) => {
      vehiclesTurned[dir][1] = [];
      vehiclesTurned[dir][2] = [];
      vehiclesNotTurned[dir][1] = [];
      vehiclesNotTurned[dir][2] = [];
    });
    directionOriginCounts.right = 0;
    directionOriginCounts.down = 0;
    directionOriginCounts.left = 0;
    directionOriginCounts.up = 0;

    // Reset signals
    signals[2] = { red: 0, green: 10, yellow: 2 };
    signals[3] = { red: 12, green: 10, yellow: 2 };
    signals[0] = { red: 24, green: 10, yellow: 2 };
    signals[1] = { red: 36, green: 10, yellow: 2 };

    cycleIndex = 0;
    currentGreen = 2;
    currentYellow = 0;
    nextGreen = 3;
    setMode("default");
    setTempGreen(10);
    setTempYellow(2);

    spawnAccumulatorRef.current = 0;
    signalAccumulatorRef.current = 0;
    lastFrameRef.current = 0;

    // Also reset xCoords,yCoords so new spawn starts fresh
    xCoords.right = [0, 0, 0];
    xCoords.down = [755, 710, 686];
    xCoords.left = [1366, 1366, 1366];
    xCoords.up = [650, 642, 662];

    yCoords.right = [300, 302, 324];
    yCoords.down = [0, 0, 0];
    yCoords.left = [300, 348, 370];
    yCoords.up = [768, 768, 768];
  }

  // red‑values preview for manual mode
  const redPreview = [
    0,
    tempGreen + tempYellow,
    2 * (tempGreen + tempYellow),
    3 * (tempGreen + tempYellow),
  ];

  // helper counts                                             (UNCHANGED)
  const passEast = vehiclesObj.right.crossed;
  const passSouth = vehiclesObj.down.crossed;
  const passWest = vehiclesObj.left.crossed;
  const passNorth = vehiclesObj.up.crossed;
  const totalPassed = passEast + passSouth + passWest + passNorth;
  const onScreenCount = getActiveVehicleCount();

  //
  // ─────────────────────────────────────────────────────────
  //  UI RENDER
  // ─────────────────────────────────────────────────────────
  //

  // ▒▒▒  Splash screen  ▒▒▒
  if (!hasStarted) {
    return (
      <div className="relative w-full h-[90vh] flex items-center justify-center bg-black text-white">
        <div className="w-full h-full bg-black flex flex-col items-center justify-center">
          <h1 className="text-xl mb-1 text-zinc-200">
            Welcome to the <span className="font-semibold">TrafficBrain</span>
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

  // ▒▒▒  Main canvas  ▒▒▒
  return (
    <div
      style={{
        position: "relative",
        width: "1366px",
        height: "768px",
        backgroundColor: "#ccc",
        marginTop: "103px",
        zIndex: 999,
      }}
    >
      {/* ─── TOP TOOLBAR ────────────────────────────────────────── */}
      <div
        className="bg-zinc-800 backdrop-blur-sm text-xs text-zinc-300"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 2rem",
          zIndex: 999,
        }}
      >
        {/* ——— triple‑toggle for mode ——— */}
        <div
          className="flex items-center space-x-2"
          style={{ opacity: running ? 1 : 1 /* always active */ }}
        >
          <div className="relative w-[350px] h-8 border border-zinc-600 rounded-full flex items-center">
            <div
              className="absolute w-[107px] h-6 bg-zinc-600 rounded-full transition-all"
              style={{
                left:
                  mode === "default"
                    ? "4px"
                    : mode === "manual"
                    ? "calc(50% - 54px)"
                    : "calc(100% - 110px)",
              }}
            />
            <button
              className="relative text-zinc-300 w-1/3"
              onClick={() => {
                resetAll();
                handleDefaultMode();
              }}
            >
              Default
            </button>
            <button
              className="relative text-zinc-300 w-1/3"
              onClick={() => {
                resetAll();
                handleManualToggle();
              }}
            >
              Manual
            </button>
            <button
              className="relative text-zinc-300 w-1/3"
              onClick={() => {
                resetAll();
                handleAI();
              }}
            >
              AI
            </button>
          </div>
        </div>

        {/* ——— Play / Pause ——— */}
        <div className="flex items-center gap-4 transition-all duration-300">
          {/* Play/Pause (or “Set” in manual mode) */}
          {running ? (
            <button
              onClick={() => stopSimulation()}
              className="transition-transform hover:scale-105"
            >
              <img
                src={pauseIcon}
                alt={mode === "manual" ? "Set" : "Pause"}
                style={{ width: 18, height: 18 }}
              />
            </button>
          ) : (
            <button
              onClick={() =>
                mode === "manual" ? handleSet() : startSimulation()
              }
              className="transition-transform hover:scale-105"
            >
              <img
                src={playIcon}
                alt={mode === "manual" ? "Set" : "Start"}
                style={{ width: 18, height: 18 }}
              />
            </button>
          )}
        </div>

        {/* ——— speed buttons ——— */}
        <div style={{ width: "16rem" }}>
          <span style={{ marginRight: 6 }}>Speed:</span>
          {[1, 2, 3, 5, 10].map((mult) => (
            <button
              key={mult}
              onClick={() => setTimeScale(mult)}
              style={{
                marginRight: 4,
                backgroundColor: timeScale === mult ? "#3f3f46" : "",
                padding: "6px",
                borderRadius: 4,
                color: timeScale === mult ? "#fff" : "",
              }}
            >
              {mult}x
            </button>
          ))}
        </div>

        {/* ——— reset ——— */}
        <button
          onClick={resetAll}
          className="text-xs font-semibold hover:scale-105 transition-all duration-300 h-6 border border-zinc-600 px-2 rounded-full"
        >
          Reset Simulation
        </button>
      </div>

      {/* ─── MANUAL‑MODE CONTROL CARD (drills into the signal image) ─── */}
      <div
        className="absolute"
        style={{ top: "2.7rem", left: "2rem", zIndex: 9 }}
      >
        <div
          className="flex items-center gap-2"
          style={{ opacity: mode === "manual" ? 1 : 0.8 }}
        >
          <img
            src={signaln}
            alt=""
            style={{ width: "18rem", marginTop: "1rem" }}
          />
          <div
            className="flex flex-col w-[40%] absolute"
            style={{
              marginLeft: "5.75rem",
              top: "3rem",
              left: "1.7rem",
            }}
          >
            <p className="absolute z-10 -mt-6 font-semibold text-xs text-zinc-300 ml-5">
              (in seconds)
            </p>
            <div
              className="absolute w-full h-10 rounded text-center text-white focus:outline-none border text-sm 
                   bg-zinc-500 border-zinc-400"
            ></div>
            {/* red‑preview boxes */}
            <div className="flex justify-between">
              {redPreview.map((val, idx) => (
                <div
                  key={idx}
                  className="w-full h-10 flex items-center justify-center text-zinc-300 text-xs mx-1 z-10 cursor-pointer"
                  title={`Lane ${idx} red timer`}
                >
                  {val}
                </div>
              ))}
            </div>

            {/* yellow input */}
            <input
              type="number"
              min={1}
              title={
                mode === "manual" ? "Enter values to begin manual mode" : ""
              }
              className="spinner-always w-full h-10 bg-zinc-500 rounded text-center text-zinc-300 focus:outline-none border border-zinc-400 text-sm mt-4 "
              value={tempYellow}
              disabled={running || mode !== "manual"}
              onChange={(e) => setTempYellow(+e.target.value)}
            />
            {/* green input */}
            <input
              type="number"
              min={1}
              title={
                mode === "manual" ? "Enter values to begin manual mode" : ""
              }
              value={tempGreen}
              disabled={running || mode !== "manual"}
              onChange={(e) => setTempGreen(+e.target.value)}
              className="spinner-always w-full h-10 bg-zinc-500 rounded text-center text-zinc-300 focus:outline-none mt-4 border border-zinc-400 text-sm"
            />

            {/* Set button */}
            {/* <button
              onClick={handleSet}
              disabled={running || mode !== "manual"}
              className="w-full h-7 bg-zinc-500 rounded text-center text-zinc-300 focus:outline-none mt-4 border border-zinc-400 text-sm"
            >
              Set
            </button> */}
          </div>
        </div>
      </div>

      {/* ─── INTERSECTION ────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
          bottom: 45,
          border: `1px solid ${
            mode === "ai" ? "#a142f5" : mode === "manual" ? "orange" : "white"
          }`,
          overflow: "hidden",
        }}
      >
        {/* background */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url("${BACKGROUND_SRC}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* signals (UNCHANGED render logic) */}
          {signals.map((sg, idx) => {
            let imgSrc = RED_SIGNAL_SRC;
            let timeLeft = 0;
            if (idx === currentGreen) {
              if (currentYellow === 1) {
                imgSrc = YELLOW_SIGNAL_SRC;
                timeLeft = sg.yellow;
              } else {
                imgSrc = GREEN_SIGNAL_SRC;
                timeLeft = sg.green;
              }
            } else {
              imgSrc = RED_SIGNAL_SRC;
              timeLeft = sg.red;
            }
            const [sx, sy] = signalCoords[idx];
            const rotation =
              idx === 1 ? 90 : idx === 0 ? 0 : idx === 3 ? 270 : 180;

            return (
              <React.Fragment key={idx}>
                <img
                  src={imgSrc}
                  alt="signal"
                  style={{
                    position: "absolute",
                    left: sx,
                    top: sy,
                    width: 90,
                    height: 110,
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: "center",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left:
                      sx +
                      (idx === 0 ? 20 : idx === 1 ? 62 : idx === 2 ? 20 : -23),
                    top:
                      sy +
                      (idx === 0 ? 2 : idx === 1 ? 44 : idx === 2 ? 86 : 44),
                    width: 50,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#a1a1aa",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  {timeLeft}
                </div>
              </React.Fragment>
            );
          })}

          {/* vehicles (UNCHANGED) */}
          {Object.keys(vehiclesObj).map((dirKey) =>
            [0, 1, 2].map((lane) =>
              vehiclesObj[dirKey as Direction][lane as 0 | 1 | 2].map(
                (v, idx) => (
                  <div
                    key={`${dirKey}-${lane}-${idx}`}
                    style={{
                      position: "absolute",
                      left: v.x,
                      top: v.y,
                      width: v.width,
                      height: v.height,
                      borderRadius: "50%",
                      backgroundColor: v.color,
                      transform: `rotate(${v.rotateAngle}deg)`,
                    }}
                  />
                )
              )
            )
          )}
        </div>
      </div>

      {/* ─── Logs window & bottom toolbar (UNCHANGED) ─── */}
      <LogsWindow />

      <div
        className="bg-zinc-800 backdrop-blur-sm text-xs text-zinc-300"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "8px",
          zIndex: 999,
        }}
      >
        <div>
          <strong>Generated Vehicles:</strong> {spawnedCount} / {TOTAL_VEHICLES}
        </div>
        <div>
          <strong>Crossed Vehicles:</strong> {totalPassed} / {TOTAL_VEHICLES}
        </div>
        <div>
          <strong>Active Vehicles:</strong> {onScreenCount} / {TOTAL_VEHICLES}
        </div>
        <div>
          <strong>Waiting Vehicles:</strong> {spawnedCount - totalPassed} /{" "}
          {TOTAL_VEHICLES}
        </div>
        <div>
          <strong>Time (seconds):</strong> {timeElapsed.toFixed(1)} / 292.0
        </div>
      </div>
      {/* {(["right", "down", "left", "up"] as Direction[]).map((dir) => (
        <React.Fragment key={dir}>
          <StopLineVisual
            direction={dir}
            position={stopLines[dir]}
            color="red"
            type="stop"
          />
          <StopLineVisual
            direction={dir}
            position={defaultStop[dir]}
            color="blue"
            type="default"
          />
        </React.Fragment>
      ))} */}
    </div>
  );
}
