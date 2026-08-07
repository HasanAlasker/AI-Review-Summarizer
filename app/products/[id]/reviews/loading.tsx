import Grid from "@/components/general/Grid";
import ProductSkeleton from "@/components/product/Skeleton";
import SkeletonCard from "@/components/summary/Skeleton";

export default function loading() {
  return (
    <div className="flex flex-col gap-10">
      <SkeletonCard />
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
