import { NavBar } from "@/app/components/Dashboard/Layout/NavBar/NavBar";
import { ThemeProvider } from "@/utils/theme-provider";
import "./Dashboard.css";
import SideBarDesktop from "@/app/components/Dashboard/Layout/Sider/SideBarDesktop";
import AdminProtected from "@/hooks/adminProtected";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtected>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="relative flex min-h-dvh flex-col md:flex-row">
          <SideBarDesktop />
          <div className="flex-grow flex flex-col">
            <NavBar />
            <div className="w-full overflow-y-auto px-5 md:px-10 py-10 bg-slate-50 dark:bg-black-200 min-h-dvh transition-all">
              {children}
            </div>
          </div>
        </main>
      </ThemeProvider>
    </AdminProtected>
  );
}
