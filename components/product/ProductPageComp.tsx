import {
  ProductWithRelations,
  serializeProducts,
} from "@/types/productWithRel";
import { PaginationComp } from "../general/Pagination";
import ProductActions from "./ProductActions";
import ProductGrid from "./ProductGrid";
import { PaginationProps } from "@/types/pagination";

interface ProductPageCompProps extends PaginationProps {
  products: ProductWithRelations[];
}

export default function ProductPageComp({
  products,
  searchParams,
  currentPage,
  totalPages,
}: ProductPageCompProps) {
  return (
    <div className="flex flex-col gap-5">
      <ProductActions />
      <ProductGrid initialProducts={serializeProducts(products)} />
      <PaginationComp
        searchParams={searchParams}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
