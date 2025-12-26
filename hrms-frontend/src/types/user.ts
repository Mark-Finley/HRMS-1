import type { ElementType } from "react";

export type Role = "admin" | "hr" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: ElementType;
  roles: Role[];
}
