import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_EXPIRY,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_EXPIRY,
} from "./constants";

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export async function getTokens(): Promise<TokenData | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("mini_access_token")?.value;
    const refreshToken = cookieStore.get("mini_refresh_token")?.value;

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return null;
  } catch (error) {
    console.error("Error getting tokens:", error);
    return null;
  }
}

export async function setTokens(tokens: TokenData): Promise<void> {
  try {
    const cookieStore = await cookies();

    cookieStore.set("mini_access_token", tokens.accessToken, {
      ...COOKIE_OPTIONS,
      expires: ACCESS_TOKEN_EXPIRY,
    });

    cookieStore.set("mini_refresh_token", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: REFRESH_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.error("Error setting tokens:", error);
  }
}

export async function clearTokens(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("mini_access_token");
    cookieStore.delete("mini_refresh_token");
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("mini_access_token")?.value;
    return !!accessToken;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
