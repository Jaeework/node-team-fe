import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "./Pagination.types";
import { getPages } from "../../../utils/pagination.utils";

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const pages = getPages(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-2">
      {/* prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="border-border flex h-10 w-10 items-center justify-center rounded-lg bg-white disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p as number)}
            className={`border-border flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold ${
              p === page
                ? "bg-primary text-white"
                : "hover:bg-primary/10 bg-white"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border-border flex h-10 w-10 items-center justify-center rounded-lg bg-white disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
