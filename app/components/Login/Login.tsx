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
} from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

type Props = {
  setAuth: (type: string) => void;
};

const Login = ({ setAuth }: Props) => {
  const [show, setShow] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [login, { isSuccess, error, isLoading }] = useLoginMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      router.push("/en/dashboard");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data?.message || "Login failed");
      }
    }
  }, [isSuccess, error, router]);

  const handleSocialLogin = async (provider: string) => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/en/dashboard" });
    } catch (err) {
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
          Login to your account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your credentials to access your dashboard
        </p>
      </motion.div>

      {/* Social login buttons */}
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <motion.button
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin("google")}
          disabled={socialLoading === "google"}
          className="w-full sm:flex-1 h-11 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-center gap-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image
              src={google_svg}
              alt="Google"
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {socialLoading === "google"
              ? "Connecting..."
              : "Sign in with Google"}
          </span>
        </motion.button>

        <motion.button
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleSocialLogin("apple")}
          disabled={socialLoading === "apple"}
          className="w-full sm:flex-1 h-11 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-center gap-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "apple" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image
              src={apple_svg}
              alt="Apple"
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {socialLoading === "apple" ? "Connecting..." : "Sign in with Apple"}
          </span>
        </motion.button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="flex items-center my-0">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          or continue with
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      </motion.div>

      {/* Email field */}
      <motion.div variants={itemVariants} className="w-full">
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
          htmlFor="email"
        >
          Email Address
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
            Password
          </label>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setAuth("forgotPassword")}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot password?
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

      {/* Submit button */}
      <motion.div variants={itemVariants} className="w-full mt-2">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg flex items-center justify-center h-11 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Logging in...
            </span>
          ) : (
            <span className="flex items-center">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Register link */}
      <motion.div variants={itemVariants} className="w-full text-center mt-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/en/register"
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Create an account
          </motion.a>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default Login;
