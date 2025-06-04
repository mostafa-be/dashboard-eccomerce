"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Description from "../Home/Description";
import RegisterContent from "./RegisterContent";
import Verification from "./Verification";
import RegisterMethodSelection from "./RegisterMethodSelection";
import SectionLoadingFallback from "../ui/SectionLoadingFallback";
import Footer from "../Home/Footer";
import { Loader2 } from "lucide-react";

/**
 * Registration flow types
 */
export type RegistrationType =
  | "method-select"
  | "email"
  | "social"
  | "verify"
  | "store";

/**
 * Custom hook for registration page animations
 */
export const useRegistrationMotion = () => {
  // Main content animation variants
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

  // Page transition animation variants
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Loading animation variants
  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return {
    contentVariants,
    pageTransition,
    loadingVariants,
  };
};

/**
 * RegisterPage Component
 * Main registration container that handles different registration states
 */
const RegisterPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [registerType, setRegisterType] =
    useState<RegistrationType>("method-select");
  const [registrationData, setRegistrationData] = useState<any>(null);

  // Get motion variants from our custom hook
  const { contentVariants, loadingVariants } =
    useRegistrationMotion();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container relative mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Left side - Analytics description */}
        <section className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 h-auto lg:h-[calc(100vh-3rem)] mb-8 lg:mb-0 overflow-hidden rounded-2xl shadow-lg">
          <Suspense
            fallback={
              <SectionLoadingFallback message="Loading presentation..." />
            }
          >
            <Description />
          </Suspense>
        </section>

        {/* Right side - Registration form */}
        <section className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex items-center justify-center h-auto">
          <div className="w-full px-5 py-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl transition-all border border-gray-100 dark:border-gray-800">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div
                  key="loading"
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex justify-center items-center h-64"
                >
                  <SectionLoadingFallback variant="minimal" height="h-64" />
                </motion.div>
              ) : registerType === "method-select" ? (
                <motion.div
                  key="register-method"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <RegisterMethodSelection
                    setRegisterType={setRegisterType}
                    setRegistrationData={setRegistrationData}
                  />
                </motion.div>
              ) : registerType === "email" ? (
                <motion.div
                  key="register-email"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <RegisterContent
                    setTypeRegister={setRegisterType}
                    method="email"
                    initialData={registrationData}
                    setRegistrationData={setRegistrationData}
                  />
                </motion.div>
              ) : registerType === "social" ? (
                <motion.div
                  key="register-social"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <RegisterContent
                    setTypeRegister={setRegisterType}
                    method="social"
                    initialData={registrationData}
                    setRegistrationData={setRegistrationData}
                  />
                </motion.div>
              ) : registerType === "verify" ? (
                <motion.div
                  key="register-verify"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Verification
                    setTypeRegister={setRegisterType}
                    email={registrationData?.email}
                    registrationData={registrationData}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register-fallback"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex justify-center items-center h-64"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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

export default RegisterPage;
