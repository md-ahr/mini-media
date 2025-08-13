type User = {
  username: string;
  email: string;
  avatar?: string;
} | null;

type AuthData = {
  accessToken: string;
  refreshToken: string;
  user?: User | null;
} | null;

type ApiResponse<T = User | null> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type { ApiResponse, AuthData, User };
