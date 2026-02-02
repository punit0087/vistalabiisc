import logo from "@/assets/vista_logo1(black).svg";
import copyrights from "@/assets/copyright.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="p-5 flex justify-around border-t-[0.5px] border-neutral-300 sm:flex-col">
      <div className="w-[36%] h-[12vh] rounded-lg flex text-center justify-start sm:w-full">
        <Image src={logo} alt="" className="w-[60%] h-auto ml-4" />
      </div>
      <div className="w-[60%] h-[12vh] rounded-lg flex text-center justify-end sm:justify-start sm:h-fit sm:ml-4 sm:w-full">
        <div className="flex">
          <Image src={copyrights} alt="" className="w-6" />
          <p className="h-auto my-auto m-2 mr-28 font-bold text-xs text-slate-200 uppercase sm:mr-0">
            VISTA Lab, IISc 2026
          </p>
        </div>
      </div>
    </div>
  );
}
