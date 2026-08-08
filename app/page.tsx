import BottomSec from "@/components/home/BottomSec";
import TopSec from "@/components/home/TopSec";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col gap-20 lg:flex-row justify-between w-full m-auto pt-10 lg:pt-20">
      <TopSec />
      <BottomSec />
    </div>
  );
}
