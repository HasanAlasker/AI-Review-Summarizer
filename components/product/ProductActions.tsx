import { prisma } from "@/lib/prisma";
import Filter from "./Filter";
import { SearchBox } from "./Search";

export default async function ProductActions() {
  const categories = await prisma.category.findMany();

  return (
    <div className="flex w-full justify-between">
      <SearchBox />
      <Filter categories={categories} />
    </div>
  );
}
