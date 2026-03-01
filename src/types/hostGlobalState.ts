import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";

export type UserRole = "customer" | "admin";
export type DashboardSharedState = Omit<
  SharedDashboardState,
  "theme" | "toggleTheme"
>;

export interface HostAuthUser {
  id: string;
  name: string;
  role: UserRole;
}

export interface HostGlobalState extends DashboardSharedState {
  isHydrated: boolean;
  isAuthenticated: boolean;
  user: HostAuthUser | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}
