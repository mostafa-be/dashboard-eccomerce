import Link from "next/link";
import React from "react";

type Option = {
  key: string;
  label: string;
  icon: React.ElementType;
  danger?: boolean;
};

type Props = {
  activeSection: string;
  options: Option[];
};

const SidebarSettings = ({ activeSection, options }: Props) => (
  <aside className="w-full md:w-56 flex-shrink-0 bg-white dark:bg-black-100 rounded-xl shadow border border-gray-200 dark:border-gray-800 sticky top-8 h-fit z-10 p-2 md:p-4">
    <nav className="flex flex-col gap-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <Link
            key={opt.key}
            href={`/en/dashboard/account/settings/#${opt.key}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition
              ${
                activeSection === opt.key
                  ? opt.danger
                    ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : opt.danger
                  ? "text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-800"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
            aria-current={activeSection === opt.key ? "page" : undefined}
          >
            <Icon className="w-5 h-5" />
            <span>{opt.label}</span>
          </Link>
        );
      })}
    </nav>
  </aside>
);

export default SidebarSettings;
