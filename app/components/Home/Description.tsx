"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import { Users, BarChart4, Facebook, LayoutTemplate, Clock, CreditCard, 
  ArrowRight, Zap, Layers, Sparkles, LineChart, ChevronUp, ChevronDown, Check } from "lucide-react";

// Dynamically import chart components with no SSR to avoid hydration issues
const DynamicChartComponents = dynamic(() => import('./DynamicChartComponents'), {
  ssr: false,
  loading: () => <div className="w-full h-[220px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
});

/**
 * Template data interface
 */
interface Template {
  name: string;
  image: string;
  category: string;
  features: string[];
}

/**
 * Pricing plan interface
 */
interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
}

/**
 * Analytics stat item interface
 */
interface StatItem {
  stage: string;
  count: number;
  growth: number;
}

/**
 * Description Component - Main marketing display for Nextora SaaS platform
 */
const Description = () => {
  // Sample analytics data
  const conversionData = [
    { name: "Visitors", value: 10000 },
    { name: "Product Views", value: 6500 },
    { name: "Add to Cart", value: 3700 },
    { name: "Checkouts", value: 2200 },
    { name: "Orders", value: 1800 },
  ];

  const revenueData = [
    { name: "Week 1", value: 2400 },
    { name: "Week 2", value: 3200 },
    { name: "Week 3", value: 4300 },
    { name: "Week 4", value: 5800 },
  ];

  // Template preview data
  const templates: Template[] = [
    {
      name: "Startup Launch",
      image: "https://placehold.co/300x200/f9fafb/475569?text=Startup+Template",
      category: "SaaS",
      features: [
        "Lead generation",
        "Product showcase",
        "Customer testimonials",
      ],
    },
    {
      name: "Digital Marketplace",
      image: "https://placehold.co/300x200/f0f9ff/0369a1?text=Digital+Products",
      category: "SaaS",
      features: [
        "Subscription management",
        "Digital downloads",
        "Member access",
      ],
    },
    {
      name: "D2C Brand",
      image: "https://placehold.co/300x200/fdf2f8/be185d?text=D2C+Template",
      category: "E-commerce",
      features: ["Brand storytelling", "Product customization", "Social proof"],
    },
  ];

  // Pricing tiers
  const plans: PricingPlan[] = [
    {
      name: "Bootstrap",
      price: "$29",
      period: "/month",
      features: ["Perfect for MVPs", "Core features", "Community support"],
    },
    {
      name: "Seed",
      price: "$79",
      period: "/month",
      features: ["Growing startups", "Advanced analytics", "Priority support"],
    },
    {
      name: "Scale",
      price: "Custom",
      period: "",
      features: [
        "For funded startups",
        "Enterprise features",
        "Dedicated success manager",
      ],
    },
  ];

  // Customer journey stats
  const statItems: StatItem[] = [
    { stage: "Website Visitors", count: 1243, growth: 12 },
    { stage: "Active Carts", count: 156, growth: 8 },
    { stage: "Purchases Today", count: 43, growth: -2 },
  ];

  // Client-side only state with stable SSR rendering
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("analytics");
  const [animatingNumber, setAnimatingNumber] = useState(0);
  const [pricingHover, setPricingHover] = useState<number | null>(null);

  /**
   * Initialize visibility and counter animation on mount
   */
  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);
    setIsVisible(true);

    // Start animations only on client side
    const interval = setInterval(() => {
      setAnimatingNumber((prev) => {
        if (prev >= 50000) {
          clearInterval(interval);
          return 50000;
        }
        return prev + 1000;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  /**
   * Handle tab section changes
   * @param section - The section to activate (analytics, templates, pricing)
   */
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className=" transform  overflow-hidden w-full !h-full bg-gradient-to-br from-black-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 lg:rounded-2xl p-4 sm:p-6 flex flex-col z-10">
      {/* Logo and Header */}
      <div className="flex justify-between items-start mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="mb-2 sm:mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl"
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
                className="relative z-10 text-white font-bold text-xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <Zap className="h-7 w-7 text-white" />
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nextora<span className="text-blue-600">.</span>
            </h1>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300">
            The E-commerce Platform for Modern Startups
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
            Launch and scale your online business in minutes, not months.
            Nextora combines powerful analytics, beautiful templates, and
            seamless payments in one intuitive platform built for growth.
          </p>
        </motion.div>

        <motion.div
          className="hidden md:flex text-xs bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 rounded-full py-1 px-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="font-semibold">$2.4M+</span> processed
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={() => handleSectionChange("analytics")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSection === "analytics"
              ? "bg-blue-600 text-white"
              : "bg-white/80 text-gray-700 hover:bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <BarChart4 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => handleSectionChange("templates")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSection === "templates"
              ? "bg-blue-600 text-white"
              : "bg-white/80 text-gray-700 hover:bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          <span>Templates</span>
        </button>
        <button
          onClick={() => handleSectionChange("pricing")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeSection === "pricing"
              ? "bg-blue-600 text-white"
              : "bg-white/80 text-gray-700 hover:bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Pricing</span>
        </button>
      </motion.div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {/* Analytics Section */}
        {activeSection === "analytics" && (
          <motion.div
            key="analytics"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 overflow-hidden"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4 lg:mb-6"
            >
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Facebook size={18} className="text-blue-600" />
                    <span>Growth Engine</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Optimized acquisition with integrated marketing tools
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-xs font-medium text-blue-700 dark:text-blue-300 mt-2 sm:mt-0">
                  Real-time data
                </div>
              </div>

              {/* Replace with dynamic import to avoid hydration mismatch */}
              {isClient ? (
                <DynamicChartComponents 
                  chartType="conversion" 
                  data={conversionData} 
                />
              ) : (
                <div className="w-full h-[220px]"></div>
              )}

              {/* Key performance metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-2">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Avg Conversion
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-blue-600">
                    3.8x Higher
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Customer Acq.
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-blue-600">
                    -42% Cost
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Time Savings
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-blue-600">
                    20hrs/week
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ROI
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-blue-600">
                    295%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary analytics sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Revenue Chart */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <LineChart className="w-4 h-4 text-green-500" />
                    <span>Monthly Revenue</span>
                  </h3>
                  <div className="flex items-center text-green-600 text-xs font-medium">
                    <ChevronUp className="w-3 h-3" />
                    <span>+24%</span>
                  </div>
                </div>

                {/* Replace with dynamic import */}
                {isClient ? (
                  <DynamicChartComponents 
                    chartType="revenue" 
                    data={revenueData} 
                  />
                ) : (
                  <div className="h-[130px]"></div>
                )}

                <div className="mt-2 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    $12,840
                  </div>
                  <div className="text-xs text-gray-500">
                    Monthly recurring revenue
                  </div>
                </div>
              </motion.div>

              {/* Customer Journey Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Customer Journey</span>
                  </h3>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                    Realtime
                  </span>
                </div>

                <div className="space-y-2 mt-4">
                  {statItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/30 rounded"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.stage}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {item.count.toLocaleString()}
                        </span>
                        <div
                          className={`flex items-center text-xs ${
                            item.growth >= 0 ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {item.growth >= 0 ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                          <span>{Math.abs(item.growth)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-xs text-gray-500 flex items-center justify-between">
                    <span>Average order value:</span>
                    <span className="text-blue-600 font-medium">$78.90</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Templates Section */}
        {activeSection === "templates" && (
          <motion.div
            key="templates"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 overflow-hidden"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5" />
                <span>Beautiful, Conversion-Optimized Templates</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Start selling in minutes with pre-built templates designed to
                convert visitors into customers
              </p>
            </motion.div>

            {/* Template cards */}
            <motion.div
              variants={itemVariants}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="h-[160px] overflow-hidden">
                    <motion.img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {template.category}
                        </span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    </div>
                    <div className="mt-3 space-y-1">
                      {template.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                        >
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 py-1.5 px-3 text-xs rounded-lg bg-blue-600 text-white w-full flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors">
                      <span>Preview Template</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Banner */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl text-white"
            >
              <div>
                <h3 className="font-medium">Launch Your Startup in 24 Hours</h3>
                <p className="text-sm text-blue-100">
                  Join 1,200+ founders who built their online presence with
                  Nextora
                </p>
              </div>
              <button className="mt-3 sm:mt-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-blue-50 transition-colors">
                <Layers className="h-4 w-4" />
                <span>Start Building</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Pricing Section */}
        {activeSection === "pricing" && (
          <motion.div
            key="pricing"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 overflow-hidden"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Startup-Friendly Pricing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Scale as you grow with transparent pricing. No hidden fees, no
                surprises.
              </p>
            </motion.div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative bg-white dark:bg-gray-800 p-5 rounded-xl border ${
                    index === 1
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() => setPricingHover(index)}
                  onMouseLeave={() => setPricingHover(null)}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-5">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {plan.name}
                    </h4>
                    <div className="mt-2 flex items-end justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-500 mb-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-2 rounded-lg text-sm font-medium ${
                      index === 1
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    } transition-colors`}
                  >
                    {index === 2 ? "Contact Sales" : "Start Free Trial"}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Benefits Section */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Startup Benefits
                  </h4>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-300">
                  Exclusive for early-stage startups
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Qualifying startups can receive up to 90% off for the first
                year, plus free migration and onboarding.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-center">
                  <span className="text-xs text-gray-500">Weekly</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Bug Fixes
                  </p>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-center">
                  <span className="text-xs text-gray-500">Monthly</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Updates
                  </p>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-center">
                  <span className="text-xs text-gray-500">Quarterly</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    New Features
                  </p>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-center">
                  <span className="text-xs text-gray-500">Yearly</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Major Upgrades
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile counter - Only render on client side */}
      {isClient && (
        <motion.div
          className="md:hidden bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 rounded-full py-1 px-3 text-xs text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="font-semibold">
            {animatingNumber.toLocaleString()}+
          </span>{" "}
          founders trust Nextora
        </motion.div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
        <motion.div
          className="w-64 h-64 rounded-full bg-blue-500"
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

      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 opacity-10">
        <motion.div
          className="w-48 h-48 rounded-full bg-purple-500"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>

      {isClient && (
        <motion.div
          className="absolute right-10 top-40 opacity-20 hidden lg:block"
          animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Sparkles className="h-24 w-24 text-blue-400" />
        </motion.div>
      )}
    </div>
  );
};

export default Description;
