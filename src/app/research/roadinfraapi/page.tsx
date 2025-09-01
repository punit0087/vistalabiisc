import BackButton from "@/components/ui/backBtn";

import "@/app/P_portfolio/components/style.css";

export default function Sasd() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">RoadInfraAPI</p>
        <p className="text-sm mt-4 text-justify mb-5">
          India’s roads are constantly changing, but today’s methods of checking
          their condition—such as survey vehicles and central databases—are
          slow, expensive, and limited. At the same time, almost every modern
          truck, bus, or car already carries powerful sensors: accelerometers,
          GPS, cameras, onboard diagnostics, and often a human driver with a
          smartphone. Aftermarket devices and roadside CCTVs also generate
          valuable data. The problem is that all this information remains
          scattered across silos. This project aims to build an open and
          standardised API that can bring these different data sources together
          and make them usable for road monitoring at scale. By collecting
          simple sensor signals—such as raw accelerometer readings, GPS
          location, and camera feeds—we can crowdsource insights about road
          roughness, potholes, parked vehicles on highways, and sudden
          diversions. The API will be lightweight enough to run on both high-end
          and low-cost devices, designed to comply with Indian regulations, and
          resilient to patchy network conditions (so data can still be captured
          in low-connectivity areas). Ultimately, the project envisions turning
          vehicle fleets into rolling surveyors of India’s roads—creating a
          scalable, vendor-neutral way to monitor infrastructure, improve
          safety, and enable smarter planning.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Arindam Chakraborty, Chinmay P Mhatre, Dr. Punit Rathore, Dr.
            Vishwajeet Pattanaik
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Open APIs, Streaming Data, Crowdsourcing, Scalable Infrastructure
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1"></p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Volvo Group India Private Ltd.
          </p>
        </div>
      </div>{" "}
    </div>
  );
}
