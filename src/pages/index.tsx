import dynamic from "next/dynamic";
import { createStandaloneSharedStateFallback } from "@/state/standaloneSharedState";
import { AppErrorBoundary } from "@dasjideepak/mf-shared-ui/AppErrorBoundary";

const DashboardShell = dynamic(() => import("@/components/DashboardShell"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <h1 className="ml-3 text-sm font-semibold text-gray-900">
            Customer App
          </h1>
          <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            standalone
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AppErrorBoundary>
          <DashboardShell sharedState={createStandaloneSharedStateFallback()} />
        </AppErrorBoundary>
      </main>
    </div>
  );
}
