declare module "host/GlobalContext" {
  import { Context } from "react";
  import type { HostGlobalState } from "../types/hostGlobalState";

  const GlobalContext: Context<HostGlobalState | undefined>;
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
