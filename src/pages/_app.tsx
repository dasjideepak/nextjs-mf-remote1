import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AppErrorBoundary } from "@dasjideepak/mf-shared-ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppErrorBoundary>
      <Component {...pageProps} />
    </AppErrorBoundary>
  );
}
