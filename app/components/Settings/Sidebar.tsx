import React from "react";

type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
};

/**
 * Sidebar Component
 * Displays a list of sections with navigation functionality.
 */
const Sidebar = ({
  sections,
  activeSection,
  setActiveSection,
}: SidebarProps) => {
  const handleScroll = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="w-full md:w-max h-max bg-white dark:bg-black-100 shadow rounded-lg p-6 sticky top-22">
      <nav className="space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleScroll(section.id)}
            className={`flex items-center gap-2 text-sm font-medium w-full text-left p-2 rounded-lg transition-all ${
              activeSection === section.id
                ? "bg-blue-500 text-white"
                : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
