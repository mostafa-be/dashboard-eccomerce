"use client";

import React, {  useContext } from "react";
//import { useRouter } from "next/navigation";
//import { useLocale } from "next-intl";
import Loader from "@/app/components/Loader/Loader";
import { StoreContext} from "./storeProtected";

// Define a clear and descriptive interface

// Create a well-typed context with default value


/**
 * Custom hook to access store context
 */
export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
 // console.log("Store context accessed:", context);
  return context;
};

/**
 * Get the subscription status from store data
 */

interface ExpiredProtectedProps {
  children: React.ReactNode;
}

/**
 * ExpiredProtected Component
 * Checks if a store subscription is active and restricts access if expired
 */
const ExpiredProtected: React.FC<ExpiredProtectedProps> = ({ children }) => {
  //const router = useRouter();
  //const locale = useLocale();
  console.log("ExpiredProtected component rendered");
  const {
    storeId,
    store,
    isLoading,
    isError,
    isExpired,
    expiryDate,
    daysUntilExpiry,
    // refreshStoreData,
  } = useStoreContext();
  console.log("Store context:", { storeId, store, isLoading, isError, isExpired, expiryDate, daysUntilExpiry });

  // Show loading UI while checking store status
  if (isLoading) {
    return <Loader />;
  }

  // If we've passed all checks and nothing has redirected, render children
  return <>{children}</>;
};

export default ExpiredProtected;
