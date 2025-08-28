import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
export default function CityWatch() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
            <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">City Watch</p>
        <p className="text-sm mt-4 text-justify mb-5">
          The project aims to leverage the capabilities of Unmanned Aerial
          Vehicles (UAVs) to create an automated surveillance system. Drones,
          equipped with high-resolution cameras and AI software, will be used
          for accurate object detection and tracking, including vehicles and
          people, even under challenging conditions such as partial occlusion
          and varied viewpoints. The project specifically targets two critical
          objectives: (i) real-time tracking of vehicles and individuals on
          roads and (ii) precise estimation of vehicle queue lengths in dense
          traffic. Emphasis will be placed on developing efficient algorithms
          for embedded systems, ensuring optimal performance without overloading
          the UAV’s hardware. By addressing these challenges, the project seeks
          to contribute to the advancement of effective UAV-based surveillance
          systems for diverse applications, including traffic monitoring and
          security.
        </p>
        <div className="mt-2">
          <span className="text-zinc-300 font-semibold">Researchers: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Parikshit Singh Rathore, Romit Bhaumik, Vishwajeet Pattanaik,
            Aravinda Reddy
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Technologies: </span>
          <p className="text-zinc-400 text-sm mt-1">
            Computer Vision, Edge-Computing, Deep Learning
          </p>
        </div>
        <div className="mt-4">
          <span className="text-zinc-300 font-semibold">Data: </span>
          <p className="text-zinc-400 text-sm mt-1">Aerial View Videos</p>
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
