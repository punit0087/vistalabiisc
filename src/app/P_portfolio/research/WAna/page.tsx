import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function WrekAnalyzer() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">Wreck Analyzer</p>
        <p className="text-sm mt-4 text-justify mb-5">
          The Ministry of Road Transport and Highways (MoRTH) has recently
          launched the Integrated Road Accident Database (iRAD) initiative,
          aimed at enhancing road safety across the country. The iRAD system
          will gather comprehensive accident data from every region, enabling
          data analytics to generate insights that improve road safety. This
          information will provide critical input to various stakeholders,
          including the Transport Department, Health Department, Highway
          Authorities, and others, to support decision-making and policy
          formulation. This project also involves advanced technologies such as
          multi-drone energy-aware scheduling, path planning, crash analysis
          algorithms, autonomous flying, and autonomous data collection. When
          the police receive an SOS about an accident within their jurisdiction,
          they quickly arrive at the scene and deploy a drone to assist with
          data collection, including capturing video footage of the site. The
          drone is designed to perform this task autonomously.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Rishabh Sabharwal, Vijay G. Kovali
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Trajectory Planning, Objects Detection and Tracking, Edge AI
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">Videos, IMU</p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">ARTPARK & CiSTUP, IISc</p>
        </div>
      </div>
    </div>
  );
}
