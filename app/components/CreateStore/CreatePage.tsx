"use client";

import React, { useState,  useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";

// Validation schema for the create store form
const createStoreSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must be at most 50 characters")
    .required("Store name is required"),
  domain: Yup.string()
    .matches(
      /^[a-z0-9-]+$/,
      "Domain can only contain lowercase letters, numbers, and hyphens"
    )
    .min(3, "Domain must be at least 3 characters")
    .max(30, "Domain must be at most 30 characters")
    .required("Store domain is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Store email is required"),
  phone: Yup.string().nullable(),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be at most 500 characters")
    .required("Store description is required"),
  storeType: Yup.string()
    .oneOf(["physical", "digital", "hybrid", "services"], "Invalid store type")
    .required("Store type is required"),
  category: Yup.string().required("Store category is required"),
  theme: Yup.string()
    .oneOf(
      ["modern", "boutique", "minimal", "bold", "vintage"],
      "Invalid theme"
    )
    .required("Theme is required"),
  country: Yup.string().required("Country is required"),
  currency: Yup.string().required("Currency is required"),
  timezone: Yup.string().required("Timezone is required"),
  logo: Yup.mixed().nullable(),
  agreeTos: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms of Service"
  ),
});
import {
  ArrowRight,
  Check,
  ChevronRight,
  Globe,
  Store,
  Zap,
  AlertCircle,
  ExternalLink,

} from "lucide-react";
import { unavailableDomains } from "@/data/unavailableDomains";
import { STORE_TYPES } from "@/data/STORE_TYPES";
import { STORE_CATEGORIES } from "@/data/STORE_CATEGORIES";
import { STORE_THEMES } from "@/data/STORE_THEMES";
import { useCreateStoreMutation } from "@/redux/features/stores/storesApi";
import { useLocale } from "next-intl";
import { CountrySelect } from "../ui/CountrySelect";
import { CurrencySelect } from "../ui/CurrencySelect";
import { TimezoneSelect } from "../ui/TimezoneSelect";



/**
 * CreatePage Component - Enhanced store creation with multi-step form
 */
