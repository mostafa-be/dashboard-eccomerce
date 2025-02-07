"use client";
import Image from "next/image";
import defaultProfile from "../../../../../public/icons_svg/profile.svg";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import Separative from "./Separative";
import Searcher from "./Searcher";
import Beller from "./Beller";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import SideBarMobile from "./SideBarMobile";

export const NavBar = ({}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  return (
    <>
      <header className="w-full z-20 sticky top-0  px-10 h-[60px] flex items-center justify-between bg-white dark:bg-black-100 ">
        <div className="flex items-center justify-center ">
          <AlignLeft
            size={20}
            className="md:hidden text-gray-700/90 dark:text-white"
            onClick={() => setIsopen(!isOpen)}
          />
          <Searcher />
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Separative />
          <Beller />
          <Separative />
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-10 lg:w-12 lg:h-12 select-none bg-slate-100/70 dark:bg-white/90 dark:text-white rounded-full overflow-hidden">
              <Image
                src={defaultProfile}
                width={500}
                height={500}
                alt="default profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col items-center gap-1">
              <p className="text-sm font-semibold text-black dark:text-white/90">
                Jon Dialot
              </p>
              <span className="text-sm text-gray-700/90 dark:text-white/90 capitalize ">
                admin
              </span>
            </div>
          </div>
        </div>
      </header>
      <SideBarMobile isOpen={isOpen} setIsOpen={setIsopen} />
    </>
  );
};
