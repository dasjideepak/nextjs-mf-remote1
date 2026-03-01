declare module "host/GlobalContext" {
  import { Context } from "react";

  interface GlobalState {
    count: number;
    increment: () => void;
    decrement: () => void;
    setCount: (value: number) => void;
  }

  const GlobalContext: Context<GlobalState | undefined>;
  export default GlobalContext;
}
