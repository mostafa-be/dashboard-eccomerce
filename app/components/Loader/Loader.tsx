"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    const loadingPhrases = [
      "Initializing",
      "Loading assets",
      "Preparing dashboard",
      "Almost ready",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingPhrases.length;
      setLoadingText(loadingPhrases[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 flex flex-col items-center justify-center space-y-8">
      {/* Logo and Name */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl"
            animate={{
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.div
            className="relative w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 1.1, 0.9, 1],
              rotate: [0, 0, 5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Zap className="h-9 w-9 text-white" />
          </motion.div>
        </div>

        <motion.h2
          className="text-3xl font-bold text-gray-800 dark:text-white mb-1"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Nextora
          <span className="text-blue-600">.</span>
        </motion.h2>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full my-2"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Loading Bar */}
      <div className="w-64 sm:w-80 flex flex-col items-center">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.p
          className="text-sm text-gray-700 dark:text-gray-300 mt-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {loadingText}...
        </motion.p>
      </div>

      {/* Bottom text */}
      <motion.div
        className="absolute bottom-6 text-xs text-gray-500 dark:text-gray-400 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>© {new Date().getFullYear()} Nextora</p>
        <p className="mt-1">Complete E-commerce SaaS Platform</p>
      </motion.div>
    </section>
  );
};

export default Loader;
