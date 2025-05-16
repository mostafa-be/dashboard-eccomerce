import React from "react";
import ChangerExporter from "../../ui/ChangerExporter";

/**
 * PageBilling Component
 * Displays the billing page with navigation breadcrumbs and placeholder for billing details.
 */
const PageBilling = () => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Account", url: "/en/dashboard/account" },
    { name: "Billing", url: "/en/dashboard/account/billing" },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto space-y-10">
      <ChangerExporter links={links} active="Billing" />
      <div className="bg-white dark:bg-black-100 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
          Billing & Subscription
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Manage your plan, payment methods, and billing history.
        </p>
        {/* Billing details and actions go here */}
        <div className="space-y-4">
          <div>
            <span className="block text-gray-700 dark:text-gray-300">
              Current Plan: <span className="font-semibold">Pro</span>
            </span>
            <span className="block text-gray-500 dark:text-gray-400 text-xs">
              Renews: 2024-12-31
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
            Manage Subscription
          </button>
        </div>
        {/* Example billing history */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Billing History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-800">
                  <td className="py-2 pr-4">2024-01-01</td>
                  <td className="py-2 pr-4">Pro Plan Renewal</td>
                  <td className="py-2 pr-4">$20.00</td>
                  <td className="py-2 text-green-600">Paid</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">2023-12-01</td>
                  <td className="py-2 pr-4">Pro Plan Renewal</td>
                  <td className="py-2 pr-4">$20.00</td>
                  <td className="py-2 text-green-600">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBilling;
