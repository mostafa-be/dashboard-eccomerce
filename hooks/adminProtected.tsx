"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector(
    (state: { auth: { user: { role: string } } }) => state.auth
  );
  const role = user?.role;
  if (role === "admin") {
    return <>{children}</>;
  } else {
    redirect("/");
     return null
  }
}
