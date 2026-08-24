"use client";
import { PriceFilter } from "@/constants/priceFilter";
import { SelectOption } from "@/types/selectOptions";
import { Funnel } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterCheckbox from "../form/FilterCheckbox";
import FilterSelect from "../form/FilterSelect";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FieldGroup } from "../ui/field";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function Filter({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  const [open, setOpen] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [limited, setLimited] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!open) return;
    setOutOfStock(searchParams.get("outOfStock") === "true");
    setLimited(searchParams.get("limited") === "true");
    setDiscount(searchParams.get("discount") === "true");
    setCategory(searchParams.get("category") ?? "");
    setPrice(searchParams.get("price") ?? "");
  }, [open, searchParams]);

  const categoryItems: SelectOption[] = categories.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (outOfStock) params.set("outOfStock", "true");
    if (limited) params.set("limited", "true");
    if (discount) params.set("discount", "true");
    if (category) params.set("category", category);
    if (price) params.set("price", price);

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const resetFilters = () => {
    setOutOfStock(false);
    setLimited(false);
    setDiscount(false);
    setCategory("");
    setPrice("");
    router.push(pathname);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={"secondary"}>
            <Funnel />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Filter</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <FilterSelect
            label="Category"
            placeholder="All categories"
            items={categoryItems}
            value={category}
            onChange={setCategory}
          />

          <FilterSelect
            label="Sort by"
            placeholder="Newest"
            items={PriceFilter}
            value={price}
            onChange={setPrice}
          />

          <FilterCheckbox
            id="discount"
            label="Discounted"
            checked={discount}
            onChange={setDiscount}
          />
          <FilterCheckbox
            id="limited"
            label="Low stock"
            checked={limited}
            onChange={setLimited}
          />
          {isAdmin && (
            <FilterCheckbox
              id="outOfStock"
              label="Out of stock"
              checked={outOfStock}
              onChange={setOutOfStock}
            />
          )}
        </FieldGroup>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
