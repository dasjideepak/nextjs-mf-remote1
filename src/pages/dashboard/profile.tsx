import dynamic from "next/dynamic";
import { createStandaloneSharedStateFallback } from "@/state/standaloneSharedState";

const DashboardShell = dynamic(() => import("@/components/DashboardShell"), {
  ssr: false,
});

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <DashboardShell sharedState={createStandaloneSharedStateFallback()} />
    </main>
  );
}
