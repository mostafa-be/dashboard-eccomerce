"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Settings,
  Users,
  Workflow,
  Blocks,
  BarChart,
  Mail,
  Bell,
} from "lucide-react";

const sections = [
  {
    id: "general",
    label: "General Settings",
    icon: <Settings size={18} />,
    description:
      "Configure general CRM settings such as company details and branding.",
  },
  {
    id: "user-management",
    label: "User Management",
    icon: <Users size={18} />,
    description: "Manage users, roles, and permissions for your CRM.",
  },
  {
    id: "workflow-automation",
    label: "Workflow Automation",
    icon: <Workflow size={18} />,
    description: "Automate repetitive tasks and streamline your workflows.",
  },
  {
    id: "integration-settings",
    label: "Integration Settings",
    icon: <Blocks size={18} />,
    description: "Connect your CRM with third-party tools and services.",
  },
  {
    id: "reporting-analytics",
    label: "Reporting and Analytics",
    icon: <BarChart size={18} />,
    description: "Customize reports and analytics to track CRM performance.",
  },
  {
    id: "email-settings",
    label: "Email Settings",
    icon: <Mail size={18} />,
    description:
      "Configure email templates and SMTP settings for CRM notifications.",
  },
  {
    id: "notification-settings",
    label: "Notification Settings",
    icon: <Bell size={18} />,
    description: "Manage notification preferences for CRM alerts and updates.",
  },
];

/**
 * SettingsPage Component
 * Displays a settings page with a sidebar and detailed sections.
 */
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <section className="w-full flex flex-wrap gap-6 h-screen overflow-y-auto">
      {/* Sidebar */}
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="w-full md:w-max space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white dark:bg-black-100 shadow rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {section.label}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SettingsPage;
