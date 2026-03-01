import { NotificationCenter, SectionHeader } from "@dasjideepak/mf-shared-ui";
import type { DashboardSharedState } from "@/types/hostGlobalState";

interface NotificationsPageProps {
  sharedState: DashboardSharedState;
}

export function NotificationsPage({ sharedState }: NotificationsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Notifications"
          description="Shared across all remotes via host global state."
        />
      </div>
      <NotificationCenter
        state={sharedState}
        actions={[
          {
            label: "+ Success",
            message: "Order #1234 has been shipped",
            type: "success",
          },
          {
            label: "+ Info",
            message: "New user registered on the platform",
            type: "info",
            variant: "secondary",
          },
          {
            label: "+ Error",
            message: "Payment failed for invoice #5678",
            type: "error",
            variant: "danger",
          },
        ]}
        emptyMessage="No notifications yet. Add one from any remote to see it appear here."
      />
    </div>
  );
}
