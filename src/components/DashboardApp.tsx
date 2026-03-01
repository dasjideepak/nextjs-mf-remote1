import { useSharedGlobalState } from "@/state/globalState";

interface DashboardAppProps {
  sharedState?: {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  };
}

export default function DashboardApp({ sharedState }: DashboardAppProps) {
  const { isLoading, state } = useSharedGlobalState();
  const resolvedState = sharedState ?? state;

  if (isLoading && !sharedState) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 opacity-75 shadow-sm">
        <p className="m-0 text-gray-400">Loading Remote1&hellip;</p>
      </div>
    );
  }

  if (!resolvedState) {
    return (
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-6 text-yellow-800">
        <h2 className="m-0 text-lg font-semibold text-gray-900">Remote1</h2>
        <p className="mb-0 mt-2 text-sm">
          Global context is not available. This component must be rendered
          inside the Host shell to access shared state.
        </p>
      </div>
    );
  }

  const { count, increment, decrement } = resolvedState;

  return (
    <div className="m-4 rounded-xl border-2 border-blue-600 bg-white p-6">
      <h2 className="mb-3 mt-0 text-lg font-semibold text-gray-900">
        Remote1 &mdash; Dashboard
      </h2>

      <p className="mb-4 mt-2 text-3xl font-bold text-gray-800">
        Count: {count}
      </p>

      <div className="flex gap-3">
        <button
          onClick={decrement}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
        >
          &minus; Decrement
        </button>
        <button
          onClick={increment}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 active:scale-95"
        >
          + Increment
        </button>
      </div>
    </div>
  );
}
