"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Home,
  Search,
  RefreshCw,
  Terminal,
  SatelliteDish,
  Compass,
} from "lucide-react";
import { useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("error");

  const router = useRouter();
  const locale = useLocale();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute h-full w-full">
          <motion.div
            className="absolute w-[800px] h-[800px] border border-blue-300/20 dark:border-blue-500/10 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 100,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] border border-blue-300/20 dark:border-blue-500/10 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8 }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 80,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] border border-blue-300/20 dark:border-blue-500/10 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 bg-blue-400 dark:bg-blue-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full relative z-10"
      >
        {/* Main content */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center">
            {/* Illustration */}
            <motion.div
              className="mx-auto relative h-48 w-48 mb-6"
              variants={itemVariants}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <div className="absolute -inset-3 rounded-full bg-blue-600/10 animate-pulse" />
                  <motion.div
                    className="absolute -inset-8"
                    variants={orbitVariants}
                    animate="animate"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <SatelliteDish className="h-5 w-5 text-blue-600" />
                    </div>
                  </motion.div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-full text-white shadow-lg">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Compass className="h-20 w-20" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="mb-2">
              <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 inline-block">
                {t("message404") || "404"}
              </h1>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3"
            >
              {t("notFound") || "Page not found"}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
            >
              {t("description") ||
                "The page you're looking for doesn't exist or has been moved to a different location."}
            </motion.p>

            {/* Navigation options */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <Link
                href={`/${locale}`}
                className="group flex items-center justify-center gap-2 py-3 px-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t("goHome") || "Home"}</span>
              </Link>

              <button
                onClick={() => router.back()}
                className="group flex items-center justify-center gap-2 py-3 px-5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
              >
                <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t("goBack") || "Go Back"}</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="group flex items-center justify-center gap-2 py-3 px-5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
              >
                <RefreshCw className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">
                  {t("tryAgain") || "Try Again"}
                </span>
              </button>
            </motion.div>

            {/* Search bar */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-md mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t("search") || "Search for content..."}
                  className="pl-10 w-full py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Easter egg terminal */}
        <motion.div variants={itemVariants} className="mt-6 mx-auto max-w-md">
          <div className="bg-gray-900 rounded-lg p-3 shadow-inner text-xs text-green-500 font-mono">
            <div className="flex mb-1 items-center">
              <Terminal size={14} className="mr-2" />
              <span>terminal</span>
            </div>
            <div className="space-y-1">
              <p>
                &gt;{" "}
                <span className="typing-animation">
                  Searching for requested page...
                </span>
              </p>
              <p>&gt; Error: Page not found in the current dimension</p>
              <p>
                &gt; <span className="blinking-cursor">_</span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid #22c55e;
          white-space: nowrap;
          animation: typing 3s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #22c55e;
          }
        }

        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
