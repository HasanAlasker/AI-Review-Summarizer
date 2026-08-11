import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function AddBtn() {
  return (
    <Link href={"/admin/add/product"}>
      <Button className="mb-5">
        <Plus />
        Add Product
      </Button>
    </Link>
  );
}
