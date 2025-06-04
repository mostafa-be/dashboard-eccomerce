"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Description from "../Home/Description";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { Loader2 } from "lucide-react";
import SectionLoadingFallback from "../ui/SectionLoadingFallback";
import Footer from "../Home/Footer";

/**
 * Login page states
 */
type AuthType = "login" | "forgotPassword";

/**
 * LoginPage Component
 * Main login container with animated transitions between states
 */
const LoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authType, setAuthType] = useState<AuthType>("login");

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container relative mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Left side - Analytics description */}
        <section className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 h-auto lg:h-[calc(100vh-3rem)] mb-8 lg:mb-0 overflow-hidden rounded-2xl shadow-lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <Description />
          </Suspense>
        </section>

        {/* Right side - Login form */}
        <section className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex items-center justify-center h-auto">
          <div className="w-full px-5 py-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl transition-all border border-gray-100 dark:border-gray-800">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64"
                >
                  <SectionLoadingFallback variant="minimal" height="h-64" />
                </motion.div>
              ) : authType === "login" ? (
                <motion.div
                  key="login-form"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Login setAuth={setAuthType} />
                </motion.div>
              ) : (
                <motion.div
                  key="forgot-password"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ForgotPassword setAuth={setAuthType} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      {/* Footer with links */}
      <Footer />
    </div>
  );
};

export default LoginPage;
