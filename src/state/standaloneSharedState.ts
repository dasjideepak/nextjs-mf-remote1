import type { DashboardSharedState } from "@/types/hostGlobalState";

const noop = () => {};

export function createStandaloneSharedStateFallback(): DashboardSharedState {
  return {
    notifications: [],
    addNotification: noop,
    dismissNotification: noop,
    clearNotifications: noop,
  };
}
