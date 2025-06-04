"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X, ArrowLeft, Loader2 } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { RegistrationType } from "./RegisterPage";
import CountryCodeSelect from "../ui/CountryCodeSelect";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

// Import COUNTRY_CODES from data file instead of defining inline
import { COUNTRY_CODES } from "../../../data/COUNTRY_CODES";

// Password strength requirements
const passwordRequirements = [
  { id: "length", text: "At least 8 characters", regex: /.{8,}/ },
  { id: "lowercase", text: "At least one lowercase letter", regex: /[a-z]/ },
  { id: "uppercase", text: "At least one uppercase letter", regex: /[A-Z]/ },
  { id: "number", text: "At least one number", regex: /[0-9]/ },
  {
    id: "special",
    text: "At least one special character",
    regex: /[^A-Za-z0-9]/,
  },
];

// Form validation schema
const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  countryCode: Yup.string().required("Country code is required"),
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .min(8, "Mobile number must be at least 8 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  termsAccepted: Yup.boolean()
    .required("You must accept the Terms of Service and Privacy Policy")
    .oneOf([true], "You must accept the Terms of Service and Privacy Policy"),
  marketingConsent: Yup.boolean(),
});

// Custom hook for form logic
function useRegistrationForm(
  setRegisterType: (type: RegistrationType) => void
) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(COUNTRY_CODES[0]);
  const router = useRouter();
  const locale = useLocale();

  // Use the register mutation hook from RTK Query
  const [register, { isLoading, error, isSuccess, data }] =
    useRegisterMutation();

  // Form initialization and validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+1",
      mobile: "",
      password: "",
      termsAccepted: false,
      marketingConsent: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        // Format data for API
        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          name: `${values.firstName} ${values.lastName}`, // Add combined name field
          email: values.email,
          mobile: `${values.countryCode}${values.mobile}`,
          password: values.password,
          marketingConsent: values.marketingConsent,
        };

        // Submit registration data to API
        await register(userData).unwrap();
      } catch (err) {
        // Error handling is done via the RTK Query hook
        console.error("Registration submission error:", err);
      }
    },
  });

  // Handle API response
  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Registration successful!");

      // Option 1: Redirect to login page
      setRegisterType("verify");
      // Option 2: Redirect to dashboard if auto-login is implemented
      // router.push(`/${locale}/dashboard`);
    }

    if (error) {
      // Type assertion to access error data
      if ("data" in error) {
        const errorData = error.data as { message?: string };
        toast.error(
          errorData?.message || "Registration failed. Please try again."
        );
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }, [isSuccess, error, data, router, locale, setRegisterType]);

  // Update current country when countryCode changes
  useEffect(() => {
    const selected =
      COUNTRY_CODES.find((c) => c.code === formik.values.countryCode) ||
      COUNTRY_CODES[0];
    setCurrentCountry(selected);
  }, [formik.values.countryCode]);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    return passwordRequirements.filter((req) => req.regex.test(password))
      .length;
  };

  // Get color based on password strength
  const getStrengthColor = () => {
    const strength = getPasswordStrength(formik.values.password);
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return {
    formik,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(!showPassword),
    passwordStrength: getPasswordStrength(formik.values.password),
    getStrengthColor,
    currentCountry,
    isLoading,
  };
}

// Custom hook for registration animations and motion controls
/*
const useRegistrationMotion = () => {
  // Animation variants for container and elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
    initial: {
      scale: 1,
    },
  };

  // Form field appearance animation
  const formFieldAppear = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginBottom: "1rem",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginBottom: 0,
      transition: { duration: 0.2 },
    },
  };

  return {
    containerVariants,
    itemVariants,
    buttonVariants,
    formFieldAppear,
  };
};
*/
// Component props interface
interface RegisterContentProps {
  setTypeRegister: (type: RegistrationType) => void;
}

