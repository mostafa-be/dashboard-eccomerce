import SideBar from "@/app/components/Dashboard/Layout/SideBar";
import { NavBar } from "@/app/components/Dashboard/Layout/SideBar/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <SideBar />
      <div className="flex-grow ">
        <NavBar />
        <div className="w-full bg-slate-50 min-h-dvh overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
