export type ApiErrorResponse = {
  message: string;
  error?: unknown;
};

export type ApiResponse<T> = T | ApiErrorResponse;
