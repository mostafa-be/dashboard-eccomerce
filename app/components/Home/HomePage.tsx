import {
  ArrowRight,
  BarChart3,
  Loader2,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
import React, { Suspense } from "react";
import Description from "./Description";
import Link from "next/link";
import { Button } from "../ui/button";
import Footer from "./Footer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { interpolateComponents } from "@/utils/translation-helpers";

const HomePage = () => {
  const t = useTranslations();
  const locale = useLocale();

  // Create the link components for legal text with explicit keys
  const legalComponents = {
    terms: (
      <a href="#" key="terms" className="text-blue-600 hover:underline">
        {t("common.termsOfService")}
      </a>
    ),
    privacy: (
      <a href="#" key="privacy" className="text-blue-600 hover:underline">
        {t("common.privacyPolicy")}
      </a>
    ),
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Left side - Marketing description */}
        <section className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 h-auto lg:h-[calc(100vh-3rem)] flex items-center justify-center mb-8 lg:mb-0 overflow-hidden rounded-2xl shadow-lg">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            }
          >
            <Description />
          </Suspense>
        </section>

        {/* Right side - Authentication options */}
        <section className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex flex-col justify-center h-auto">
          <div className="w-full px-5 py-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl transition-all border border-gray-100 dark:border-gray-800">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl" />
                  <div className="relative z-10 text-white font-bold text-xl">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Nextora<span className="text-blue-600">.</span>
                </h1>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("home.welcome")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t("home.subtitle")}
              </p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-4">
              <Link href={`/${locale}/login`} className="block w-full">
                <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center">
                  <span>{t("home.login")}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href={`/${locale}/register`} className="block w-full">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                >
                  {t("home.createAccount")}
                </Button>
              </Link>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-8">
              <div className="absolute border-t border-gray-300 dark:border-gray-700 w-full"></div>
              <span className="relative bg-white dark:bg-gray-900 px-4 text-sm text-gray-500 dark:text-gray-400">
                {t("home.whyChoose")}
              </span>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("home.features.easySetup.title")}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t("home.features.easySetup.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("home.features.analytics.title")}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t("home.features.analytics.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("home.features.customerManagement.title")}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t("home.features.customerManagement.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal links - Fixed implementation with improved interpolation */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p dir={locale === "ar" ? "rtl" : "ltr"}>
              {/*interpolateComponents(t("home.legal"), legalComponents)*/}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