export default function RegisterContent({
  setTypeRegister,
}: RegisterContentProps) {
  // Use custom hooks to separate form logic
  const {
    formik,
    showPassword,
    togglePasswordVisibility,
    passwordStrength,
    getStrengthColor,
    currentCountry,
    isLoading,
  } = useRegistrationForm(setTypeRegister); // Pass the function directly

  // Component UI
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full flex items-center justify-center flex-col gap-2 p-3"
    >
      {/* Header section */}
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => setTypeRegister("method-select")}
          className="flex items-center gap-1 text-sm text-blue-600 mb-2 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to registration options</span>
        </button>

        <h1 className="text-2xl text-center font-semibold text-black dark:text-white">
          Create your account
        </h1>
        <p className="text-center text-sm text-gray-500">
          Join our community and start selling online
        </p>
      </div>

      {/* Form fields */}
      <div className="w-full flex flex-col mt-4 gap-4">
        {/* Name fields - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              id="firstName"
              placeholder="John"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                formik.errors.firstName && formik.touched.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <span className="text-sm text-red-500 mt-1 block">
                {formik.errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              id="lastName"
              placeholder="Doe"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                formik.errors.lastName && formik.touched.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <span className="text-sm text-red-500 mt-1 block">
                {formik.errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email field */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            placeholder="example@gmail.com"
            className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
              formik.errors.email && formik.touched.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } mt-1.5 transition-all focus:ring-2`}
          />
          {formik.errors.email && formik.touched.email && (
            <span className="text-sm text-red-500 mt-1 block">
              {formik.errors.email}
            </span>
          )}
        </div>

        {/* Phone field with country code selection */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <div className="mt-1.5 flex">
            <div className="w-[120px] mr-[-1px]">
              <CountryCodeSelect
                value={formik.values.countryCode}
                onChange={(value) => formik.setFieldValue("countryCode", value)}
                error={
                  formik.touched.countryCode
                    ? formik.errors.countryCode
                    : undefined
                }
                touched={!!formik.touched.countryCode}
                label=""
                name="countryCode"
              />
            </div>
            <input
              type="tel"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              id="mobile"
              placeholder="612345678"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-r-lg h-[45px] px-3.5 border ${
                formik.errors.mobile && formik.touched.mobile
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } transition-all focus:ring-2`}
            />
          </div>
          {/* Country name helper text */}
          <div className="mt-1 text-xs text-gray-500">
            {currentCountry.name || ""}
          </div>
          {formik.errors.mobile && formik.touched.mobile && (
            <span className="text-sm text-red-500 mt-1 block">
              {formik.errors.mobile}
            </span>
          )}
        </div>

        {/* Password field with strength meter */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
              placeholder="••••••••"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 pr-10 transition-all focus:ring-2`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center top-[7px]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="text-gray-500 dark:text-gray-400 h-5 w-5" />
              ) : (
                <Eye className="text-gray-500 dark:text-gray-400 h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password strength meter */}
          {formik.values.password && (
            <div className="mt-2">
              <div className="flex items-center">
                <div className="h-1.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor()} rounded-full transition-all`}
                    style={{
                      width: `${
                        (passwordStrength / passwordRequirements.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="ml-2 text-xs font-medium">
                  {passwordStrength <= 1 && "Weak"}
                  {passwordStrength > 1 && passwordStrength <= 3 && "Medium"}
                  {passwordStrength > 3 && "Strong"}
                </span>
              </div>

              {/* Password requirements */}
              <ul className="mt-2 space-y-1">
                {passwordRequirements.map((req) => (
                  <li key={req.id} className="flex items-center text-xs">
                    {req.regex.test(formik.values.password) ? (
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <X className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        req.regex.test(formik.values.password)
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formik.errors.password && formik.touched.password && (
            <span className="text-sm text-red-500 mt-1 block">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Policy consent checkboxes */}
        <div className="space-y-4 mt-2">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formik.values.termsAccepted}
                onChange={formik.handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="termsAccepted"
                className="text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
              {formik.errors.termsAccepted && formik.touched.termsAccepted && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.termsAccepted}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="marketingConsent"
                name="marketingConsent"
                type="checkbox"
                checked={formik.values.marketingConsent}
                onChange={formik.handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="marketingConsent"
                className="text-gray-700 dark:text-gray-300"
              >
                I agree to receive marketing communications from Your Company
              </label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="w-full mt-6">
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full rounded-lg flex items-center justify-center py-4 text-base font-semibold text-white ${
              isLoading || !formik.isValid
                ? "bg-blue-600/80 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } transition-colors shadow-md hover:shadow-lg`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Your Account"
            )}
          </button>
        </div>

        {/* Login link */}
        <div className="w-full flex items-center mt-4 justify-center">
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              title="login"
              href="/en/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
