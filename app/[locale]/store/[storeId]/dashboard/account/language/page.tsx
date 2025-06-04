import Heading from "@/utils/Heading";
import React from "react";

// Language Settings Page
// Displays language management and details for the dashboard account.
const page = () => {
  return (
    <>
      <Heading
        title="Language Settings"
        description="Manage your dashboard language preferences and localization settings."
        keywords="language, localization, dashboard, account, settings"
      />
      <section className="mt-8 max-w-2xl mx-auto bg-white dark:bg-black-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Language Preferences
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Choose your preferred language for the dashboard interface. This
          setting will affect how content and notifications are displayed.
        </p>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
          <li>Change your default language for your account.</li>
          <li>
            All dashboard menus and notifications will use your selected
            language.
          </li>
          <li>Supports multiple languages for global teams.</li>
        </ul>
      </section>
    </>
  );
};

export default page;
