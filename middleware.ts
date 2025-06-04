import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

// This creates a middleware that handles internationalization
export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // The default locale to use when a non-locale-prefixed path is visited
  defaultLocale,
  // Always include locale prefix in URLs
  localePrefix: "always",
});

export const config = {
  // Match all pathname except those starting with /api/, /_next/, /static/, or containing a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
