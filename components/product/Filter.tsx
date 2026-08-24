"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Funnel } from "lucide-react";
import { useSession } from "next-auth/react";
import { PriceFilter } from "@/constants/priceFilter";

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

  const [outOfStock, setOutOfStock] = useState(
    searchParams.get("outOfStock") === "true",
  );
  const [limited, setLimited] = useState(
    searchParams.get("limited") === "true",
  );
  const [discount, setDiscount] = useState(
    searchParams.get("discount") === "true",
  );
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [price, setPrice] = useState(searchParams.get("price") ?? "");

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (outOfStock) params.set("outOfStock", "true");
    if (limited) params.set("limited", "true");
    if (discount) params.set("discount", "true");
    if (category) params.set("category", category);
    if (price) params.set("price", price);

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setOutOfStock(false);
    setLimited(false);
    setDiscount(false);
    setCategory("");
    setPrice("");
    router.push(pathname);
  };

  const categoryItems = categories.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  return (
    <Dialog>
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

        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              items={categoryItems}
              value={category}
              onValueChange={(value) => setCategory(value ?? "")}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Sort by</Label>
            <Select
              items={PriceFilter}
              value={price}
              onValueChange={(value) => setPrice(value ?? "")}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                {PriceFilter.map((pf) => (
                  <SelectItem key={pf.label} value={pf.value}>
                    {pf.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="discount"
              checked={discount}
              onCheckedChange={(v) => setDiscount(v === true)}
            />
            <Label htmlFor="discount">Discounted</Label>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="limited"
                checked={limited}
                onCheckedChange={(v) => setLimited(v === true)}
              />
              <Label htmlFor="limited">Low stock</Label>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Checkbox
              id="outOfStock"
              checked={outOfStock}
              onCheckedChange={(v) => setOutOfStock(v === true)}
            />
            <Label htmlFor="outOfStock">Out of stock</Label>
          </div>
        </div>

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
