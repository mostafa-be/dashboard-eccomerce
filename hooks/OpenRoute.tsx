"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function OpenRoute({ children }: ProtectedProps) {
  const { user } = useSelector(
    (state: {
      auth: {
        user: {
          role: string;
          ownedStores?: Array<any>;
          staffStores?: Array<any>;
          primaryStore?: any;
        };
      };
    }) => state.auth
  );

  // If no user is logged in, show the children (login/register pages)
  if (!user) {
    return <>{children}</>;
  }

  const role = user?.role;
  const hasStores = Boolean(
    (user?.ownedStores && user.ownedStores.length > 0) ||
      (user?.staffStores && user.staffStores.length > 0) ||
      user?.primaryStore
  );

  // If user is logged in but has no stores, redirect to create store
  if (user && !hasStores) {
    return redirect("/en/create-store");
  }

  // If user is admin, redirect to dashboard
  if (role === "admin") {
    return redirect("/en/dashboard");
  }

  // Otherwise, show the children
  return <>{children}</>;
}
