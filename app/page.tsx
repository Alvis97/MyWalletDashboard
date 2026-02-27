import Carusell from "@/components/Carusell";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] font-sans">
        <Carusell/>
    </div>
  );
}
