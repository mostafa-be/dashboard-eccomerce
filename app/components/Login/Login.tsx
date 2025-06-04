"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import apple_svg from "../../../public/icons_svg/apple.svg";
import google_svg from "../../../public/icons_svg/google.svg";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ArrowRight,
  Facebook,
} from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});
type AuthType = "login" | "forgotPassword";
type Props = {
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

const Login = ({ setAuth }: Props) => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [show, setShow] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [login, { isSuccess, error, isLoading, data }] = useLoginMutation();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      // Extract user data using destructuring for cleaner access
      const { user } = data;
      const { primaryStore, ownedStores, staffStores } = user;

      // Use nullish coalescing for cleaner fallback chain
      const storeId =
        primaryStore?.storeId ??
        ownedStores?.[0] ??
        staffStores?.[0]?.store ??
        null;

      setRedirecting(true);
      toast.success("Login successful! Redirecting to dashboard...");

      // Fix typo in URL path and add safe navigation
      router.push(
        storeId
          ? `/${locale}/store/${storeId}/dashboard`
          : `/${locale}/dashboard`
      );
    }

    if (error) {
      if ("data" in error) {
        // Use optional chaining for safer property access
        const errorMessage = error.data?.message || "Login failed";
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error, router, locale, data]);

  const handleSocialLogin = async (provider: string) => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: `/${locale}/dashboard` });
    } catch {
      toast.error(`${provider} login failed`);
    } finally {
      setSocialLoading(null);
    }
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
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
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-6"
    >
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col gap-2"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Social login buttons */}
      <motion.div
        variants={itemVariants}
        className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {/* Google login button */}
        <motion.button
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin("google")}
          disabled={socialLoading === "google"}
          className="w-full h-11 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image
              src={google_svg}
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            {socialLoading === "google" ? t("connecting") : t("google")}
          </span>
        </motion.button>

        {/* Facebook login button */}
        <motion.button
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin("facebook")}
          disabled={socialLoading === "facebook"}
          className="w-full h-11 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-center gap-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "facebook" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Facebook className="w-5 h-5 text-[#1877F2]" />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            {socialLoading === "facebook" ? t("connecting") : t("facebook")}
          </span>
        </motion.button>

        {/* Apple login button */}
        <motion.button
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin("apple")}
          disabled={socialLoading === "apple"}
          className="w-full h-11 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "apple" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image
              src={apple_svg}
              alt="Apple"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            {socialLoading === "apple" ? t("connecting") : t("apple")}
          </span>
        </motion.button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="flex items-center my-0">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          {t("continueWith")}
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      </motion.div>

      {/* Email field */}
      <motion.div variants={itemVariants} className="w-full">
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
          htmlFor="email"
        >
          {t("email")}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="you@example.com"
            className={`outline-none w-full text-gray-900 dark:text-white bg-transparent rounded-lg h-11 pl-10 pr-3.5 border ${
              errors.email && touched.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            } transition-all focus:ring-2`}
          />
        </div>
        {errors.email && touched.email && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-1 block"
          >
            {errors.email}
          </motion.span>
        )}
      </motion.div>

      {/* Password field */}
      <motion.div variants={itemVariants} className="w-full">
        <div className="flex justify-between items-center mb-1.5">
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            {t("password")}
          </label>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setAuth("forgotPassword")}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {t("forgotPassword")}
          </motion.button>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type={show ? "text" : "password"}
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`outline-none w-full text-gray-900 dark:text-white bg-transparent rounded-lg h-11 pl-10 pr-10 border ${
              errors.password && touched.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            } transition-all focus:ring-2`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <EyeOff className="text-gray-500 dark:text-gray-400 h-5 w-5" />
            ) : (
              <Eye className="text-gray-500 dark:text-gray-400 h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-1 block"
          >
            {errors.password}
          </motion.span>
        )}
      </motion.div>

      {/* OPTIONAL: Display user data after successful login (for development) */}
      {/*userData && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm font-medium text-green-800">
            Login successful!
          </p>
          <p className="text-xs text-green-700">
            Welcome back, {userData.name || userData.firstName || "User"}
          </p>
          {userData.primaryStore && (
            <p className="text-xs text-green-700">
              Redirecting to your primary store...
            </p>
          )}
        </div>
      )*/}

      {/* Submit button */}
      <div className="w-full mt-6">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="submit"
          disabled={isLoading || redirecting}
          className={`w-full rounded-lg flex items-center justify-center h-11 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t("connecting")}
            </span>
          ) : redirecting ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Redirecting...
            </span>
          ) : (
            <span className="flex items-center">
              {t("signIn")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Register link */}
      <motion.div variants={itemVariants} className="w-full text-center mt-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t("noAccount")}{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={`/${locale}/register`}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            {t("createAccount")}
          </motion.a>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default Login;
