"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Archive, ArrowLeft, Home, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  outOfStockOn: boolean;
}
export default function EProducts({ outOfStockOn = false }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const AdminBtns = () =>
    outOfStockOn ? (
      <Link href={"/products"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
    ) : (
      <Link href={"/admin/add/product"}>
        <Button>
          <Plus />
          Add Product
        </Button>
      </Link>
    );

  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Archive />
        </EmptyMedia>
        <EmptyTitle>
          {!outOfStockOn ? "No Products" : "Nothing out of stock"}
        </EmptyTitle>
        <EmptyDescription>
          {!outOfStockOn
            ? " We currently have no products in stock to display, please try again later!"
            : "No items are out of stock at this time 🎉"}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        {session?.user.role === "admin" ? (
          <AdminBtns />
        ) : (
          <Button onClick={() => router.push("/")}>
            <Home />
            Home
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
