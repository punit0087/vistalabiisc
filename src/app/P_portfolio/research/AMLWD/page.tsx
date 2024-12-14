import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";

export default function AMLWatchDog() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">AML WatchDog</p>
        <p className="text-sm mt-4 text-justify mb-5">
          The Indian Institute of Science (IISc) and the National Payments
          Corporation of India (NPCI) have initiated a groundbreaking joint
          research project to revolutionize the fight against financial crimes
          in India. This critical initiative leverages cutting-edge Graph and
          Graph Neural Network (GNN) analytics to detect and prevent money
          laundering and fraudulent transactions within NPCI's vast network of
          over 40 crore daily transactions. The collaboration brings together
          renowned researchers and industry professionals to develop innovative
          solutions that can identify anomalous sub-graphs and networks
          contributing to financial crimes with unprecedented speed and
          accuracy. By harnessing advanced graph algorithms and GNN techniques,
          this project aims to provide NPCI's Anti-Money Laundering team with
          cutting-edge tools for near real-time detection of suspicious patterns
          and relationships within the transaction graph. The outcomes of this
          research have far-reaching implications for the entire financial
          sector in India and beyond, setting new benchmarks in the fight
          against financial crimes. The project's success will strengthen public
          confidence in digital transactions, support the government's efforts
          to curb illicit activities, and contribute to the overall economic
          stability and growth of the nation.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Paritosh Tiwari, Ram Samarth B B
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Graph Neural Networks, Anomaly Detection, Temporal Graph Mining,
            Dynamic Graphs
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Financial Transactions (UPI and IMPS Data)
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
