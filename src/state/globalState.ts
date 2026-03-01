import React, { createContext, useContext, useEffect, useState } from "react";

export interface GlobalState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (value: number) => void;
}

export type GlobalStateContext = React.Context<GlobalState | undefined>;

const FallbackGlobalStateContext: GlobalStateContext = createContext<
  GlobalState | undefined
>(undefined);

let hostContextPromise: Promise<GlobalStateContext | null> | null = null;

async function loadHostContext(): Promise<GlobalStateContext | null> {
  if (typeof window === "undefined") return null;

  try {
    const mod = await import(
      "host/GlobalContext"
    );

    return (mod as { default?: GlobalStateContext })?.default ?? null;
  } catch {
    return null;
  }
}

function getHostContext() {
  if (!hostContextPromise) {
    hostContextPromise = loadHostContext();
  }

  return hostContextPromise;
}

export interface UseSharedGlobalStateResult {
  isLoading: boolean;
  state: GlobalState | undefined;
}

export function useSharedGlobalState(): UseSharedGlobalStateResult {
  const [resolvedContext, setResolvedContext] = useState<GlobalStateContext>(
    FallbackGlobalStateContext
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getHostContext()
      .then((context) => {
        if (!isMounted || !context) return;
        setResolvedContext(() => context);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, state: useContext(resolvedContext) };
}
