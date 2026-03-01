import { useEffect, useState } from "react";
import { useRouter } from "next/compat/router";
import { useSharedGlobalState } from "@/state/globalState";
import { useUsers } from "@/hooks/useUsers";
import type { DashboardSharedState } from "@/types/hostGlobalState";
import { Bell, Grid2x2, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  OverviewPage,
  UsersPage,
  NotificationsPage,
  ProfilePage,
} from "@/components/pages";

interface DashboardShellProps {
  sharedState?: DashboardSharedState;
}

const BASE_PATH = "/dashboard";

const NAV_ITEMS = [
  { segment: "" as const, label: "Overview", icon: "grid" },
  { segment: "users" as const, label: "Users", icon: "users" },
  { segment: "notifications" as const, label: "Notifications", icon: "bell" },
  { segment: "profile" as const, label: "Profile", icon: "user" },
] as const;

type RouteSegment = (typeof NAV_ITEMS)[number]["segment"];
type NavIconName = (typeof NAV_ITEMS)[number]["icon"];

const NAV_ICONS: Record<NavIconName, LucideIcon> = {
  grid: Grid2x2,
  users: Users,
  bell: Bell,
  user: User,
};

function getSegmentFromPath(pathname: string): string {
  if (!pathname.startsWith(BASE_PATH)) return "";
  const remainder = pathname.slice(BASE_PATH.length).replace(/^\/+/, "");
  return remainder.split("/")[0] ?? "";
}

function NavIcon({ icon }: { icon: NavIconName }) {
  const Icon = NAV_ICONS[icon];
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

export default function DashboardShell({ sharedState }: DashboardShellProps) {
  const router = useRouter();
  const { state, isLoading } = useSharedGlobalState();
  const resolvedState: DashboardSharedState | undefined = sharedState ?? state;
  const [fallbackPathname, setFallbackPathname] = useState("");
  const routeSegment = getSegmentFromPath(
    router ? (router.asPath ?? "").split(/[?#]/)[0] ?? "" : fallbackPathname
  );
  const { users, loading: usersLoading } = useUsers(15);

  useEffect(() => {
    if (router) return;
    if (typeof window === "undefined") return;

    const sync = () => setFallbackPathname(window.location.pathname);
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [router]);

  const navigate = (segment: RouteSegment) => {
    const path = segment ? `${BASE_PATH}/${segment}` : BASE_PATH;
    if (router) {
      void router.push(path);
      return;
    }
    if (typeof window === "undefined") return;
    window.history.pushState({}, "", path);
    setFallbackPathname(path);
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
