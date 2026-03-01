declare module "host/GlobalContext" {
  import { Context } from "react";

  type NotificationType = "info" | "success" | "warning" | "error";

  interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    timestamp: number;
  }

  interface GlobalState {
    isHydrated: boolean;
    isAuthenticated: boolean;
    user: { id: string; name: string; role: "customer" | "admin" } | null;
    loginAs: (role: "customer" | "admin") => void;
    logout: () => void;
    theme: "light" | "dark";
    toggleTheme: () => void;
    notifications: Notification[];
    addNotification: (message: string, type: NotificationType) => void;
    dismissNotification: (id: string) => void;
    clearNotifications: () => void;
  }

  const GlobalContext: Context<GlobalState | undefined>;
  export default GlobalContext;
}

declare module "host/ui" {
  import type { ButtonHTMLAttributes, ComponentType, HTMLAttributes, PropsWithChildren, ReactNode } from "react";

  export const Button: ComponentType<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: "primary" | "secondary" | "danger" | "ghost";
      size?: "sm" | "md" | "lg";
    }
  >;

  export const Table: ComponentType<{
    columns: Array<{
      key: string;
      header: string;
      render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
    }>;
    rows: Record<string, unknown>[];
    emptyMessage?: string;
    loading?: boolean;
  }>;

  export const Card: ComponentType<
    HTMLAttributes<HTMLDivElement> & {
      title?: string;
      subtitle?: string;
    }
  >;

  export const Badge: ComponentType<
    PropsWithChildren<{
      variant?: "green" | "blue" | "yellow" | "red" | "gray";
    }>
  >;
}
