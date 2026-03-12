export const getPages = (
  page: number,
  totalPages: number,
  siblingCount = 1,
) => {
  const pages: (number | string)[] = [];

  const start = Math.max(1, page - siblingCount);
  const end = Math.min(totalPages, page + siblingCount);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};
