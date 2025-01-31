"use client";
import React, { createContext, useState, useContext, JSX } from "react";
import { Bell, ChevronDown, ChevronLeft, Dot, Search } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import defaultProfile from "../../../../../public/icons_svg/profile.svg";
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
      className={`h-dvh bg-white dark:bg-black-100 ${
        expanded ? "w-64 " : "w-20 max-md:hidden"
      } transition-all transform ease-in-out duration-500 origin-left fixed md:sticky top-0 left-0 `}
    >
      <div className="w-full bg-transparent">
        <div className="w-full flex items-center justify-center my-5">
          <h5 className="text-2xl text-center font-serif font-bold italic text-blue-650">
            {expanded ? "Nextora" : "N"}
          </h5>
          <button
            type="button"
            className=" absolute  -right-5 overflow-hidden w-10 h-10 bg-blue-650 p-1.5 rounded-full flex items-center justify-center"
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
        <nav
          className={`flex flex-col items-center justify-center mt-2  ${
            expanded ? "px-5" : "px-2"
          } transition-all transform ease-in-out `}
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
            relative  p-3 flex flex-col items-center justify-between  font-medium rounded-md cursor-pointer transition-all group
            ${
              active
                ? "bg-blue-650 text-white"
                : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700"
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
                className={`hidden group-hover:flex flex-col absolute w-24 left-20 top-1/2 -translate-y-1/2 bg-blue-650 text-white p-3 rounded-lg shadow`}
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
              className={`w-full grid gap-2 list-disc px-3 text-gray-700 transition-all origin-top ease-in-out transform ${
                openLinks === text
                  ? "bg-slate-50 rounded py-2 flex-1  h-max"
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
                    : "hover:text-blue-650 text-gray-800"
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
            relative font-medium rounded-md cursor-pointer transition-all group
            ${
              active
                ? "bg-blue-650 text-white"
                : "hover:bg-blue-650/90 hover:text-white-100 text-gray-700"
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
                className={` absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
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

export const NavBar = ({}) => {
  return (
    <header className="w-full px-10 h-[60px] z-20 flex items-center justify-between bg-white ">
      <div className="flex items-center justify-center">
        <div className="relative">
          <Search
            size={20}
            className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-600/90"
          />
          <input
            type="search"
            name="search"
            id="search"
            title="Search"
            placeholder="Search..."
            className="h-10 w-80 lg:w-96 bg-slate-100/70 pl-10 outline-none rounded-lg placeholder:text-lg placeholder:text-gray-600/90"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <Bell size={20} className="text-gray-700/90" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-12 h-12 bg-slate-100/70 rounded-full overflow-hidden">
            <Image
              src={defaultProfile}
              width={500}
              height={500}
              alt="default profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold text-black">Jon Dialot</p>
            <span className="text-sm text-gray-700/90 capitalize ">admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
