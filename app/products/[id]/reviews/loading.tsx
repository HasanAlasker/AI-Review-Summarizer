import Grid from "@/components/general/Grid";
import ProductSkeleton from "@/components/product/Skeleton";

export default function loading() {
  return (
    <div>
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
