import { useEffect, useState } from "react";
import { useSharedGlobalState } from "@/state/globalState";
import { useUsers } from "@/hooks/useUsers";
import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";
import {
  OverviewPage,
  UsersPage,
  NotificationsPage,
  SettingsPage,
  ProfilePage,
} from "@/components/pages";

interface DashboardShellProps {
  sharedState?: SharedDashboardState;
}

const BASE_PATH = "/dashboard";

const NAV_ITEMS = [
  { segment: "" as const, label: "Overview", icon: "grid" },
  { segment: "users" as const, label: "Users", icon: "users" },
  { segment: "notifications" as const, label: "Notifications", icon: "bell" },
  { segment: "settings" as const, label: "Settings", icon: "settings" },
  { segment: "profile" as const, label: "Profile", icon: "user" },
] as const;

type RouteSegment = (typeof NAV_ITEMS)[number]["segment"];

function getSegmentFromPath(pathname: string): string {
  if (!pathname.startsWith(BASE_PATH)) return "";
  const remainder = pathname.slice(BASE_PATH.length).replace(/^\/+/, "");
  return remainder.split("/")[0] ?? "";
}

function NavIcon({ icon }: { icon: string }) {
  const cls = "h-4 w-4";
  if (icon === "grid")
    return (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
        />
      </svg>
    );
  if (icon === "users")
    return (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    );
  if (icon === "bell")
    return (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        />
      </svg>
    );
  if (icon === "settings")
    return (
      <svg
        className={cls}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    );
  return (
    <svg
      className={cls}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

export default function DashboardShell({ sharedState }: DashboardShellProps) {
  const { state, isLoading } = useSharedGlobalState();
  const resolvedState =
    sharedState ?? (state as SharedDashboardState | undefined);
  const [routeSegment, setRouteSegment] = useState<string>("");
  const { users, loading: usersLoading } = useUsers(20);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () =>
      setRouteSegment(getSegmentFromPath(window.location.pathname));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = (segment: RouteSegment) => {
    if (typeof window === "undefined") return;
    const path = segment ? `${BASE_PATH}/${segment}` : BASE_PATH;
    window.history.pushState({}, "", path);
    setRouteSegment(segment);
  };

  if (isLoading && !sharedState) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (!resolvedState) {
    return (
      <div className="rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50 px-6 py-12 text-center">
        <p className="text-sm font-medium text-yellow-800">
          Unable to connect to host global state.
        </p>
      </div>
    );
  }

  const validSegments = NAV_ITEMS.map((i) => i.segment as string);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] gap-6">
      {/* Desktop sidebar */}
      <nav className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-24 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = routeSegment === item.segment;
            return (
              <button
                key={item.segment}
                type="button"
                onClick={() => navigate(item.segment)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <NavIcon icon={item.icon} />
                {item.label}
                {item.segment === "notifications" &&
                  resolvedState.notifications.length > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 text-xs font-semibold text-red-700">
                      {resolvedState.notifications.length}
                    </span>
                  )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content area */}
      <div className="flex-1">
        {/* Mobile tab bar */}
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 lg:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = routeSegment === item.segment;
            return (
              <button
                key={item.segment}
                type="button"
                onClick={() => navigate(item.segment)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Route rendering */}
        {routeSegment === "" && (
          <OverviewPage
            sharedState={resolvedState}
            users={users}
            usersLoading={usersLoading}
          />
        )}
        {routeSegment === "users" && (
          <UsersPage users={users} usersLoading={usersLoading} />
        )}
        {routeSegment === "notifications" && (
          <NotificationsPage sharedState={resolvedState} />
        )}
        {routeSegment === "settings" && (
          <SettingsPage sharedState={resolvedState} />
        )}
        {routeSegment === "profile" && <ProfilePage />}
        {!validSegments.includes(routeSegment) && (
          <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-red-800">
              Unknown route: /dashboard/{routeSegment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
