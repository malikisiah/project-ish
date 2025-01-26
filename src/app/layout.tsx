import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "~/components/NavBar";

export const metadata: Metadata = {
  title: "Project-Ish",
  description: "project-ish",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-base-300`}
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
