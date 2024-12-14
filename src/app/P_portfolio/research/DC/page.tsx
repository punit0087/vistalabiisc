import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function DeepClustering() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Deep Clustering
        </p>
        <p className="text-sm mt-4 text-justify mb-5">
          Clustering is an important unsupervised learning approach for
          (unlabelled) data mining that partitions the data into groups with
          similar objects to discover interesting patterns from the dataset.
          Deep learning-based clustering techniques have recently gained
          popularity due to their ability to handle complex high-dimensional
          data. However, these algorithms have limitations, such as the need to
          specify the number of clusters explicitly beforehand, the lack of
          information about the inherent cluster structure of data points, and
          difficulties in interpreting the neural network’s predictions. To
          overcome these limitations, researchers have used visual assessment of
          clustering tendency (VAT) methods to estimate the number of clusters
          present in data. However, these methods are not practical and are
          often inconclusive with high-dimensional datasets which is the case in
          most real-life data. Therefore, this project aims to develop an
          explainable, self-supervised learning-based visual-analytical
          framework for cluster structure assessment to discover the deep
          structures present in complex, high-dimensional data when no ground
          truths are available.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Alokendu Mazumder, Paritosh Tiwari, Tirthajit Baruah, Siddhant
            Sharma, Sourav Ranjan Saraf, Nidhi Ahlawat
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Contrastive Learning, Self-Supervised Learning
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">Images, Time-series</p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Anusandhan National Research Foundation (ANRF, previously SERB)
          </p>
        </div>
      </div>
    </div>
  );
}
