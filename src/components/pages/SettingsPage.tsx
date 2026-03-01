import { Button, Card } from "@dasjideepak/mf-shared-ui";
import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";

interface SettingsPageProps {
  sharedState: SharedDashboardState;
}

export function SettingsPage({ sharedState }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Customer Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage preferences and shared state from this remote.
        </p>
      </div>

      <Card
        title="Theme Preference"
        subtitle="Toggle between light and dark mode across all apps."
      >
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Current: <strong className="capitalize">{sharedState.theme}</strong>
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={sharedState.toggleTheme}
          >
            Switch to {sharedState.theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </Card>

      <Card
        title="Send Notifications"
        subtitle="Push a notification visible to all remotes."
      >
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() =>
              sharedState.addNotification(
                "Customer updated their profile",
                "info"
              )
            }
          >
            Profile Updated
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              sharedState.addNotification(
                "Order placed successfully",
                "success"
              )
            }
          >
            Order Placed
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              sharedState.addNotification(
                "Failed to save customer preferences",
                "error"
              )
            }
          >
            Save Failed
          </Button>
        </div>
      </Card>
    </div>
  );
}