const CreateStorePage = () => {
  const router = useRouter();
  const locale = useLocale(); // Add locale hook
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDomain, setPreviewDomain] = useState("yourstore.nextora.com");
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [createStore, { isSuccess, error, isLoading, data }] =
    useCreateStoreMutation();
  const totalSteps = 3;

  // Watch for success/error states from the API
  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Your store has been successfully created!");

      // Extract storeId from response data
      const storeId = data.store?.storeId;

      if (storeId) {
        // Navigate to the new store dashboard
        router.push(`/${locale}/store/${storeId}/dashboard`);
      } else {
        // Fallback if storeId isn't available
        router.push(`/${locale}/dashboard`);
        console.warn("Store created but no storeId returned:", data);
      }
    }

    if (error) {
      if ("data" in error) {
        // Type assertion for the error object
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data?.message || "Failed to create store");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      setIsSubmitting(false);
    }
  }, [isSuccess, error, router, locale, data]);

  // Formik setup with initial values based on store schema
  const formik = useFormik({
    initialValues: {
      name: "",
      domain: "",
      email: "",
      phone: "",
      description: "",
      storeType: "",
      category: "",
      theme: "modern",
      country: "",
      currency: "USD",
      timezone: "UTC",
      logo: null,
      agreeTos: false,
    },
    validationSchema: createStoreSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        // Format data for the API
        const storeData = {
          name: values.name,
          domain: values.domain,
          description: values.description,
          email: values.email,
          phone: values.phone || null,
          storeType: values.storeType,
          category: values.category,
          theme: values.theme,
          country: values.country,
          currency: values.currency,
          timezone: values.timezone,
          // Add any other required fields from your API
        };

        // Call the create store mutation
        await createStore(storeData).unwrap();

        // The success handling is done in the useEffect above
      } catch (err) {
        // Error handling is done in useEffect, but we can add extra handling here
        console.error("Store creation error:", err);
        // We don't need to set isSubmitting to false here as it's handled in the useEffect
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    formik;

  // Check domain availability with debounce
  const checkDomainAvailability = async (domain: string) => {
    if (domain.length < 3) {
      setDomainAvailable(null);
      setPreviewDomain("yourstore.nextora.com");
      return;
    }

    setPreviewDomain(`${domain}.nextora.com`);

    // Simulate API check with delay
    setTimeout(() => {
      // For demo: Make most domains available except "nextora" and "admin"

      setDomainAvailable(!unavailableDomains.includes(domain));
    }, 500);
  };

  // Handle domain input with validation
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFieldValue("domain", value);
    checkDomainAvailability(value);
  };

  // Handle next step navigation
  const handleNextStep = () => {
    let canProceed = true;

    // Validate current step fields
    if (currentStep === 1) {
      if (!values.name || !values.domain || !values.email || !domainAvailable) {
        canProceed = false;
        toast.error("Please complete all required fields correctly");
      }
    } else if (currentStep === 2) {
      if (!values.storeType || !values.category || !values.description) {
        canProceed = false;
        toast.error("Please complete all required fields");
      }
    }

    if (canProceed) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Progress bar calculation
  const progress = (currentStep / totalSteps) * 100;

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-dvh ">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg" />
              <div className="relative z-10 text-white">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Nextora<span className="text-blue-600">.</span>
            </h1>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {currentStep === 1
                  ? "Basic Info"
                  : currentStep === 2
                  ? "Store Details"
                  : "Finish Setup"}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: undefined }}
                data-progress={progress}
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
                title={`Progress: ${Math.round(progress)}%`}
              ></div>
              <style jsx>{`
                [data-progress] {
                  width: ${progress}%;
                }
              `}</style>
            </div>
          </div>

          {/* Form container */}
          <motion.div
            key={`step-${currentStep}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Store Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Let&#39;s start with the basics to set up your store.
                    </p>
                  </div>

                  {/* Store Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Store Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.name && touched.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        } shadow-sm py-2 px-3 dark:bg-gray-900 dark:text-white sm:text-sm`}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Store Domain */}
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Store Domain <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="domain"
                        name="domain"
                        value={values.domain}
                        onChange={handleDomainChange}
                        className={`block w-full rounded-l-md border ${
                          errors.domain && touched.domain
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        } py-2 px-3 dark:bg-gray-900 dark:text-white sm:text-sm`}
                      />
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 text-gray-500 dark:text-gray-300 text-sm">
                        .nextora.com
                      </span>
                    </div>
                    {/* Domain availability indicator */}
                    {values.domain && (
                      <div className="mt-1.5 flex items-center">
                        {domainAvailable === true && (
                          <span className="text-sm text-green-600 flex items-center">
                            <Check className="w-4 h-4 mr-1" />
                            Domain available!
                          </span>
                        )}
                        {domainAvailable === false && (
                          <span className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Domain already taken
                          </span>
                        )}
                      </div>
                    )}
                    {errors.domain && touched.domain && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.domain}
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 text-sm text-blue-600 dark:text-blue-300">
                    <div className="flex">
                      <Globe className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">
                          Your store will be available at:
                        </p>
                        <p className="mt-1 font-semibold">{previewDomain}</p>
                      </div>
                    </div>
                  </div>

                  {/* Store Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Store Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.email && touched.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        } shadow-sm py-2 px-3 dark:bg-gray-900 dark:text-white sm:text-sm`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      This will be used for store notifications and customer
                      support.
                    </p>
                  </div>

                  {/* Store Phone (Optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Store Phone Number (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 dark:bg-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Next Step
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Store Type and Category */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Store Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Tell us about your store and what you&apos;ll be selling.
                    </p>
                  </div>

                  {/* Store Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      What type of products will you sell?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {STORE_TYPES.map((type) => (
                        <div key={type.id} className="relative">
                          <input
                            type="radio"
                            id={`type-${type.id}`}
                            name="storeType"
                            value={type.id}
                            checked={values.storeType === type.id}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={`type-${type.id}`}
                            className="flex cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-4 peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-500 hover:border-gray-300 dark:hover:border-gray-600"
                          >
                            <div className="w-full">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {type.name}
                                </p>
                                {values.storeType === type.id && (
                                  <Check className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {type.description}
                              </p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.storeType && touched.storeType && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.storeType}
                      </p>
                    )}
                  </div>

                  {/* Store Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Select your store category{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {STORE_CATEGORIES.map((category) => (
                        <div key={category.id} className="relative">
                          <input
                            type="radio"
                            id={`category-${category.id}`}
                            name="category"
                            value={category.id}
                            checked={values.category === category.id}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="flex flex-col items-center justify-center cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-500 hover:border-gray-300 dark:hover:border-gray-600 h-full"
                          >
                            <div className="mb-2 rounded-full bg-blue-50 dark:bg-blue-900/20 p-2">
                              {category.icon}
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {category.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {category.description}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.category && touched.category && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Store Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Store Description <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Tell customers about your store, products, and brand..."
                        className={`block w-full rounded-md border ${
                          errors.description && touched.description
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        } shadow-sm py-2 px-3 dark:bg-gray-900 dark:text-white sm:text-sm`}
                      ></textarea>
                    </div>
                    {errors.description && touched.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Min 20 characters. This helps customers understand what
                      your store is about.
                    </p>
                  </div>

                  {/* Navigation buttons */}
                  <div className="pt-5 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Next Step
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Final Settings */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Final Settings
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Just a few more details before launching your store.
                    </p>
                  </div>

                  {/* Store Theme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Choose a store theme{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                      {STORE_THEMES.map((theme) => (
                        <div key={theme.id} className="relative">
                          <input
                            type="radio"
                            id={`theme-${theme.id}`}
                            name="theme"
                            value={theme.id}
                            checked={values.theme === theme.id}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={`theme-${theme.id}`}
                            className="flex flex-col cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-500 hover:border-gray-300 dark:hover:border-gray-600"
                          >
                            <div
                              className={`bg-${theme.id}-theme mb-2 h-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600`}
                            ></div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {theme.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {theme.description}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      You can customize your theme further after setup.
                    </p>
                  </div>

                  {/* Location and Currency */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <CountrySelect
                        name="country"
                        value={values.country}
                        onChange={(value) => setFieldValue("country", value)}
                        error={errors.country}
                        touched={touched.country}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <CurrencySelect
                        name="currency"
                        value={values.currency}
                        onChange={(value) => setFieldValue("currency", value)}
                        error={errors.currency}
                        touched={touched.currency}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="timezone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Timezone <span className="text-red-500">*</span>
                    </label>
                    <TimezoneSelect
                      name="timezone"
                      value={values.timezone}
                      onChange={(value) => setFieldValue("timezone", value)}
                      error={errors.timezone}
                      touched={touched.timezone}
                    />
                  </div>

                  {/* Store Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                      Your Store Summary
                    </h3>
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Store Name
                        </dt>
                        <dd className="text-sm text-gray-900 dark:text-white">
                          {values.name || "—"}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Domain
                        </dt>
                        <dd className="text-sm text-gray-900 dark:text-white">
                          {previewDomain}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Category
                        </dt>
                        <dd className="text-sm text-gray-900 dark:text-white capitalize">
                          {values.category
                            ? STORE_CATEGORIES.find(
                                (c) => c.id === values.category
                              )?.name || values.category
                            : "—"}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Store Type
                        </dt>
                        <dd className="text-sm text-gray-900 dark:text-white capitalize">
                          {values.storeType
                            ? STORE_TYPES.find((t) => t.id === values.storeType)
                                ?.name || values.storeType
                            : "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="agreeTos"
                        name="agreeTos"
                        type="checkbox"
                        checked={values.agreeTos}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="agreeTos"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.agreeTos && touched.agreeTos && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.agreeTos}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="pt-5 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating Store...
                        </>
                      ) : (
                        <>
                          Create Store
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
          {/* Help Box */}
          <div className="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Store className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Need help?
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Check out our resources to learn more about setting up your
                  store.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link
                    href="/docs/store-setup"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span>Setup Guide</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                  <Link
                    href="/docs/examples"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span>Example Stores</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                  <Link
                    href="/support"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span>Contact Support</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStorePage;
