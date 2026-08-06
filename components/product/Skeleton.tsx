import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
    CardFooter,
    CardHeader,
    CardTitle,
    Card as ShadCard
} from "../ui/card";

export default function ProductSkeleton({}) {
  return (
    <ShadCard className="flex flex-col justify-between">
      <CardHeader className="flex gap-2">
        <Skeleton width={90} className="aspect-square" />
        <CardTitle className="flex flex-1 flex-col">
          <Skeleton width={120} />
          <Skeleton width={"90%"} height={10} />
          <Skeleton height={10} />
          <Skeleton width={80} height={10} />
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Skeleton width={50} />
          <Skeleton width={85} height={30} />
        </div>
      </CardFooter>
    </ShadCard>
  );
}
