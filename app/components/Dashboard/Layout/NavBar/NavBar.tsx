"use client";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import Separative from "./Separative";
import Searcher from "./Searcher";
import { AlignLeft} from "lucide-react";
import { useState } from "react";
import SideBarMobile from "../Sider/SideBarMobile";

import InfoUser from "./InfoUser";
import Notifications from "./Notifications";
import Languages from "./Languages";

export const NavBar = ({}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full z-40 sticky top-0  px-10 h-[60px] flex items-center  justify-between bg-white dark:bg-black-100 transition-all duration-300 ease-linear ">
        <div className="flex items-center max-md:gap-4 justify-center ">
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
          <Notifications />
          <Languages/>
          <Separative />
          <InfoUser />
        </div>
      </header>
      <SideBarMobile isOpen={isOpen} setIsOpen={setIsopen} />
    </>
  );
};
