// utils/constants.ts

export const USER_ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
} as const;

export type UserRole = keyof typeof USER_ROLES; // "ADMIN" | "STAFF" | "USER"
