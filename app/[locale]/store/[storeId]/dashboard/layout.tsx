import { NavBar } from "@/app/components/Dashboard/Layout/NavBar/NavBar";
import { ThemeProvider } from "@/utils/theme-provider";
import "./Dashboard.css";
import SideBarDesktop from "@/app/components/Dashboard/Layout/Sider/SideBarDesktop";
import StoreProtected from "@/hooks/storeProtected";
import ExpiredProtected from "@/hooks/ExpiredProtected";
//import StoreProtected from "@/hooks/storeProtected";
//import StoreProtected from "@/hooks/storeProtected";
//import AdminProtected from "@/hooks/adminProtected";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StoreProtected>
        <main className="relative flex min-h-dvh flex-col md:flex-row">
          <SideBarDesktop />
          <div className="flex-grow flex flex-col">
            <NavBar />
            <div className="w-full overflow-y-auto px-5 md:px-10 py-10 bg-slate-50 dark:bg-black-200 min-h-dvh transition-all">
              <ExpiredProtected> {children}</ExpiredProtected>
            </div>
          </div>
        </main>
      </StoreProtected>
    </ThemeProvider>
  );
}
