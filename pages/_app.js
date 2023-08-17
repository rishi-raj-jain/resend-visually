import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div
      className={[
        inter.className,
        "w-screen h-screen flex flex-col items-center justify-center",
      ].join(" ")}
    >
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
