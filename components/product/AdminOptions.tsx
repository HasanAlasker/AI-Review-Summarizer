"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, PenLine, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

export default function AdminOptions({ productId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Product actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/products/${productId}`)}
          >
            <Eye />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/edit/product/${productId}`)}
          >
            <PenLine />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
