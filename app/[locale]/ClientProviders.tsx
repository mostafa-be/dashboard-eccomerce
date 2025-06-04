"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Custom } from "@/utils/Custom";
import { Providers } from "./provider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Custom>{children}</Custom>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </SessionProvider>
    </Providers>
  );
}
