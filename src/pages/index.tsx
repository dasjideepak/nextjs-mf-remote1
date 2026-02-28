import DashboardApp from "@/components/DashboardApp";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <DashboardApp />
    </ErrorBoundary>
  );
}
