import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UsePaginationProps = {
  totalPages: number;
};

export const usePagination = ({
  totalPages,
}: UsePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);

  

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleJump = (page: number) => {
    if (
      Number.isNaN(page) ||
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    handlePageChange(page);
  };

 const visiblePages: (number | "...")[] = (() => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
})();

  return {
    currentPage,
    handlePageChange,
    handleJump,
    visiblePages,
  };
};