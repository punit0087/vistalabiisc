import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function VehicleSec() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">Vehicle Sec</p>
        <p className="text-sm mt-4 text-justify mb-5">
          Modern automobile systems are integrated with advanced communication
          and computational capabilities, and as a result, they come with many
          advanced features. However, these advancements render the automobile
          systems more prone to cyber-attacks. This project focuses on
          developing unsupervised learning technique on edge device (ECU) to
          detect and prevent attacks by monitoring the CAN bus traffic data in a
          car.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Ashhar Zaman, Pruthvish Rajput
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Unsupervised Learning, Clustering, Anomaly Detection, Markov Chain
            Models
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">Telematics Data</p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">Tata Elxsi Ltd.</p>
        </div>
      </div>
    </div>
  );
}
