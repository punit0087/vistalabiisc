import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function Cyc() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Cyclone Detection
        </p>
        <p className="text-sm mt-4 text-justify mb-5">
          The comprehensive research project is aimed at leveraging
          self-supervised deep learning techniques to enhance cyclone intensity
          classification and improve disaster management in the fields of
          geological and climate sciences. The project will involve the
          development of advanced Scientific Machine Learning models, and
          collaboration with the Indian Space Research Organisation (ISRO) to
          analyze meteorological data. The ultimate goal is to provide accurate
          predictions, enable effective decision-making, and contribute to
          scientific advancements in cyclone analysis and disaster mitigation.
          The increasing frequency and intensity of cyclonic events demand more
          accurate and timely predictions to enhance disaster management
          efforts. This research project aims to utilize the power of ML
          techniques to improve cyclone intensity classification, cyclone
          genesis forecast and cyclone tracking, enabling effective mitigation
          strategies in geological and climate sciences. Collaboration with ISRO
          will provide access to rich meteorological data for analysis and
          validation.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Akash Agrawal, Mayesh Mohapatra, Paritosh Tiwari, Vishwajeet
            Pattanaik, Punit Rathore
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Self-Supervised Learning, Time-series forecasting, Explainable AI
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Satellite Imagery, INSAT 3D IR
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Indian Space Research Organisation (ISRO)
          </p>
        </div>
      </div>
    </div>
  );
}
