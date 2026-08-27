import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

function buildHref(
  page: number,
  searchParams: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && key !== "page") params.set(key, value);
  }
  params.set("page", String(page));
  return `?${params.toString()}`;
}

export function PaginationComp({
  currentPage,
  totalPages,
  searchParams,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // simple windowing: show first, last, current +/-1, ellipsis elsewhere
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || p === currentPage
    //  || Math.abs(p - currentPage) <= 1,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1 ? buildHref(currentPage - 1, searchParams) : "#"
            }
          />
        </PaginationItem>

        {visible.map((p, i) => {
          const prev = visible[i - 1];
          const showEllipsisBefore = prev && p - prev > 1;
          return (
            <div key={p} className="flex items-center">
              {showEllipsisBefore && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={buildHref(p, searchParams)}
                  isActive={p === currentPage}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            </div>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? buildHref(currentPage + 1, searchParams)
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
