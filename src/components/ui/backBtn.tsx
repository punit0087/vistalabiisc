"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import closeBtn from "@/assets/close.svg";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="h-fit bg-none z-[99] text-sm items-center bg-zinc-900 border border-zinc-400 rounded-[50%] p-4 m-4 mt-0 sm:fixed sm:top-[15%]"
    >
      <Image src={closeBtn} alt="" className="w-4" />
    </button>
  );
};

export default BackButton;
