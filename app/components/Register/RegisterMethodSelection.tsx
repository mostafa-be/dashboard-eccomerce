"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

interface RegisterMethodSelectionProps {
  setRegisterType: (type: string) => void;
  setRegistrationData: (data:any) => void;
}

const RegisterMethodSelection: React.FC<RegisterMethodSelectionProps> = ({
  setRegisterType,
  setRegistrationData,
}) => {
  // Social media login handlers
  const handleGoogleLogin = async () => {
    try {
      // Simulate successful Google login
      // In a real app, integrate with Google Auth API
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://i.pravatar.cc/300",
        isFromSocial: true,
      };

      setRegistrationData(userData);
      setRegisterType("social");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Simulate successful Facebook login
      // In a real app, integrate with Facebook Auth API
      const userData = {
        name: "Jane Smith",
        email: "janesmith@example.com",
        avatar: "https://i.pravatar.cc/301",
        isFromSocial: true,
      };

      setRegistrationData(userData);
      setRegisterType("social");
    } catch (error) {
      console.error("Facebook login failed", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // Simulate successful Apple login
      // In a real app, integrate with Apple Auth API
      const userData = {
        name: "Alex Johnson",
        email: "alexjohnson@example.com",
        avatar: "https://i.pravatar.cc/302",
        isFromSocial: true,
      };

      setRegistrationData(userData);
      setRegisterType("social");
    } catch (error) {
      console.error("Apple login failed", error);
    }
  };

  const handleEmailRegistration = () => {
    setRegistrationData({ isFromSocial: false });
    setRegisterType("email");
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8 p-3">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Join Nextora
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Choose how you'd like to register
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md space-y-4"
      >
        {/* Social login options */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 p-4 rounded-xl transition-all shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <div className="flex-1 text-center">Continue with Google</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 p-4 rounded-xl transition-all shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
          onClick={handleFacebookLogin}
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <div className="flex-1 text-center">Continue with Facebook</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 p-4 rounded-xl transition-all shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
          onClick={handleAppleLogin}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          <div className="flex-1 text-center">Continue with Apple</div>
        </motion.button>

        <div className="relative flex items-center justify-center my-5">
          <div className="absolute border-t border-gray-300 w-full"></div>
          <span className="relative bg-white dark:bg-gray-900 px-4 text-sm text-gray-500 rounded-md">
            Or
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all shadow-sm hover:shadow-md"
          onClick={handleEmailRegistration}
        >
          <Mail size={18} />
          <div>Register with Email</div>
          <ArrowRight className="ml-1" size={18} />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-4"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/en/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterMethodSelection;
