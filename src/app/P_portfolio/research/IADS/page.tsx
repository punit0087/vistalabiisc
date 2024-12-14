import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function IndianADAS() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">Indian ADAS</p>
        <p className="text-sm mt-4 text-justify mb-5">
          The usefulness of ADAS or advanced driver warning systems under
          Heterogeneous Disordered Traffic (HDT) conditions is still not well
          understood in scientific literature. Too many ADAS warnings can have
          detrimental effects on drivers’ behaviour, particularly when driving
          larger vehicles (like buses) under densely packed HDT conditions, like
          on Indian roads. This work will allow us to optimize ADAS for Indian
          drivers and traffic conditions, reducing driver fatigue and making the
          drivers more aware of their surroundings, thus improving the overall
          road safety of bus drivers. For BMTC (Bangalore Metropolitan Transport
          Corporation), this will allow them to understand the best ADAS
          warnings and modalities for their bus drivers.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Aditya Arvind, Rishab Sharma, Vishwajeet Pattanaik, Aravinda
            Reddy
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Computer Vision, Generative AI, Regression, Classification
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
            {" "}
            Telematics, Images, Physiological Sensors, Eye Tracking Data
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Volvo Group India Private Ltd., CiSTUP, IISc
          </p>
        </div>
      </div>
    </div>
  );
}
