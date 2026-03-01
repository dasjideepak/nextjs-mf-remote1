import dynamic from "next/dynamic";

const DashboardShell = dynamic(() => import("@/components/DashboardShell"), { ssr: false });

const fallback = {
  theme: "light" as const,
  toggleTheme: () => {},
  notifications: [],
  addNotification: () => {},
  dismissNotification: () => {},
  clearNotifications: () => {},
};

export default function DashboardPage() {
  return (<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><DashboardShell sharedState={fallback} /></main>);
}
