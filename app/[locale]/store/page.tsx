"use client";

import { FC, JSX } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Store,
  ShoppingBag,
  CreditCard,
  Settings,
  ExternalLink,
} from "lucide-react";

// Define types for component props
interface StorePageProps {
  params: {
    storeId?: string;
  };
}

// Define type for setup steps
interface SetupStep {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: JSX.Element;
  buttonText: string;
}

/**
 * StorePage Component
 * Displayed after successful store creation to guide setup process
 */
const Page: FC<StorePageProps> = ({ params }) => {
  // Use domain from params or default value
  const domain = params?.storeId || "your-store";

  // Setup steps for new store
  const setupSteps: SetupStep[] = [
    {
      id: 1,
      title: "Add Your First Product",
      description: "Start by adding products to your store inventory.",
      href: `/en/stores/${domain}/products/new`,
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      buttonText: "Add Product",
    },
    {
      id: 2,
      title: "Set Up Payment Methods",
      description: "Connect payment gateways to start accepting orders.",
      href: `/en/stores/${domain}/settings/payments`,
      icon: <CreditCard className="h-6 w-6 text-green-600" />,
      buttonText: "Configure Payments",
    },
    {
      id: 3,
      title: "Customize Your Store",
      description: "Personalize your storefront to match your brand.",
      href: `/en/stores/${domain}/settings/appearance`,
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      buttonText: "Customize Store",
    },
  ];

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                Store Created Successfully!
              </h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-200">
                <p>
                  Congratulations! Your store{" "}
                  <span className="font-semibold">{domain}.nextora.com</span>{" "}
                  has been created. Follow the steps below to complete your
                  setup.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={`https://${domain}.nextora.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-green-700 dark:text-green-300 hover:underline"
                >
                  <span>View Your Store</span>
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Set Up Your Store
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Complete these steps to get your store ready for customers.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={`/en/stores/${domain}/dashboard`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Store className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Setup steps */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {setupSteps.map((step) => (
              <li key={step.id} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={step.href}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {step.buttonText}
                      </Link>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Step {step.id}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources section */}
        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Helpful Resources
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                Store Setup Guide
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Learn the best practices for setting up your store for success.
              </p>
              <div className="mt-4">
                <Link
                  href="/docs/store-setup"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Read the Guide
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                Product Photography Tips
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Make your products look their best with professional photography
                tips.
              </p>
              <div className="mt-4">
                <Link
                  href="/docs/product-photography"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  View Tips
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                Marketing Your Store
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Strategies to promote your store and attract more customers.
              </p>
              <div className="mt-4">
                <Link
                  href="/docs/marketing"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Learn More
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add export for metadata if needed (commented out for client component)
// export const generateMetadata = ({ params }: { params: { domain: string } }) => {
//   return {
//     title: `Set Up Your ${params.domain} Store | Nextora`,
//     description: "Complete your store setup on Nextora to start selling online and accepting orders."
//   };
// };

export default Page;
