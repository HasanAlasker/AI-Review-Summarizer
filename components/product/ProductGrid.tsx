"use client";
import { useEffect, useState } from "react";
import Grid from "@/components/general/Grid";
import Card from "@/components/product/Card";
import type {
  Product,
  Image as ImageModel,
} from "@/lib/generated/prisma/client";
import { useSession } from "next-auth/react";

type ProductWithImages = Omit<Product, "price" | "discountPrice"> & {
  price: number;
  discountPrice: number;
  images: ImageModel[];
  category: string;
};

export default function ProductGrid({
  initialProducts,
}: {
  initialProducts: ProductWithImages[];
}) {
  const [products, setProducts] = useState(initialProducts);

  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

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
