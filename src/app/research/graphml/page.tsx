import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function GraphMl() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">GraphML</p>
        <p className="text-sm mt-4 text-justify mb-5">
          Graphs are ubiquitous in real-world applications, from social networks
          to transportation networks and financial transaction data. For
          example, transportation systems generate large-scale, dynamic graph
          data, including road networks, vehicle trajectories, public transit
          connections, and traffic flow patterns. Effectively learning from
          these graphs is essential for optimising urban mobility, improving
          traffic prediction, enhancing road safety, and developing intelligent
          transportation systems. However, existing graph neural networks (GNNs)
          are often computationally expensive, struggle with heterogeneous
          traffic data, and lack adaptability to evolving mobility patterns.
          Moreover, many existing graph neural networks (GNNs) struggle with the
          challenges posed by heterophilic graphs, where node labels (e.g.,
          different vehicle types or diverse road segments) or features differ
          among connected nodes, or by spectral properties that require
          sophisticated filtering. This necessitates the development of
          parameter-efficient graph representation learning methods that not
          only reduce computational overhead but also adapt to diverse graph
          structures without compromising performance. To tackle these
          challenges, we will design lightweight, robust modules and
          synchronisation mechanisms capable of leveraging graph structure and
          geometry efficiently with the help of sheaf theory. This research is
          expected to significantly advance the field by enabling GNNs that are
          computationally feasible for large-scale graphs while maintaining
          state-of-the-art performance across diverse graph types.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Ram Samarth B B, P Surya Samyog, Srikar Vedantam
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Graph Neural Networks, Self-supervised learning
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
            {" "}
            Heterophilous Graph Datasets
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            National Payments Corporation of India (NPCI)
          </p>
        </div>
      </div>
    </div>
  );
}
