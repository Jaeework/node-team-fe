export interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
}

export interface ApiError {
  success: boolean;
  isUserError: boolean;
  message: string | null;
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "isUserError" in error;
};
