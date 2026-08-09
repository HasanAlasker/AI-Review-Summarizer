"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Archive, Home, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Archive />
        </EmptyMedia>
        <EmptyTitle>No Products</EmptyTitle>
        <EmptyDescription>
          We currently have no products in stock to display, please try again
          later!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        {session?.user.role === "admin" ? (
          <Link href={"/admin/add/product"}>
            <Button>
              <Plus />
              Add Product
            </Button>
          </Link>
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
