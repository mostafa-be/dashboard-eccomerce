"use client";
import { Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
//import { NextIntlClientProvider } from "next-intl";
//import { getMessages } from "next-intl/server";
import { Providers } from "./provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Custom } from "@/utils/Custom";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const messages = await getMessages();

  return (
    <html lang={"en"} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
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
      </body>
    </html>
  );
}
