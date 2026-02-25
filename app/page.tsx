import Carusell from "@/components/Carusell";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex flex-col font-sans dark:bg-black">
      <main className="flex-1 w-full">

        <div className="h-full w-full overflow-x-auto">
        <Carusell/>
        </div>
      
      
      </main>
    </div>
  );
}
