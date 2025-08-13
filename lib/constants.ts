export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 seconds
  retries: 2,
  retryDelay: 1000, // 1 second
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
} as const;

export const ACCESS_TOKEN_EXPIRY = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

export const REFRESH_TOKEN_EXPIRY = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000
); // 7 days

export const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
