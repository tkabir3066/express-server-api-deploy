export const UserRoles = {
  admin: "admin",
  user: "user",
  agent: "agent",
} as const;

export type Roles = "admin" | "agent" | "user";
