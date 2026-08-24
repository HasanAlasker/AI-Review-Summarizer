import React from "react";
import Filter from "./Filter";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function ProductActions({ categories }: Props) {
  return (
    <div className="flex w-full justify-between">
      <div></div>
      <Filter categories={categories} />
    </div>
  );
}
