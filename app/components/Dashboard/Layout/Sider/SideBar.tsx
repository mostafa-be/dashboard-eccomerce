"use client";
import React, { createContext, useState, useContext, JSX } from "react";
import { ChevronDown, ChevronLeft, Dot } from "lucide-react";

import Link from "next/link";

export const SidebarContext = createContext({ expanded: false });
type PropsSidebar = {
  expanded: boolean;
  setExpanded: (open: boolean) => void;
  children: React.ReactNode;
};
// Side bar
export const SideBar = ({ expanded, setExpanded, children }: PropsSidebar) => {
  return (
    <aside
      className={` hidden z-50 md:block h-dvh  bg-white dark:bg-black-100 ${
        expanded ? "w-64 " : "w-20 max-md:hidden"
      } transition-all transform ease-in-out duration-500 origin-left sticky top-0 left-0  `}
    >
      <div className="w-full bg-transparent">
        <div className="w-full flex items-center justify-center my-5">
          <h5 className="text-2xl text-center font-serif font-bold italic text-blue-650">
            {expanded ? "Nextora" : "N"}
          </h5>
          <button
            type="button"
            className=" absolute  -right-5  z-50 overflow-hidden w-10 h-10 bg-blue-650 p-1.5 rounded-full flex items-center justify-center"
            title="Toggle Sidebar"
          >
            <ChevronLeft
              onClick={() => setExpanded(!expanded)}
              className={` text-white hover:scale-105 ${
                expanded ? " rotate-180" : "rotate-0"
              } transition-all transform ease-in-out `}
            />
          </button>
        </div>
        <div className="">
          <nav
            className={`w-full h-[85vh]  bg-transparent layout-scroll mt-2 ${
              expanded ? "px-5 overflow-y-auto " : "px-2"
            } transition-all transform ease-in-out duration-300 `}
          >
            <SidebarContext.Provider value={{ expanded }}>
              <ul
                className={`w-full flex-1 flex flex-col items-center justify-center gap-2 `}
              >
                {children}
              </ul>
            </SidebarContext.Provider>
          </nav>
        </div>
      </div>
    </aside>
  );
};

type Props = {
  icon: JSX.Element;
  text: string;
  active: boolean;
  alert: boolean;
  links: boolean;
  url?: string;
  groupLinks?: { url: string; text: string; active: boolean }[];
};

// Side Bar Item
export const SideBarItem = ({
  icon,
  text,
  active,
  alert,
  links,
  groupLinks,
  url,
}: Props) => {
  const { expanded } = useContext(SidebarContext) as { expanded: boolean };
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
                : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700/75 dark:text-white/80"
            }
                    ${expanded ? "w-52" : ""}
            `}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                {icon}
                <span
                  className={`overflow-hidden  ${expanded ? "ml-3" : "hidden"}`}
                >
                  {text}
                </span>
              </div>
              {expanded && (
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
                  expanded ? "" : "top-2"
                }`}
              />
            )}
            {!expanded && (
              <div
                className={`hidden group-hover:flex flex-col absolute min-w-24 left-20 top-1/2 -translate-y-1/2 bg-blue-650 text-white px-4 py-5 gap-y-1.5 rounded-lg shadow`}
              >
                {groupLinks &&
                  groupLinks.map(
                    (link: { url: string; text: string }, index: number) => {
                      return (
                        <Link
                          className="text-nowrap"
                          key={index}
                          href={`/${link.url}`}
                        >
                          {link.text}
                        </Link>
                      );
                    }
                  )}
              </div>
            )}
            {!expanded && (
              <div
                className=" hidden group-hover:block absolute left-[74px] top-1/2 -translate-y-1/2 w-0 h-0 
                            border-t-[5px] border-t-transparent
                            border-r-[7px] border-r-blue-650
                            border-b-[5px] border-b-transparent"
              />
            )}
          </li>
          {expanded && (
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
                : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700/75 dark:text-white/80"
            }
                    ${expanded ? "w-52" : ""}
            `}
        >
          <Link className="w-full flex items-center py-3 px-3" href={`/${url}`}>
            {icon}
            <span
              className={`overflow-hidden  ${
                expanded ? "w-48 ml-3" : " hidden"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={` absolute right-2 w-2 h-2 rounded bg-red-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}
            {!expanded && (
              <div
                className={`hidden group-hover:flex flex-col absolute left-20 bg-blue-650 text-white p-3 rounded-lg shadow`}
              >
                {text}
              </div>
            )}
            {!expanded && (
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
