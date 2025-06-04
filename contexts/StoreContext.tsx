"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useGetStoreByStoreIdQuery } from "@/redux/features/stores/storesApi";
import { IStore } from "@/app/@types/store";

/**
 * Store context type definition
 */
interface StoreContextType {
  storeId: string | null;
  storeData: IStore | null;
  isLoading: boolean;
  isError: boolean;
  isExpired: boolean;
  expiryDate: Date | null;
  daysUntilExpiry: number | null;
  refreshStoreData: () => void;
}

// Create context with meaningful default values
const StoreContext = createContext<StoreContextType>({
  storeId: null,
  storeData: null,
  isLoading: false,
  isError: false,
  isExpired: false,
  expiryDate: null,
  daysUntilExpiry: null,
  refreshStoreData: () => {},
});

/**
 * Extract store ID from URL pathname
 */
function extractStoreIdFromPath(pathname: string): string | null {
  const storePattern = /\/(?:[^\/]+)\/store(?:s)?\/([^\/]+)/;
  const match = pathname.match(storePattern);
  return match && match[1] ? match[1] : null;
}

/**
 * Calculate days until expiry
 */
function calculateDaysUntilExpiry(expiryDate: Date | null): number | null {
  if (!expiryDate) return null;

  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Store data provider component
 */
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const pathname = usePathname();
  const [storeId, setStoreId] = useState<string | null>(null);

  // Extract storeId from URL or localStorage
  useEffect(() => {
    // Try to get storeId from URL first
    const urlStoreId = extractStoreIdFromPath(pathname || "");

    // If not in URL, try localStorage
    const localStoreId =
      typeof window !== "undefined" ? localStorage.getItem("storeId") : null;

    // Set storeId with priority to URL
    const id = urlStoreId || localStoreId;
    setStoreId(id);

    // Save to localStorage for persistence if we have an ID
    if (id && typeof window !== "undefined") {
      localStorage.setItem("storeId", id);
    }
  }, [pathname]);

  // Fetch store data using RTK Query
  const { data, isLoading, isError, refetch } = useGetStoreByStoreIdQuery(
    { storeId: storeId || "" },
    { skip: !storeId }
  );

  // Extract store data
  const storeData: IStore | null = data?.data || null;

  // Calculate expiration status
  const expiryDate = storeData?.expiredAt
    ? new Date(storeData.expiredAt)
    : null;
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate);
  const isExpired = !!storeData?.status && storeData.status === "expired";

  // Provide context value
  const contextValue: StoreContextType = {
    storeId,
    storeData,
    isLoading,
    isError,
    isExpired,
    expiryDate,
    daysUntilExpiry,
    refreshStoreData: refetch,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

/**
 * Custom hook to access store context
 */
export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};
