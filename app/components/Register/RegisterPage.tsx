"use client";

import React, { Suspense, useState, useEffect } from "react";
import Description from "../Home/Description";
import RegisterContent from "./RegisterContent";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container relative mx-auto min-h-dvh flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Left side - Analytics description */}
        <section className=" sticky top-1/2 -translate-y-1/2 order-2 lg:order-1 lg:col-span-7 xl:col-span-7 h-auto lg:h-[calc(100dvh-8rem)] mb-8 lg:mb-0 overflow-hidden rounded-2xl shadow-lg">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-2xl">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            }
          >
            <Description />
          </Suspense>
        </section>

        {/* Right side - Registration form */}
        <section className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex items-center justify-center h-auto">
          <div className="w-full  px-5 py-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl transition-all border border-gray-100 dark:border-gray-800">
            {isLoaded ? (
              <RegisterContent />
            ) : (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer with links */}
      <footer className="py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
