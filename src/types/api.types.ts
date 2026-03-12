export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
  pagination: Pagination;
}

export interface ApiError {
  success: boolean;
  isUserError: boolean;
  message: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  data?: T | null;
  pagination?: Pagination;
}

export interface ApiError {
  success: boolean;
  isUserError: boolean;
  message: string | null;
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "isUserError" in error;
};
