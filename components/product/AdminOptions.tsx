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
import axios from "axios";
import { Ellipsis, Eye, PenLine, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  productId: string;
  onDelete: (id: string) => void;
}

export default function AdminOptions({ productId, onDelete }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      onDelete(productId);
      const res = await axios.patch(`/api/admin/product/${productId}/delete`);

      if (res.status === 200) toast.success("Product deleted successfully");
      else toast.warning("Couldn't delete product, try again!");
      return res;
    } catch (error) {}
  };
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
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
