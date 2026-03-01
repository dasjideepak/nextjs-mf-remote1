import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";

const DashboardApp = dynamic(() => import("@/components/DashboardApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <ErrorBoundary>
        <h2 className="text-lg font-semibold text-gray-900">Remote1</h2>
        <DashboardApp />
      </ErrorBoundary>
    </div>
  );
}
