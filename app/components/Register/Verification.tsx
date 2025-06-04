"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useActivationMutation,
  useLoginMutation,
} from "@/redux/features/auth/authApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Loader2,
  // X,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { RegistrationType } from "./RegisterPage";

type Props = {
  setTypeRegister: (type: RegistrationType) => void;
  setAuth?: (type: string) => void;
  email?: string;
  registrationData?: {
    email: string;
    password?: string; // Make sure password is included in registration data
  };
};

const Verification: FC<Props> = ({
  setTypeRegister,
  setAuth,
  email,
  registrationData,
}) => {
  // Choose the appropriate function based on which prop is available
  const navigate = React.useCallback(
    (page: string) => {
      if (setTypeRegister) setTypeRegister(page as RegistrationType);
      if (setAuth) setAuth(page);
    },
    [setTypeRegister, setAuth]
  );

  // Get token from Redux store
  const { token } = useSelector(
    (state: { auth: { token: string } }) => state.auth
  );

  // API mutations
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [login, { isSuccess: loginSuccess, error: loginError }] =
    useLoginMutation();

  // States for UI interactions
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Create state for the 4 OTP digits
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);

  // Create refs for input fields to control focus
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Handle input change for OTP digits
  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the OTP digit at specified index
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(0, 1); // Ensure only one digit
    setOtpDigits(newOtpDigits);

    // Clear any existing errors
    if (isError) setIsError(false);

    // Auto-focus next input if this one is filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Check if all digits are filled to auto-submit
    if (value && index === 3) {
      // If the last digit is filled, all digits should be filled
      if (newOtpDigits.every((digit) => digit)) {
        setTimeout(() => handleVerifyOtp(newOtpDigits), 300);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (!otpDigits[index]) {
        // If current input is empty and backspace is pressed, focus and clear previous input
        if (index > 0) {
          const newOtpDigits = [...otpDigits];
          newOtpDigits[index - 1] = "";
          setOtpDigits(newOtpDigits);
          inputRefs[index - 1].current?.focus();
        }
      } else {
        // Clear current digit
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = "";
        setOtpDigits(newOtpDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle paste event for all 4 digits at once
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only allow digits and limit to 4 characters
    const cleanedData = pastedData.replace(/\D/g, "").slice(0, 4);
    if (!cleanedData) return;

    // Fill the OTP digits with the pasted data
    const newOtpDigits = [...otpDigits];

    for (let i = 0; i < 4; i++) {
      if (i < cleanedData.length) {
        newOtpDigits[i] = cleanedData[i];
      } else {
        newOtpDigits[i] = "";
      }
    }

    setOtpDigits(newOtpDigits);

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newOtpDigits.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current?.focus();
    } else {
      inputRefs[3].current?.focus();
      setTimeout(() => handleVerifyOtp(newOtpDigits), 300);
    }
  };

  // Automatically login the user after successful verification
  const handleAutoLogin = React.useCallback(async () => {
    // Check if we have the email and password
    if (!registrationData?.email || !registrationData?.password) {
      // If no email/password, just redirect to the store page
      navigate("store");
      return;
    }

    setIsLoggingIn(true);

    try {
      // Call login mutation with email and password
      await login({
        email: registrationData.email,
        password: registrationData.password,
      }).unwrap();

      // Login success will be handled in useEffect
    } catch (err) {
      console.error("Auto login failed:", err);
      // Even if login fails, redirect to store page
      navigate("store");
    } finally {
      setIsLoggingIn(false);
    }
  }, [registrationData?.email, registrationData?.password, login, navigate]);

  // Verify OTP submission
  const handleVerifyOtp = async (digits = otpDigits) => {
    // Check if all digits are filled
    if (digits.some((digit) => !digit)) {
      setIsError(true);
      setErrorMessage("Please enter all 4 digits");
      inputRefs[digits.findIndex((digit) => !digit)].current?.focus();
      return;
    }

    setIsSubmitted(true);

    try {
      const otpCode = digits.join("");

      // Call the activation API
      await activation({
        activation_token: token,
        activation_code: otpCode,
      }).unwrap();

      // Success handling will be done in the useEffect below
      setIsVerified(true);
    } catch {
      setIsError(true);
      setErrorMessage("Invalid verification code");
      setIsSubmitted(false);
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    setIsSendingOtp(true);
    try {
      // Here you would call your API to resend the OTP
      // For now we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear existing OTP inputs and errors
      setOtpDigits(["", "", "", ""]);
      setIsError(false);

      // Focus the first input
      inputRefs[0].current?.focus();

      toast.success("New verification code sent to your email");
    } catch {
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Auto-focus first input on component mount
  useEffect(() => {
    inputRefs[0].current?.focus();
    // inputRefs is a stable array, so it's safe to omit from dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle activation API success/error responses
  useEffect(() => {
    let autoLoginTimeout: NodeJS.Timeout;

    if (isSuccess && !isLoggingIn) {
      toast.success("Email verified successfully!");
      setIsVerified(true);

      // Use a timeout to prevent immediate state changes in the same render cycle
      autoLoginTimeout = setTimeout(() => {
        // Start auto login process only if we haven't started it already
        handleAutoLogin();
      }, 500);
    }

    if (error) {
      if ("data" in error) {
        interface ErrorDataType {
          data?: {
            message?: string;
          };
        }
        const errorData = error as ErrorDataType;
        setErrorMessage(errorData.data?.message || "Invalid verification code");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setIsError(true);
      setIsSubmitted(false);

      // Clear inputs on error
      setOtpDigits(["", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    }

    // Cleanup timeout to prevent memory leaks
    return () => {
      if (autoLoginTimeout) clearTimeout(autoLoginTimeout);
    };
  }, [isSuccess, error, handleAutoLogin, inputRefs, isLoggingIn]);

  // Handle login API success/error responses
  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;

    if (loginSuccess) {
      toast.success("Login successful! Redirecting to dashboard...");
      // Redirect to dashboard after successful login
      redirectTimeout = setTimeout(() => {
        window.location.href = "/en/dashboard";
      }, 1000);
    }

    if (loginError) {
      console.log("Login error, continuing to store creation");
      // Add a small delay to prevent potential update loop
      redirectTimeout = setTimeout(() => {
        navigate("store");
      }, 100);
    }

    return () => {
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [loginSuccess, loginError, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const inputVariants = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
    error: {
      x: [-5, 5, -5, 5, -2, 2, -1, 1, 0],
      transition: { duration: 0.5 },
    },
    success: {
      scale: [1, 1.08, 1],
      transition: { duration: 0.4 },
    },
  };

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-3">
      {/* Header Section */}
      <div className="w-full flex flex-col gap-2">
        <motion.button
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("email")}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors w-fit"
          aria-label="Back to registration"
          disabled={isSubmitted || isVerified}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </motion.button>

        {isVerified ? (
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center mt-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <ShieldCheck className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Successful
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {isLoggingIn
                ? "Logging you in automatically..."
                : "Your email has been verified. Redirecting..."}
            </p>
            {isLoggingIn && (
              <div className="mt-4">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
              </div>
            )}
          </motion.div>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-center font-bold text-gray-900 dark:text-white"
            >
              Enter Verification Code
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-gray-500 dark:text-gray-400"
            >
              We&apos;ve sent a 4-digit code to{" "}
              <span className="font-medium">
                {email || registrationData?.email || "your email"}
              </span>
            </motion.p>
          </>
        )}
      </div>

      {/* OTP Input Section */}
      {!isVerified && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xs mx-auto mt-8"
        >
          <div className="flex justify-center space-x-4">
            {otpDigits.map((digit, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={inputVariants}
                animate={isError ? "error" : digit ? "success" : "visible"}
                custom={index}
              >
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  aria-label={`Digit ${index + 1}`}
                  disabled={isSubmitted || isVerified}
                  className={`w-14 h-16 text-center text-2xl font-bold rounded-lg border-2 outline-none transition-all duration-200
                    ${
                      isError
                        ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20"
                        : digit
                        ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-300"
                    }
                    focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed`}
                />

                {/* Success indicator */}
                <AnimatePresence>
                  {digit && !isError && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -bottom-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2 mt-3 text-red-500"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verify Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => handleVerifyOtp()}
            disabled={isSubmitted || otpDigits.some((d) => !d)}
            className={`w-full mt-8 py-3.5 rounded-lg flex items-center justify-center text-base font-semibold transition-all
              ${
                isSubmitted
                  ? "bg-blue-500/70 cursor-wait text-white"
                  : otpDigits.some((d) => !d)
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md hover:shadow-lg"
              }
            `}
          >
            {isSubmitted ? (
              <span className="flex items-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </motion.button>

          {/* Resend Code Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn&apos;t receive a code?
            </p>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isSendingOtp || isSubmitted}
              className="mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Sending new code...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Resend verification code
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Verification;
