import { CartItem } from "@/app/store/useCart";
import Image from "next/image";
import Link from "next/link";
import {
  CardContent,
  CardDescription,
  CardTitle,
  Card as ShadCard,
} from "../ui/card";
import Stepper from "./Stepper";

export default function Card({ id, productId, quantity, product }: CartItem) {
  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col md:flex-row gap-5">
        <Link href={`/products/${productId}`}>
          {product.images[0].url && (
            <Image
              src={product.images[0].url}
              alt={`image of ${product.name}`}
              width={1200}
              height={1200}
              quality={100}
              className="aspect-square object-cover w-full max-w-xs self-center md:w-30 rounded-md mx-auto"
            />
          )}
        </Link>
        <div className="flex flex-1 flex-col">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="mt-3">
            <div>Unit price: $ {product.discountPrice ?? product.price}</div>
            <div>Count: {quantity}</div>
            <div className="font-medium text-primary mt-2">
              Total:{" "}
              {(quantity * (product.discountPrice ?? product.price)).toFixed(2)}
            </div>
          </CardDescription>
        </div>
      </CardContent>
      <Stepper productId={productId} quantity={quantity} stock={product.stock} />
    </ShadCard>
  );
}
