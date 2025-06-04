"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import { useGetStoreByStoreIdQuery } from "@/redux/features/stores/storesApi";
import Loader from "@/app/components/Loader/Loader";
import { IStore } from "@/app/@types/store";

// Define clear interfaces with descriptive names
interface StoreUser {
  _id: string;
  name?: string;
  email?: string;
}

export interface StoreContextType {
  storeId: string | null;
  store: IStore | null;
  isLoading: boolean;
  isError: boolean;
  isExpired: boolean;
  expiryDate: Date | null;
  daysUntilExpiry: number | null;
  refreshStoreData: () => void;
}

interface StoreProtectedProps {
  children: React.ReactNode;
}

// Create a descriptive, properly-typed context
export const StoreContext = createContext<StoreContextType>({
  storeId: null,
  store: null,
  isLoading: false,
  isError: false,
  isExpired: false,
  expiryDate: null,
  daysUntilExpiry: null,
  refreshStoreData: () => {},
});
function calculateDaysUntilExpiry(expiryDate: Date | null): number | null {
  if (!expiryDate) return null;

  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
// Custom hook with clear error message
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProtected component");
  }
  return context;
};

/**
 * Extracts store ID from URL pathname
 */
const extractStoreIdFromPath = (pathname: string): string | null => {
  const storePattern = /\/(?:[^\/]+)\/store(?:s)?\/([^\/]+)/;
  const match = pathname.match(storePattern);
  return match && match[1] ? match[1] : null;
};

/**
 * Store access protection component
 * Ensures users have proper access to the current store
 */
const StoreProtected = ({ children }: StoreProtectedProps) => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  // Derive storeId from path
  const storeId = pathname ? extractStoreIdFromPath(pathname) : null;

  // Type-safe Redux selector
  const { user } = useSelector(
    (state: { auth: { user: StoreUser } }) => state.auth
  );

  // Query hook with clean props
  const {
    data: storeData,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetStoreByStoreIdQuery(
    { storeId: storeId || "" },
    {
      skip: !storeId || !user,
      refetchOnMountOrArgChange: true,
    }
  );

  // Extract store with proper typing
  const store: IStore = storeData?.data;

  // Calculate permissions once
  const isOwner = store && user ? store.owner === user._id : false;
  const isStaff =
    store && user && Array.isArray(store.staff)
      ? store.staff.some((staffId) => staffId === user._id)
      : false;

  // Store ID persistence
  useEffect(() => {
    if (storeId && typeof window !== "undefined") {
      localStorage.setItem("storeId", storeId);
    }
  }, [storeId]);

  // Authentication and authorization checks
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to access this page.");
      return router.push(`/${locale}/login`);
    }

    if (isLoading || !storeId) return;

    if (error) {
      const errorMessage =
        error && "data" in error
          ? (error as { data: { message: string } })?.data?.message
          : "Unable to access store information";

      toast.error(errorMessage);
      return router.push(`/${locale}/create-store`);
    }

    if (!store) {
      toast.error("Store not found or you do not have access to this store.");
      return router.push(`/${locale}/create-store`);
    }

    if (!isOwner && !isStaff) {
      toast.error("You do not have permission to access this store.");
      return router.push(`/${locale}/create-store`);
    }
  }, [
    user,
    store,
    storeId,
    error,
    isLoading,
    router,
    locale,
    isOwner,
    isStaff,
  ]);

  // Show consistent loading state
  if (isLoading) {
    return <Loader />;
  }
  // Calculate expiration status
  const expiryDate = store?.expiredAt ? new Date(store.expiredAt) : null;
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate);
  const isExpired = !!store?.status && store.status === "expired";

  // Provide context value
  const contextValue: StoreContextType = {
    storeId,
    store,
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

export default StoreProtected;
