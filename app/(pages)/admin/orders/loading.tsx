import Grid from "@/components/general/Grid";
import ProductSkeleton from "@/components/product/Skeleton";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <Skeleton width={150} height={35} />
      </div>
      <Grid>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </Grid>
    </div>
  );
}
