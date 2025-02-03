import { NavBar } from "@/app/components/Dashboard/Layout/Sider/NavBar";
import { ThemeProvider } from "@/utils/theme-provider";
import "./Dashboard.css";
import SideBarDesktop from "@/app/components/Dashboard/Layout/Sider/SideBarDesktop";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="relative flex h-dvh flex-col md:flex-row md:overflow-hidden">
        <SideBarDesktop />
        <div className="flex-grow ">
          <NavBar />
          <div className="w-full px-5 md:px-10 py-10 bg-slate-50 dark:bg-black-200 min-h-dvh overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
