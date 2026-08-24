import React from "react";
import Filter from "./Filter";
import { SearchBox } from "./Search";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function ProductActions({ categories }: Props) {
  return (
    <div className="flex w-full justify-between">
      <SearchBox />
      <Filter categories={categories} />
    </div>
  );
}
