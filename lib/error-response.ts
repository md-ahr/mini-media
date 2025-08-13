import { ApiResponse } from "@/actions/auth/type";

function createErrorResponse(message: string): ApiResponse<null> {
  return {
    success: false,
    message,
    data: null,
  };
}

export { createErrorResponse };
