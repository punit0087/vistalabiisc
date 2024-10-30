import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import udb from "@/app/P_portfolio/assets/udb.png";
import udb2 from "@/app/P_portfolio/assets/Driving_Behaviour_T_ITS.png";

import "@/app/P_portfolio/components/style.css";

export default function Dba() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Driving Behaviour Analysis
        </p>
        <ul className="list-disc leading-6 font-semibold text-justify">
          <li>
            Driving Behaviour Analysis of Professional Bus Drivers in Indian
            Traffic Scenario (Ongoing)
          </li>
          <li>
            Driving behaviour classification:
            <ul className="list-disc leading-6 ml-4">
              <li>An unsupervised (Explainable) approach</li>
              <li>Supervised (AutoML-based) approach</li>
            </ul>
          </li>
        </ul>
        <p className="text-sm mt-4 text-justify p-4">
          Traditional driving behaviour recognition algorithms leverage
          hand-crafted features extracted from raw driving data, and then apply
          user-defined machine learning models to identify driving behaviours.
          However, such solutions are limited by the set of selected features
          and by the chosen model, requiring extensive knowledge of the analyzed
          signals to perform reasonably. In this work, two data-driven driving
          behaviour recognition frameworks are developed for professional
          drivers based on
        </p>
        <ul className="list-disc leading-6 font-normal text-justify ml-4">
          <li>
            a simple yet efficient, unsupervised, aggregation based approach
          </li>
          <li>
            automatic feature extraction and feature selection algorithm and a
            deep neural network architecture obtained using an Automated Machine
            Learning (AutoML) approach.
          </li>
        </ul>
        <div className="flex mt-20 sm:flex-col">
          <Image src={udb} alt="" className="rounded-[10px] mr-6 w-[50%] sm:w-full sm:mb-5" />
          <Image src={udb2} alt="" className="rounded-[10px] mr-6 w-[50%] sm:w-full" />
        </div>
        <ul className="list-disc leading-5 font-semibold text-justify mt-20 w-[60%] sm:w-full">
          Research Outcome:
          <li className="text-xs mt-4">
            Milardo S., Rathore, P., Buteau R., Santi, P., Ratti, C. (2021).. An
            Unsupervised Approach for Driving Behaviour Analysis of Professional
            Truck Drivers, in EAI International Conference on Intelligent
            Transportation Systems (EAI-INTSYS). <br />
            [Best Paper Award]
          </li>
        </ul>
      </div>{" "}
    </div>
  );
}
