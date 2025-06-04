"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "@/app/components/Home/Footer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import CreateStoreForm from "@/app/components/CreateStore/CreatePage";
import StoreLoadingSkeleton from "@/app/components/ui/StoreLoadingSkeleton";

export default function CreateStorePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated before showing the page
  useEffect(() => {
    // Simulate loading state for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Increased time to allow users to see the loading animation

    if (status === "unauthenticated") {
      //router.push(`/${locale}/login`);
    }

    return () => clearTimeout(timer);
  }, [status, router, locale]);

  // Show enhanced loading state
  if (isLoading || status === "loading") {
    return <StoreLoadingSkeleton />;
  }

  return (
    <>
      <div className="min-h-dvh bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {" "}
        <CreateStoreForm />
        <Footer />
      </div>
    </>
  );
}
