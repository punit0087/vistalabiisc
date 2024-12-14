import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function UpGrid() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">UPGRID</p>
        <p className="text-sm mt-4 text-justify mb-5">
          The project aims to develop an advanced Machine Learning (ML)-based
          Intrusion Detection System (IDS) to safeguard power grids in India
          against cyber-attacks. Given the increasing vulnerability of modern
          power grids due to the integration of Computing and Communication (CC)
          devices, the project will focus on devising unsupervised learning
          models capable of detecting anomalies across various communication
          protocols. By leveraging state-of-the-art techniques like isolation
          forest, One-Class Support Vector Machine (OCSVM), and auto-encoders,
          the project seeks to enhance the specificity and sensitivity of the
          detection system. The research involves extensive data analysis using
          open datasets and synthetic data generation from power grid
          simulators. The developed models will be evaluated using standard
          metrics and deployed over GPU-accelerated computing platforms for
          real-time monitoring. Ultimately, the project’s goal is to create a
          robust and adaptive solution that can effectively detect and prevent
          cyber threats in the Indian power grid, making it more resilient to
          dynamic and sophisticated attacks.{" "}
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Anushtha Tamrakar, Syed Lateef, Kunal Ajay Wasnik, Shailja Sharma,
            Vishwajeet Pattanaik
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Unsupervised Learning, Clustering, Anomaly Detection
          </p>
        </div>
        {/* <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">
           
          </p>
        </div> */}
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Funded By: </span>
          <p className="text-zinc-400 text-sm mt-1">
            POWERGRID Centre of Excellence (PGCoE), IISc
          </p>
        </div>
      </div>
    </div>
  );
}
