"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";

export function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (query.length < 3) {
        toast.warning("Please be more specific!");
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", query);
      router.push(`${pathname}/?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathname}/?${params.toString()}`);
  };
  return (
    <InputGroup onKeyDown={handleEnter} className="min-[430px]:max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {query && (
        <InputGroupAddon align="inline-end">
          <X onClick={handleClear} className="cursor-pointer" />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
