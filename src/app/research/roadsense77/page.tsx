import BackButton from "@/components/ui/backBtn";

import "@/app/P_portfolio/components/style.css";

export default function Sasd() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Road Surface Monitoring System under Low-visibility Weather Conditions
          [roadSense-77]
        </p>
        <p className="text-sm mt-4 text-justify mb-5">
          This project focuses on developing a robust road-condition monitoring
          system capable of detecting potholes and surface irregularities in
          adverse weather conditions. By leveraging the atmospheric penetration
          capabilities of 77GHz mmWave radar, the system identifies road
          features that traditional vision-based sensors (LiDAR and Cameras)
          fail to capture during low-visibility scenarios like heavy fog, rain,
          or snow.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Yash Soni, Dr. Punit Rathore and Dr. Prasant Misra
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">mmWave radar</p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1"></p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Indian Institute of Science, Bengaluru
          </p>
        </div>
      </div>{" "}
    </div>
  );
}
