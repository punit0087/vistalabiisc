import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import bigdata from "@/app/P_portfolio/assets/bigdata.png";
import cluster from "@/app/P_portfolio/assets/cluster.png";

import "@/app/P_portfolio/components/style.css";

export default function Sasd() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Structure Assessment in Streaming Data
        </p>
        <p className="text-sm mt-4 text-justify p-4">
          The widespread use of Internet of Things (IoT) technologies,
          smartphones, and social media services generate huge amounts of data
          streaming at high velocity. Automatic interpretation of these rapidly
          arriving data streams is required for the timely detection of
          interesting events that usually emerge in the form of clusters. At
          present, there is no technique on offer for visual assessment of
          evolving cluster structure in high-velocity, massive data streams.{" "}
          <br />
          <br />
          Visual assessment of cluster tendency (VAT) model, which produces a
          record of structural evolution in the data stream by building a
          cluster heat map of the entire processing history in the stream.
          Existing VAT-based algorithms for streaming data are not suitable for
          high-velocity, high-volume streaming data because of high memory
          requirements and slower processing speed as the accumulated data
          increases. Scalable iVAT (siVAT) algorithm can handle big batch data,
          but for streaming data, it needs to be (re)applied everytime a new
          datapoint arrives, which is not feasible due to associated computation
          complexities. The aim is to develop an online algorithm for tracking
          of evolving cluster structures in high-velocity, high dimensional data
          streams. An incremental version of scalable iVAT algorithm is
          developed for change detection and structural assessment in
          high-velocity data streams. <br />
          <br />
          The developed algorithm is illustrated with a 2D synthetic dataset
          which evolves significantly over time. The developed algorithm
          produces reordered dissimilarity image or cluster heat map (a square
          digital image) for cluster assessment, which is updated after every
          new chunk of a pre-specified number of datapoints. The intensity of
          each pixel in an RDI reflects the dissimilarity between the
          corresponding row and column objects. A "useful" RDI highlights
          potential clusters as a set of "dark blocks" along the diagonal of the
          image. This video demonstrates the algorithm’s ability to visualize
          changing cluster structure in streaming data.
          <br />
          <br />
        </p>
        <div className="flex mt-20 w-full mx-auto sm:flex-col">
          <iframe
            src="https://drive.google.com/file/d/1oItXM072Yjq1EYxngL80XshaHJeRya3c/preview"
            width="640"
            height="420"
            allow="autoplay"
            className="mr-4 w-full sm:h-fit sm:mb-5"
          ></iframe>
          <iframe
            src="https://drive.google.com/file/d/1yQ8w4HOxSpQDman29RScOo7ormwOz5Ic/preview"
            width="640"
            height="420"
            allow="autoplay"
             className="mr-4 w-full sm:h-fit"
          ></iframe>
        </div>
        <ul className="list-disc leading-5 font-semibold text-justify mt-20 w-[60%] sm:w-full">
          Research Outcome:
          <li className="text-xs mt-4">
            Rathore P., Kumar D., Bezdek J. C., Rajasegarar S., Palaniswami M.
            (2020) Visual Structure Assessment and Anomaly Detection for
            High-Velocity Data Streams", (minor revision) in IEEE Transactions
            on Cybernetics.
          </li>
        </ul>
      </div>{" "}
    </div>
  );
}
