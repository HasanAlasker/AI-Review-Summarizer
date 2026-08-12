"use client";
import { useState } from "react";
import Grid from "@/components/general/Grid";
import Card from "@/components/product/Card";
import type {
  Product,
  Image as ImageModel,
} from "@/lib/generated/prisma/client";

type ProductWithImages = Omit<Product, "price" | "discountPrice"> & {
  price: number;
  discountPrice: number;
  images: ImageModel[];
  category: string;
};

export default function ProductGrid({
  initialProducts,
  isAdmin,
}: {
  initialProducts: ProductWithImages[];
  isAdmin: boolean;
}) {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Grid>
      {products.map((p) => (
        <Card key={p.id} {...p} isAdmin={isAdmin} onDelete={handleDelete} />
      ))}
    </Grid>
  );
}
