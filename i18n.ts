import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Update supported locales
export const locales = ["en", "fr", "ar", "de", "it", "es"];
export const defaultLocale = "en";

// Define text direction for each locale
export const localeDirection = {
  en: "ltr",
  fr: "ltr",
  de: "ltr",
  es: "ltr",
  it: "ltr",
  ar: "rtl",
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) return notFound();

  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
