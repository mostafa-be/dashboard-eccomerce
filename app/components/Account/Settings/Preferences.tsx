"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { useFormik } from "formik";
import { IAccessibility, IPreferences } from "../../../@types/types";
import { useUpdateSettingsUserMutation } from "@/redux/features/users/usersApi";
import { toast } from "react-hot-toast";

/**
 * Preferences Component
 * Renders user preferences for language, theme, accessibility, and more using Card components.
 * Uses Formik for form state and Input component for best practices.
 * Responsive and modern style. Shows toast notifications on success/error.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  preferences?: IPreferences;
  language?: string;
  theme?: string;
  accessibility?: IAccessibility;
};

const Preferences = ({
  sectionRefs,
  language,
  theme,
  preferences,
  accessibility,
}: Props) => {
  const [updateSettingsUser, { isLoading, isSuccess, error }] =
    useUpdateSettingsUserMutation();

  // Toast notifications for success/error
  useEffect(() => {
    if (isSuccess) toast.success("Preferences updated successfully!");
    if (error) toast.error("Failed to update preferences.");
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      language: language || "English",
      theme: theme || "System",
      preferences: {
        newsletter: !!preferences?.newsletter,
        personalizedAds: !!preferences?.personalizedAds,
        notificationsEmail: !!preferences?.notificationsEmail,
        notificationsPush: !!preferences?.notificationsPush,
        autoPlayVideos: !!preferences?.autoPlayVideos,
        languageLearningMode: !!preferences?.languageLearningMode,
        compactMode: !!preferences?.compactMode,
        darkModeStart: preferences?.darkModeSchedule?.start || "",
        darkModeEnd: preferences?.darkModeSchedule?.end || "",
      },
      accessibility: {
        highContrast: !!accessibility?.highContrast,
        textToSpeech: !!accessibility?.textToSpeech,
        dyslexicFont: !!accessibility?.dyslexicFont,
        screenReader: !!accessibility?.screenReader,
        fontSize: accessibility?.fontSize || "medium",
      },
    },
    onSubmit: (values) => {
      updateSettingsUser(values);
    },
    enableReinitialize: true,
  });

  return (
    <Card
      id="preferences"
      ref={(el) =>
        (sectionRefs.current["preferences"] = el as HTMLDivElement | null)
      }
      className="scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full space-y-6 mx-auto"
    >
      <HeaderCard>
        <TitleCard
          title="Preferences"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 "
        />
      </HeaderCard>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
          {/* Language and Theme */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-[180px]">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Language
              </label>
              <Select
                name="language"
                value={formik.values.language}
                onValueChange={(value) =>
                  formik.setFieldValue("language", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Theme
              </label>
              <Select
                name="theme"
                value={formik.values.theme}
                onValueChange={(value) => formik.setFieldValue("theme", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Light">Light</SelectItem>
                  <SelectItem value="Dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Preferences */}
          <fieldset
            className="flex flex-col space-y-2 mt-2"
            aria-labelledby="preferences-label"
          >
            <legend
              id="preferences-label"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Preferences
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-2">
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.newsletter"
                  checked={formik.values.preferences.newsletter}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Subscribe to newsletter</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.personalizedAds"
                  checked={formik.values.preferences.personalizedAds}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Personalized Ads</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.notificationsEmail"
                  checked={formik.values.preferences.notificationsEmail}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Email Notifications</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.notificationsPush"
                  checked={formik.values.preferences.notificationsPush}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Push Notifications</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.autoPlayVideos"
                  checked={formik.values.preferences.autoPlayVideos}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Auto-play Videos</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.languageLearningMode"
                  checked={formik.values.preferences.languageLearningMode}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Language Learning Mode</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="preferences.compactMode"
                  checked={formik.values.preferences.compactMode}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Compact Mode</span>
              </label>
              <div className="flex gap-2 items-center col-span-1 sm:col-span-2 space-y-0">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dark Mode Schedule:
                </span>
                <Input
                  type="time"
                  name="preferences.darkModeStart"
                  value={formik.values.preferences.darkModeStart}
                  onChange={formik.handleChange}
                  className="w-max"
                  aria-label="Dark mode start"
                />
                <span className="text-xs text-gray-400">to</span>
                <Input
                  type="time"
                  name="preferences.darkModeEnd"
                  value={formik.values.preferences.darkModeEnd}
                  onChange={formik.handleChange}
                  className="w-max"
                  aria-label="Dark mode end"
                />
              </div>
            </div>
          </fieldset>
          {/* Accessibility */}
          <fieldset
            className="flex flex-col space-y-2 mt-2"
            aria-labelledby="accessibility-label"
          >
            <legend
              id="accessibility-label"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Accessibility
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-2">
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="accessibility.highContrast"
                  checked={formik.values.accessibility.highContrast}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>High Contrast Mode</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="accessibility.textToSpeech"
                  checked={formik.values.accessibility.textToSpeech}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Text to Speech</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="accessibility.dyslexicFont"
                  checked={formik.values.accessibility.dyslexicFont}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Dyslexic Font</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="accessibility.screenReader"
                  checked={formik.values.accessibility.screenReader}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Screen Reader Support</span>
              </label>
              <div className="col-span-1 sm:col-span-2">
                <label
                  htmlFor="fontSize"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Font Size
                </label>
                <Select
                  name="accessibility.fontSize"
                  value={formik.values.accessibility.fontSize}
                  onValueChange={(value) =>
                    formik.setFieldValue("accessibility.fontSize", value)
                  }
                >
                  <SelectTrigger className="w-max min-w-[180px]">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>
          <CardFooter className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Preferences"}
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Preferences;
