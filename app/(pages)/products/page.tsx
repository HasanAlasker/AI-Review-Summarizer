import { getProducts } from "@/app/actions/product";
import EProducts from "@/components/empty/EProducts";
import ProductPageComp from "@/components/product/ProductPageComp";
import { Metadata } from "next";
interface Props {
  searchParams: Promise<{
    page: string;
    pageSize?: string;
    q: string;
    outOfStock?: string;
    category: string;
    price: string;
    discount: string;
    limited: string;
  }>;
}

export default async function page({ searchParams }: Props) {
  const {
    page = "1",
    pageSize = "10",
    q,
    outOfStock,
    category,
    price,
    discount,
    limited,
  } = await searchParams;
  const showOutOfStock = outOfStock === "true";
  const showLimited = limited === "true";
  const discounted = discount === "true";

  const { products, count } = await getProducts(
    q,
    showOutOfStock,
    showLimited,
    discounted,
    category,
    price,
    page,
    pageSize,
  );

  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = Math.max(1, Math.ceil(count / Number(pageSize)));

  if (products.length === 0) return <EProducts outOfStockOn={showOutOfStock} />;

  return (
    <ProductPageComp
      currentPage={currentPage}
      products={products}
      searchParams={await searchParams}
      totalPages={totalPages}
    />
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
