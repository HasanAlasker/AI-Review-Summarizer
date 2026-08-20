import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AddBtn() {
  return (
    <Link href={"/admin/add/product"}>
      <Button>
        <Plus />
        Add Product
      </Button>
    </Link>
  );
}
