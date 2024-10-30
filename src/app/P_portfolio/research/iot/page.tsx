import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import fit from "@/app/P_portfolio/assets/fitzroyvis.jpg";
import estimat from "@/app/P_portfolio/assets/EstimationVisScreenshot.png";
import tree from "@/app/P_portfolio/assets/TreeVisualization.png";

import "@/app/P_portfolio/components/style.css";

export default function Iot() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Internet of Things for Urban Microclimate Monitoring
        </p>
        <p className="text-sm mt-4 text-justify p-4">
          As part of the 'Internet of Things (IoT) for Creating Smart Cities'
          project, the University of Melbourne, ARUP and the City of Melbourne
          council (CoM) have done a pilot deployment of IoT networks in
          Melbourne city for monitoring environmental parameters. One of the
          aims of the research was to develop new systems and algorithms that
          can help City administrators remotely monitor, understand and
          interpret real-time information on urban environments. The
          environmental sensors, measuring light levels, humidity and
          temperature, were deployed at Fitzroy Gardens and Library at the
          Docklands. The data collected was used and analyzed to better
          understand the impact of canopy cover on urban cooling.
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
        <div className="flex justify-between mt-20 sm:flex-col">
          <div className="w-[30%] sm:w-full sm:mb-6">
            <Image src={fit} alt="" className="rounded-[10px] mr-6" />
            <p className="text-justify mt-6">
              <b>Visualization-1:</b> In this visualization video, information
              about the tree species, canopy cover percentage and the numeric
              value of sensor readings (humidity, temperature and light) are
              displayed. This helps to relate different canopy cover and tree
              species with the climate parameters. Canopy coverage is also shown
              using a shadow of the tree that changes its width/size depending
              on the percentage of coverage. A sliding bar is included, for the
              user, to vary the data/time manually and visualize the
              micro-climate at that instance. Click on the image to watch the
              video.
            </p>
          </div>
          <div className="w-[30%] sm:w-full sm:mb-6">
            <Image src={estimat} alt="" className="rounded-[10px] mr-6" />
            <p className="text-justify mt-6">
              <b>Visualization-2:</b> Air temperature and relative humidity are
              also affected by wind speed and direction. More sensor nodes can
              also be deployed incorporating additional sensors for measurement
              of wind speed and direction. This video shows the visualization of
              real-time wind speed and direction measurements (tree leaves
              movements direction and speed) that may contribute better to
              simulate the tree microclimate in advanced level. Click on the
              image to watch the video.
            </p>
          </div>
          <div className="w-[30%] sm:w-full">
            <Image src={tree} alt="" className="rounded-[10px] mr-6 h-[48%]" />
            <p className="text-justify mt-6">
              <b>Visualization-3:</b> This visualization video shows the
              estimated parameter values (temperature, humidity or light) at a
              selected location pointed/selected by the cursor over a spatial
              region, where the sensors are deployed.
            </p>
          </div>
        </div>
        <ul className="list-disc leading-5 font-semibold text-justify mt-20 w-[60%] sm:w-full">
          Research Outcome:
          <li className="text-xs mt-4">
            Rathore, P., Rao, A. S., Rajasegarar, S., Vanz, E., Gubbi, J.,
            Palaniswami, M. (2017). Real-time urban microclimate analysis using
            internet of things. IEEE Internet of Things Journal, 5(2), 500-511.
          </li>
        </ul>
      </div>{" "}
    </div>
  );
}
