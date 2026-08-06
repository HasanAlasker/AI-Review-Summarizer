import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col md:flex-row gap-10 md:gap-10 lg:gap-20 w-full h-full">
        {/* Image skeleton */}
        <div className="w-full aspect-square  bg-white rounded-lg border border-border overflow-hidden">
          <Skeleton width={"100%"} className="aspect-square" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col justify-between gap-10 w-full">
          <div className="flex flex-col gap-10 h-full">
            <Skeleton height={40} width="60%" />

            <div className="flex flex-col gap-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="90%" />
              <Skeleton height={20} width="75%" />
            </div>

            <Skeleton height={32} width={120} />

            <Skeleton height={40} width={160} borderRadius={8} />
          </div>

          <Skeleton height={56} borderRadius={8} />
        </div>
      </div>
    </div>
  );
}
