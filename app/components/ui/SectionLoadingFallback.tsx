"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SectionLoadingFallbackProps {
  height?: string;
  message?: string;
  variant?: "default" | "overlay" | "minimal";
}

/**
 * A reusable loading fallback component for sections
 */
const SectionLoadingFallback: React.FC<SectionLoadingFallbackProps> = ({
  height = "h-full",
  message = "Loading",
  variant = "default",
}) => {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-center ${height}`}>
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (variant === "overlay") {
    return (
      <div className={`relative ${height} w-full`}>
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`w-full ${height} flex items-center justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl`}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
      </motion.div>
    </div>
  );
};

export default SectionLoadingFallback;
