import "@/styles/globals.css";
import type { AppProps } from "next/app";
import QueryProvider from "@/QueryProvider";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <QueryProvider>
        <Component {...pageProps} />;
      </QueryProvider>
    </>
  );
}
