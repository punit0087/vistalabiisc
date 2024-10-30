import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function RoadDNA() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">Road DNA</p>
        <p className="text-sm mt-4 text-justify mb-5">
          This project explores prototyping and development of a sensing
          platform with multiple modalities. It also involves computer vision
          techniques which will be used for road surface monitoring applications
          under adverse weather conditions to enhance existing ADAS systems.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Shaurya Pratap Singh, Prasant Misra
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Multimodal Machine Learning, Representation Learning, ML for
            Constrained Devices
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">Heterogeneous Data</p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">IISc Bangalore</p>
        </div>
      </div>
    </div>
  );
}
