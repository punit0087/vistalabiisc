import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import sme from "@/app/P_portfolio/assets/drift.png";

import "@/app/P_portfolio/components/style.css";

export default function Sme() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Sensor Measurements Estimation in Internet of Things
        </p>

        <p className="text-sm mt-4 text-justify p-4">
          In modern IoT deployments for continuous monitoring applications, many
          inexpensive sensors along with a relatively few expensive
          high-precision sensors are used to reduce deployment costs. Generally,
          the low-cost, low-precision sensor nodes have limited memory and
          processing power. Most techniques for sensor drift detection are not
          suitable for modern IoT deployment as they do not consider measurement
          errors/uncertainties present in low-precision sensor measurements. We
          developed an automatic sensor drift detection and correction technique
          by leveraging a Bayesian maximum entropy-based estimation method that
          incorporates measurement errors/uncertainties of low-precision sensors
          to estimate drift, with Kalman filtering to track and correct the
          estimated drift from sensor measurements. We implemented the proposed
          technique in both centralized and distributed frameworks to facilitate
          in-network sensor drift detection/correction in real-time. We extended
          this work for both smooth and abrupt drift detection using Interacting
          Multiple Models. The following figures present the block diagram of
          the developed sensor drift detection/correction method and demonstrate
          how it automatically detects/corrects the sensor drift (from Dockland
          Deployment) in a distributed manner.
        </p>
        <div className="flex mt-20 sm:flex-col">
          <Image src={sme} alt="" className="rounded-[10px] mr-6 w-[60%] sm:w-full sm:mb-5" />
          <ul className="list-disc leading-5 font-semibold text-justify ml-20 w-[30%] sm:w-full sm:ml-0">
            Research Outcome:
            <li className="text-xs mt-4">
              Rathore, P., Kumar, D., Rajasegarar, S., Palaniswami, M. (2017).
              Maximum entropy-based auto drift correction using high-and
              low-precision sensors. ACM Transactions on Sensor Networks (TOSN),
              13(3), 24.
            </li>
            <li className="text-xs mt-2">
              Rathore, P., Kumar, D., Rajasegarar, S., & Palaniswami, M. (2018,
              February). Bayesian maximum entropy and interacting multiple model
              based automatic sensor drift detection and correction in an IoT
              environment, in IEEE 4th World Forum on Internet of Things
              (WF-IoT) (pp. 598-603).
            </li>
          </ul>
        </div>
      </div>{" "}
    </div>
  );
}
