"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, Package, BarChart4, Sparkles } from "lucide-react";

export default function StoreLoadingSkeleton() {
  // Animation sequence steps
  const steps = [
    {
      id: 1,
      text: "Loading store configuration...",
      icon: Building,
      color: "text-blue-500",
    },
    {
      id: 2,
      text: "Preparing store templates...",
      icon: Package,
      color: "text-purple-500",
    },
    {
      id: 3,
      text: "Initializing analytics...",
      icon: BarChart4,
      color: "text-indigo-500",
    },
    {
      id: 4,
      text: "Setting up your dashboard...",
      icon: Sparkles,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl border border-gray-100 dark:border-gray-800">
        {/* Logo animation */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-16 h-16 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="relative z-10 text-white font-bold text-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Building className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2"
        >
          Creating Your Store
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-8"
        >
          We&#39;re setting up everything you need to start selling
        </motion.p>

        {/* Progress steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                className={`flex-shrink-0 h-10 w-10 rounded-full ${
                  index === 0
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-gray-100 dark:bg-gray-800"
                } flex items-center justify-center`}
                animate={
                  index === 0
                    ? {
                        scale: [1, 1.05, 1],
                        backgroundColor: [
                          "rgba(219, 234, 254, 1)",
                          "rgba(191, 219, 254, 1)",
                          "rgba(219, 234, 254, 1)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <step.icon
                  className={`h-5 w-5 ${
                    index === 0
                      ? step.color
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
              </motion.div>

              <div className="flex-grow">
                <div className="flex justify-between">
                  <span
                    className={`text-sm font-medium ${
                      index === 0
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.text}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 py-1 px-2 rounded">
                      In progress
                    </span>
                  )}
                </div>

                {index === 0 && (
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-1.5 w-full rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      initial={{ width: "10%" }}
                      animate={{ width: "65%" }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-10 p-4 border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 rounded-lg"
        >
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Tip: Getting Started
          </h3>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            After setup, customize your store appearance, add your products, and
            connect payment methods to start accepting orders.
          </p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute top-10 right-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-blue-500/5"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>

        <div className="absolute bottom-10 left-10">
          <motion.div
            className="w-16 h-16 rounded-full bg-purple-500/5"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
}
