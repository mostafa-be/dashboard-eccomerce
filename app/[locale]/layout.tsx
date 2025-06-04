import { Josefin_Sans, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, localeDirection } from "@/i18n";
import ClientProviders from "./ClientProviders";
import "./globals.css";

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

// Load messages for the specified locale
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Check if locale is supported
  if (!locales.includes(locale)) notFound();

  // Get messages for the locale
  const messages = await getMessages(locale);

  // Determine direction based on locale
  const dir = localeDirection[locale as keyof typeof localeDirection] || "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

        {/* Theme color meta tags for light and dark mode */}
        {/* Note: 'meta[name=theme-color]' is not supported by Firefox, Firefox for Android, Opera. */}
        <meta
          name="theme-color"
          content="#FFFFFF"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111827"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="msapplication-navbutton-color"
          content="var(--theme-color)"
        />
      </head>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
