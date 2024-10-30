import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function TrafficBrain() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">Traffic Brain</p>
        <p className="text-sm mt-4 text-justify mb-5">
          In the era of rapid urbanization driving globalization, the emphasis
          on smart cities has become central to this process. India, as a
          developing nation, is poised to construct a significant number of
          smart cities. However, the pressing challenge remains in designing and
          implementing an intelligent traffic management system, particularly in
          densely populated and chaotic traffic scenarios like those in India.
          The escalating traffic congestion, fuel consumption, and economic
          losses have underscored the urgent need for an efficient traffic
          control paradigm. Traditional traffic control methods with signal
          transitions have proven inadequate, necessitating a paradigm shift
          towards an automated traffic management system. Considering these
          aspects, this project aims to develop an innovative data-driven
          traffic control solution for a selected Indian city, targeting around
          40 to 50 major traffic intersections, with the primary objective of
          ensuring a seamless and optimized traffic flow.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Rankit Kachroo, Vishwajeet Pattanaik, Aravinda Reddy
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Reinforcement Learning, Computer Vision, Graph Neural Networks
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Traffic Density, Traffic Cameras, Phase Signal timings
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Bharat Electronics Limited (BEL)
          </p>
        </div>
      </div>
    </div>
  );
}
