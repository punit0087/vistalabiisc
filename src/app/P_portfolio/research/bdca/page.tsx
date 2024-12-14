import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import bigdata from "@/app/P_portfolio/assets/bigdata.png";
import cluster from "@/app/P_portfolio/assets/cluster.png";

import "@/app/P_portfolio/components/style.css";

export default function Bdca() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Big Data Cluster Analysis
        </p>
        <p className="text-sm mt-4 text-justify p-4">
          Everyday, an abundant amount of data is generated from various sources
          such as IoT networks, smartphones, and social network activities.
          Making sense of such an unprecedented amount of data is essential for
          many businesses, services, and applications. Currently, there is
          little domain expertise to automate this big data analysis, and
          traditional supervised machine learning techniques suffer from a lack
          of labelled training data in this context. The aim is to develop
          scalable and efficient unsupervised algorithms to manage and extract
          actionable information from big data. <br />
          <br /> Cluster analysis is a useful unsupervised approach to discover
          the underlying groups and useful patterns in the data. Cluster
          Analysis for any data consists of three problems, (P1) cluster
          assessment, which asks “Do the data have clusters? If yes, how many?";
          (P2) Clustering i.e., partitioning the data into clusters, and (P3)
          cluster validity, which asks “Are the clusters found useful? Is there
          a better one we did not find?" Traditional cluster analysis algorithms
          are not suitable for big data owing to its volume, variety, and
          velocity property. <br />
          <br /> A suite of novel scalable algorithms were developed to solve
          each of the three problems of cluster analysis, namely, cluster
          assessment, clustering, and cluster validity, for big data, that may
          be high-dimensional, anomalous and streaming.
        </p>
        <div className="flex mt-20 sm:flex-col">
          <Image src={bigdata} alt="" className="rounded-[10px] mr-6 w-[50%] sm:w-full sm:mb-5" />
          <Image src={cluster} alt="" className="rounded-[10px] mr-6 w-[50%] sm:w-full" />
        </div>
        <ul className="list-disc leading-5 font-semibold text-justify mt-20 w-[60%] sm:w-full">
          Research Outcome:
          <li className="text-xs mt-4">
            Rathore, P., Ghafoori, Z., Bezdek, J. C., Palaniswami, M., Leckie,
            C. (2018). Approximating Dunn's cluster validity indices for
            partitions of big data. IEEE Transactions on Cybernetics, (99),
            1-13.
          </li>
          <li className="text-xs mt-4">
            Rathore, P., Kumar, D., Bezdek, J. C., Rajasegarar, S., Palaniswami,
            M. (2018). A rapid hybrid clustering algorithm for large volumes of
            high dimensional data. IEEE Transactions on Knowledge and Data
            Engineering, 31(4), 641-654.
          </li>
          <li className="text-xs mt-4">
            Rathore, P., Bezdek, J. C., Erfani, S. M., Rajasegarar, S.,
            Palaniswami, M. (2017). Ensemble fuzzy clustering using cumulative
            aggregation on random projections. IEEE Transactions on Fuzzy
            Systems, 26(3), 1510-1524.
          </li>
        </ul>
      </div>{" "}
    </div>
  );
}
