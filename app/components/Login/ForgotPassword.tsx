"use client";
import React, { useState } from "react";
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

type Props = {
  setAuth: (type: string) => void;
};

const ForgotPassword = ({ setAuth }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        // In a real app, you'd call your API here
        // For now we'll just simulate a successful request
        setIsSubmitted(true);
        toast.success("Reset instructions sent to your email");
      } catch (error) {
        toast.error("Failed to send reset instructions");
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    formik;

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-500" />
                  </motion.div>
                  
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
          >
            Check your email
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 text-center mb-6"
          >
            We've sent password reset instructions to:
            <br />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {values.email}
            </span>
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAuth("login")}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </motion.button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-start mb-2">
            <motion.button
              type="button"
              onClick={() => setAuth("login")}
              whileHover={{ x: -2 }}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to login</span>
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reset your password
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enter your email address and we'll send you instructions to reset
              your password
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`outline-none w-full rounded-lg h-11 pl-10 pr-3.5 border ${
                  errors.email && touched.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                } text-gray-900 dark:text-white bg-transparent transition-all focus:ring-2`}
              />
            </div>
            {errors.email && touched.email && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 block"
              >
                {errors.email}
              </motion.span>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              className="w-full rounded-lg flex items-center justify-center h-11 text-white bg-blue-600 hover:bg-blue-700 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Sending...
                </span>
              ) : (
                "Send Reset Instructions"
              )}
            </motion.button>
          </motion.div>
        </form>
      )}
    </motion.div>
  );
};

export default ForgotPassword;
