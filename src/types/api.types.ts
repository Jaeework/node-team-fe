export interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
}

export interface ApiError {
  success: boolean;
  isUserError: boolean;
  message: string | null;
}
