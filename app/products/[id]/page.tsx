import { prisma } from "@/lib/prisma";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  
  return (
    <div>
      Product ID: {id} 
      <h2 className="text-3xl font-bold">{product?.name}</h2>
    </div>
  );
}
