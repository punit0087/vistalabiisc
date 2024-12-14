import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import dbshmi from "@/app/P_portfolio/assets/dbshmi.png";

import "@/app/P_portfolio/components/style.css";

export default function Dbshmi() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Driving Behaviour Study using Human-Machine Interactions
        </p>
        <ul className="list-disc leading-6 font-semibold text-justify">
          <li>
            Driving Behaviour Study in Indian Traffic Scenario using Bus Driving
            Simulator (Ongoing)
          </li>
          <li>
            Understanding Drivers' Stress and Interactions with Vehicle Systems
          </li>
        </ul>{" "}
        <p className="text-sm mt-4 text-justify p-4">
          Today, and probably for a long time to come, humans will remain an
          integral part of vehicles for driving tasks. Therefore, it is
          essential to understand how vehicles and drivers interact with each
          other and how drivers' behavior and physical and mental states affect
          vehicle performance and traffic safety. In this work, the relationship
          between driver and vehicle was explored in real-world driving
          conditions by analyzing large-scale naturalistic data collected from
          cars and drivers. We analyzed different types of driver-vehicle
          interactions during driving, investigated the effect of different
          driving conditions on drivers' stress, and explored the relationship
          between driver and vehicle in different driving conditions. The
          findings from this work could be used to help manage comfort-related
          in-vehicle intervention systems and could provide a continuous measure
          of how different external conditions (traffic, road, weather, etc.)
          affect drivers.
        </p>
        <div className="flex mt-20 sm:flex-col">
          <Image src={dbshmi} alt="" className="rounded-[10px] mr-6 w-[60%] sm:w-full sm:mb-8" />
          <ul className="list-disc leading-5 font-semibold text-justify ml-20 w-[30%] sm:w-full sm:ml-0">
            Research Outcome:
            <li className="text-xs">
              Milardo, S., Rathore, P., Santi, P., Ratti C. “Understanding
              Drivers’ Stress and Interactions with Vehicle Systems Through
              Naturalistic Data Analysis", IEEE International Transactions on
              Intelligent Transportation Systems, 2021
            </li>
          </ul>
        </div>
      </div>{" "}
    </div>
  );
}
