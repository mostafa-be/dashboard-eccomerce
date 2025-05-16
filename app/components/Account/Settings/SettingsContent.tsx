"use client";
import React, { useState} from "react";
import {
  UserRound,
  Lock,
  Sliders,
  ShieldCheck,
  Bell,
  Eye,
  Key,
  Layers,
  AlertTriangle,
} from "lucide-react";
import SidebarSettings from "./SidebarSettings";
import MainContent from "./MainContent";

/**
 * SettingsContent Component
 * Modern, responsive settings page with sidebar navigation, icons, scrollspy, and anchor links.
 */
const SETTINGS_OPTIONS = [
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "password", label: "Password", icon: Lock },
  { key: "preferences", label: "Preferences", icon: Sliders },
  { key: "2fa", label: "Two-Factor Authentication", icon: Key },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "privacy", label: "Privacy", icon: Eye },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "integrations", label: "Integrations", icon: Layers },
  { key: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
];

const SettingsContent = () => {
  const [activeSection, setActiveSection] = useState("profile");



  return (
    <div className="w-full max-w-7xl h-[clc(100dvh-90px)] overflow-y-scroll mx-auto flex flex-col md:flex-row gap-6 md:gap-10 mt-8 md:mt-12">
      {/* Sidebar Navigation */}
      <SidebarSettings
        activeSection={activeSection}
        options={SETTINGS_OPTIONS}
        //userSettings={settings}
      />

      {/* Main Content */}
      <MainContent
        options={SETTINGS_OPTIONS}
        setActiveSection={setActiveSection}
       // sectionRefs={sectionRefs}
      />
    </div>
  );
};

export default SettingsContent;
