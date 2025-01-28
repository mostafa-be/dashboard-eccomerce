"use client";
import { Inter } from "next/font/google";
import "./globals.css";
//import { NextIntlClientProvider } from "next-intl";
//import { getMessages } from "next-intl/server";
import { Providers } from "./provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Custom } from "@/utils/Custom";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // const messages = await getMessages();

  return (
    <html lang={"en"} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#872e4e" />
      </head>
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
            <ThemeProvider >
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
