"use server";

import { clearTokens, setTokens } from "@/lib/auth";
import { api } from "@/lib/axios";
import { createErrorResponse } from "@/lib/error-response";
import { LoginFormData, RegisterFormData } from "@/validations";
import { AxiosError } from "axios";
import { ApiResponse, AuthData, User } from "./type";

export async function register(data: RegisterFormData): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>("/users/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Registration failed. Please try again.");
  }
}

export async function login(
  data: LoginFormData
): Promise<ApiResponse<AuthData>> {
  try {
    const response = await api.post<ApiResponse<AuthData>>("/users/login", {
      email: data.email,
      password: data.password,
    });

    const result = response.data;

    if (result.success && result.data) {
      await setTokens({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
    }

    return result;
  } catch (error: unknown) {
    console.error("Login error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Login failed. Please try again.");
  }
}

export async function googleLogin(): Promise<ApiResponse<AuthData>> {
  try {
    const response = await api.get<ApiResponse<AuthData>>("/users/google");

    const result = response.data;

    if (result.success && result.data) {
      await setTokens({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
    }

    return result;
  } catch (error: unknown) {
    console.error("Google login error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Google login failed. Please try again.");
  }
}

export async function githubLogin(): Promise<ApiResponse<AuthData>> {
  try {
    const response = await api.get<ApiResponse<AuthData>>("/users/github");

    const result = response.data;

    if (result.success && result.data) {
      await setTokens({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
    }

    return result;
  } catch (error: unknown) {
    console.error("Github login error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Github login failed. Please try again.");
  }
}

export async function verifyEmail(token: string): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>(
      `/users/verify-email/${token}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Email verification error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Email verification failed. Please try again.");
  }
}

export async function logout(): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>("/users/logout");

    // Clear tokens regardless of API response
    await clearTokens();

    return response.data;
  } catch (error: unknown) {
    console.error("Logout error:", error);

    // Always clear tokens on logout attempt
    await clearTokens();

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Logout failed. Please try again.");
  }
}

export async function forgotPassword(email: string): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Forgot password error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Forgot password failed. Please try again.");
  }
}

export async function resetPassword(
  token: string,
  password: string
): Promise<ApiResponse> {
  try {
    const response = await api.post<ApiResponse>(
      `/users/reset-password/${token}`,
      {
        newPassword: password,
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Reset password error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Reset password failed. Please try again.");
  }
}

export async function getUser(): Promise<ApiResponse<User>> {
  try {
    const response = await api.get<ApiResponse<User>>("/users/current-user");
    return response.data;
  } catch (error: unknown) {
    console.error("Get user error:", error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      return createErrorResponse(error.response.data.message);
    }

    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }

    return createErrorResponse("Get user failed. Please try again.");
  }
}
