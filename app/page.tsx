import BottomSec from "@/components/home/BottomSec";
import TopSec from "@/components/home/TopSec";

export default function Home() {
  return (
    <div className="min-h-full flex flex-1 flex-col gap-20 lg:flex-row justify-between w-full m-auto">
      <TopSec />
      <BottomSec />
      <div className="bg-grid-white fixed inset-0 -z-1" />
    </div>
  );
}
