"use client";
import React, { useEffect, useRef } from "react";
import { User } from "@/app/@types/types";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import Preferences from "./Preferences";
import TwoFA from "./TwoFA";
import Notifications from "./Notifications";
import Privacy from './Privacy';
import Security from "./Security";
import Integrations from "./Integrations";
import Danger from "./Danger";

/**
 * MainContent Component
 * Renders all settings sections in the main content area.
 * Detects and highlights the active section on scroll.
 */
type Option = {
  key: string;
  label: string;
  icon: React.ElementType;
  danger?: boolean;
};

type Props = {
  options: Option[];
  setActiveSection: (section: string) => void;
};

const MainContent = ({ options, setActiveSection }: Props) => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Get user settings from Redux (assuming user.settings shape matches your schema)
  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);
  const { settings } = user;
  const { preferences, privacy, security, accessibility, language, theme } =
    settings || {};
  // Scrollspy effect: update activeSection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      //const containerTop = containerRef.current.getBoundingClientRect().top;
      const scrollY = window.scrollY + 120;
      let currentSection = options[0].key;
      for (const opt of options) {
        const ref = sectionRefs.current[opt.key];
        if (ref) {
          const { top } = ref.getBoundingClientRect();
          const absTop = window.scrollY + top;
          if (scrollY >= absTop) {
            currentSection = opt.key;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [options, setActiveSection]);

  return (
    <div ref={containerRef} className="flex-1 space-y-8 ">
      <EditProfile user={user} sectionRefs={sectionRefs} />
      <EditPassword sectionRefs={sectionRefs} />
      <Preferences
        sectionRefs={sectionRefs}
        preferences={preferences}
        language={language}
        theme={theme}
        accessibility={accessibility}
      />
      <TwoFA sectionRefs={sectionRefs} security={security} />
      <Notifications sectionRefs={sectionRefs} />
      <Privacy sectionRefs={sectionRefs} privacy={privacy} />
      <Security sectionRefs={sectionRefs} security={security} />
      <Integrations sectionRefs={sectionRefs} />
      <Danger sectionRefs={sectionRefs} />
    </div>
  );
};

export default MainContent;
