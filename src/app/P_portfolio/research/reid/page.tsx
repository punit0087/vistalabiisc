import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import lstp from "@/app/P_portfolio/assets/TrajectoryClusteringDiagram.png";

import "@/app/P_portfolio/components/style.css";

export default function Fake_r() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <div className="mb-10">
          <p className="text-[2.2rem] mb-3 font-bold text-zinc-300">
            Vehicle ReID
          </p>
          <p className="text-xs">Live Interactive Demo: Coming Soon</p>
        </div>
        <iframe
          width="560"
          height="600"
          src="https://www.youtube.com/embed/FInVA32gMa4?autoplay=1&mute=1&loop=1&playlist=FInVA32gMa4&controls=0&modestbranding=1&rel=0"
          allow="autoplay; encrypted-media; fullscreen"
          className="rounded-xl border-4 border-zinc-500 w-full"
        />

        {/* <p className="text-sm text-justify p-4">
          The widespread use of global positioning system (GPS) navigation
          systems and wireless communication technology-enabled vehicles have
          resulted in huge volumes of spatio-temporal data, especially in the
          form of trajectories. These data often contain a great deal of
          information, which give rise to many location-based services (LBSs)
          and applications such as vehicle navigation, traffic management, and
          location-based recommendations. One key operation in such applications
          is the route prediction of moving objects. Vehicle route prediction
          allows certain services to improve their quality, e.g., if the route
          of vehicles is known in advance, intelligent transportation systems
          (ITSs) can provide route-specific traffic information to drivers such
          as forecasting traffic conditions and routing the driver to avoid
          traffic jams. <br />
          <br />
          Most trajectory prediction approaches in the literature use only
          synthetic or small to medium size real trajectory datasets because
          they are not scalable. The aim is to develop a framework for
          large-scale trajectory prediction which can be used for road networks
          of major cities. A scalable framework was developed for short-term and
          long-term trajectory prediction, based on our novel big data
          clustering algorithm and Markov models, which can utilize a large
          number (in millions) of trajectories in a dense road network. The
          developed framework was tested on two real-life, large-scale, taxi
          trajectory datasets from the Beijing and Singapore road networks in
          our experiments.
        </p>

        <div className="flex mt-14 sm:flex-col">
          <Image
            src={lstp}
            alt=""
            className="rounded-[10px] mr-6 w-[60%] sm:w-full sm:mb-5"
          />
          <ul className="list-disc leading-5 font-semibold text-justify ml-20 w-[30%] sm:w-full sm:ml-0">
            Research Outcome:
            <li className="text-xs">
              Rathore P., Kumar D., Rajasegarar S., Palaniswami M, Bezdek J. C.
              (2019) ,"A Scalable Framework for Trajectory Prediction," in IEEE
              Transactions on Intelligent Transportation Systems.
            </li>
          </ul>
        </div> */}
      </div>{" "}
    </div>
  );
}
