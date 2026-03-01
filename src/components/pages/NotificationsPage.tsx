import { Button, Card, Badge, NOTIF_COLORS } from "@dasjideepak/mf-shared-ui";
import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";

interface NotificationsPageProps {
  sharedState: SharedDashboardState;
}

export function NotificationsPage({ sharedState }: NotificationsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Shared across all remotes via host global state.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              sharedState.addNotification(
                "Order #1234 has been shipped",
                "success"
              )
            }
          >
            + Success
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              sharedState.addNotification(
                "New user registered on the platform",
                "info"
              )
            }
          >
            + Info
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              sharedState.addNotification(
                "Payment failed for invoice #5678",
                "error"
              )
            }
          >
            + Error
          </Button>
        </div>
      </div>

      {sharedState.notifications.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={sharedState.clearNotifications}
          >
            Clear all
          </Button>
        </div>
      )}

      {sharedState.notifications.length === 0 ? (
        <Card>
          <p className="py-6 text-center text-sm text-gray-400">
            No notifications yet. Add one from any remote to see it appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {sharedState.notifications.map((n) => {
            const color = NOTIF_COLORS[n.type];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-lg border ${color.border} ${color.bg} p-4`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={color.badge}>{n.type}</Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(n.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-800">{n.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => sharedState.dismissNotification(n.id)}
                  className="shrink-0 rounded p-1 text-gray-400 transition hover:bg-white/60 hover:text-gray-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
