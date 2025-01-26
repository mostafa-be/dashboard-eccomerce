import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React from "react";

export const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useLoadUserQuery({});
    return (
      <>{isLoading ? <h5 className="text-center">gg</h5> : <>{children}</>}</>
    );
  };
  