import { ChevronDown, ChevronLeft, Dot } from "lucide-react";
import Link from "next/link";
import React, { createContext, JSX, useContext, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
};
const SidebarMobileContext = createContext({ isOpen: false });
const SideBarMobile = ({ isOpen, setIsOpen }: Props) => {
  return (
    <aside
      className={` fixed top-0 left-0 md:hidden h-dvh bg-white dark:bg-black-100 z-30 shadow ${
        isOpen ? "w-72" : "w-0"
      } transition-all duration-300 transform ease-in-out`}
    >
      <div className={`${isOpen ? "w-full" : "hidden"}`}>
        <div className="w-full flex items-center justify-center my-5">
          <h5 className="text-2xl text-center font-serif font-bold italic text-blue-650">
            {isOpen ? "Nextora" : ""}
          </h5>
          <button
            type="button"
            className=" absolute  -right-5 overflow-hidden w-10 h-10 bg-blue-650 p-1.5 rounded-full flex items-center justify-center"
            title="Toggle Sidebar"
          >
            <ChevronLeft
              onClick={() => setIsOpen(!isOpen)}
              className={` text-white hover:scale-105 ${
                isOpen ? " rotate-180" : "rotate-0"
              } transition-all transform ease-in-out `}
            />
          </button>
        </div>
        <nav
          className={`flex h-[cal(100dvh-300px)] flex-col items-center justify-center mt-2  ${
            isOpen ? "px-5" : "px-2"
          } transition-all transform ease-in-out `}
        >
          <SidebarMobileContext.Provider value={{ isOpen }}>
            <ul
              className={`w-full flex-1 flex flex-col items-center justify-center gap-2 `}
            ></ul>
          </SidebarMobileContext.Provider>
        </nav>
      </div>
    </aside>
  );
};

type PropsItemMobile = {
  icon: JSX.Element;
  text: string;
  active: boolean;
  alert: boolean;
  links: boolean;
  url?: string;
  groupLinks?: { url: string; text: string; active: boolean }[];
};
const SideBarItem = ({
  icon,
  text,
  active,
  alert,
  links,
  groupLinks,
  url,
}: PropsItemMobile) => {
  const { isOpen } = useContext(SidebarMobileContext) as { isOpen: boolean };
  const [openLinks, setOpenLinks] = useState("");
  const openSlideLinks = (text: string) => {
    if (openLinks === text) {
      setOpenLinks("");
    } else {
      setOpenLinks(text);
    }
  };
  return (
    <>
      {links ? (
        <>
          <li
            className={`
              relative p-3 font-medium rounded-lg cursor-pointer transition-all group
              ${
                active
                  ? "bg-blue-650 text-white"
                  : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700/90 dark:text-white/80"
              }
                      ${isOpen ? "w-52" : ""}
              `}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                {icon}
                <span
                  className={`overflow-hidden  ${isOpen ? "ml-3" : "hidden"}`}
                >
                  {text}
                </span>
              </div>
              {isOpen && (
                <ChevronDown
                  onClick={() => openSlideLinks(text)}
                  className={`${
                    openLinks === text
                      ? "rotate-180 transition-all"
                      : "rotate-0 transition-all"
                  }`}
                />
              )}
            </div>
            {alert && (
              <div
                className={` absolute right-2 w-2 h-2 rounded bg-red-400 ${
                  isOpen ? "" : "top-2"
                }`}
              />
            )}
            {!isOpen && (
              <div
                className={`hidden group-hover:flex flex-col absolute w-24 left-20 top-1/2 -translate-y-1/2 bg-blue-650 text-white px-4 py-5 gap-y-1.5 rounded-lg shadow`}
              >
                {groupLinks &&
                  groupLinks.map(
                    (link: { url: string; text: string }, index: number) => {
                      return (
                        <Link key={index} href={`/${url}`}>
                          {text}
                        </Link>
                      );
                    }
                  )}
              </div>
            )}
            {!isOpen && (
              <div
                className=" hidden group-hover:block absolute left-[74px] top-1/2 -translate-y-1/2 w-0 h-0 
                              border-t-[5px] border-t-transparent
                              border-r-[7px] border-r-blue-650
                              border-b-[5px] border-b-transparent"
              />
            )}
          </li>
          {isOpen && (
            <ul
              className={`w-full grid gap-2 list-disc px-3 text-gray-700 dark:text-white transition-all origin-top ease-in-out transform ${
                openLinks === text
                  ? "bg-slate-50 dark:bg-black-200 rounded py-2 flex-1  h-max"
                  : "h-0"
              }`}
            >
              {groupLinks &&
                groupLinks.map(
                  (
                    item: { url: string; text: string; active: boolean },
                    index: number
                  ) => {
                    return (
                      <li
                        key={index}
                        className={`
                  relative flex items-center  px-1.5 my-1 font-medium rounded-md cursor-pointer transition-colors 
                  ${
                    item.active
                      ? " text-blue-650"
                      : "hover:text-blue-650 dark:hover:text-blue-700/90 text-gray-800 dark:text-white/70"
                  }
                  ${openLinks === text ? "block" : " hidden"}
                  `}
                      >
                        <Dot size={20} />
                        <Link href={`/${item.url}`}>{item.text}</Link>
                      </li>
                    );
                  }
                )}
            </ul>
          )}
        </>
      ) : (
        <li
          className={`
              relative font-medium rounded-lg cursor-pointer transition-all group
              ${
                active
                  ? "bg-blue-650 text-white"
                  : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700/90 dark:text-white/80"
              }
                      ${isOpen ? "w-52" : ""}
              `}
        >
          <Link className="w-full flex items-center py-3 px-3" href={`/${url}`}>
            {icon}
            <span
              className={`overflow-hidden  ${isOpen ? "w-48 ml-3" : " hidden"}`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={` absolute right-2 w-2 h-2 rounded bg-red-400 ${
                  isOpen ? "" : "top-2"
                }`}
              />
            )}
            {!isOpen && (
              <div
                className={`hidden group-hover:flex flex-col absolute left-20 bg-blue-650 text-white p-3 rounded-lg shadow`}
              >
                {text}
              </div>
            )}
            {!isOpen && (
              <div
                className=" hidden group-hover:block absolute left-[74px] top-1/2 -translate-y-1/2 w-0 h-0 
                              border-t-[5px] border-t-transparent
                              border-r-[7px] border-r-blue-650
                              border-b-[5px] border-b-transparent"
              />
            )}
          </Link>
        </li>
      )}
    </>
  );
};
export default SideBarMobile;
