import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This acts as a pass-through layout
  // No HTML or body tags here to avoid duplication
  return  children;
}
