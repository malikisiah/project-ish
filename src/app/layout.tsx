import "~/styles/globals.css";
import { JetBrains_Mono } from "next/font/google";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "~/components/ui/NavBar";

export const metadata: Metadata = {
  title: "Project-Ish",
  description: "project-ish",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = JetBrains_Mono();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${font.className} bg-base-300`}
      data-theme="lofi"
    >
      <body>
        <TRPCReactProvider>
          <NavBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
