"use client";

import React, { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Check,
  X,
  ArrowLeft,
  Building,
  // Mail,
  // Phone,
} from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  useRegisterMutation,
  //useVerifyOtpMutation,
  useSocialAuthMutation,
  useActivationMutation,
} from "@/redux/features/auth/authApi";
import {
  US,
  GB,
  MA,
  FR,
  IN,
  DE,
  IT,
  ES,
  CN,
  JP,
} from "country-flag-icons/react/3x2";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { RegistrationType } from "./RegisterPage";

// Country codes with imported flag components
const countryCodes = [
  { code: "+1", country: "US", name: "United States", FlagComponent: US },
  { code: "+44", country: "UK", name: "United Kingdom", FlagComponent: GB },
  { code: "+212", country: "MA", name: "Morocco", FlagComponent: MA },
  { code: "+33", country: "FR", name: "France", FlagComponent: FR },
  { code: "+91", country: "IN", name: "India", FlagComponent: IN },
  { code: "+49", country: "DE", name: "Germany", FlagComponent: DE },
  { code: "+39", country: "IT", name: "Italy", FlagComponent: IT },
  { code: "+34", country: "ES", name: "Spain", FlagComponent: ES },
  { code: "+86", country: "CN", name: "China", FlagComponent: CN },
  { code: "+81", country: "JP", name: "Japan", FlagComponent: JP },
];

// Password strength requirements
const passwordRequirements = [
  { id: "length", text: "At least 8 characters", regex: /.{8,}/ },
  { id: "lowercase", text: "At least one lowercase letter", regex: /[a-z]/ },
  { id: "uppercase", text: "At least one uppercase letter", regex: /[A-Z]/ },
  { id: "number", text: "At least one number", regex: /[0-9]/ },
  {
    id: "special",
    text: "At least one special character",
    regex: /[^A-Za-z0-9]/,
  },
];

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  countryCode: Yup.string().required("Country code is required"),
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .min(8, "Mobile number must be at least 8 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  termsAccepted: Yup.boolean()
    .required("You must accept the Terms of Service and Privacy Policy")
    .oneOf([true], "You must accept the Terms of Service and Privacy Policy"),
  marketingConsent: Yup.boolean(),
});

// OTP verification schema
const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "OTP must contain only digits")
    .length(6, "OTP must be exactly 6 digits"),
});

// Social auth completion schema
const socialCompletionSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must contain only digits")
    .min(8, "Mobile number must be at least 8 digits")
    .required("Mobile number is required"),
  countryCode: Yup.string().required("Country code is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

// Store creation schema
const storeSchema = Yup.object().shape({
  storeName: Yup.string()
    .required("Store name is required")
    .min(3, "Store name must be at least 3 characters"),
  storeDescription: Yup.string()
    .required("Store description is required")
    .min(20, "Description must be at least 20 characters"),
  storeType: Yup.string().required("Please select a store type"),
  storeCategory: Yup.string().required("Please select a category"),
});

// Add these props to the component
interface RegisterContentProps {
  setTypeRegister: (type: RegistrationType) => void;
  method?: "email" | "social";
  initialData?: any;
  setRegistrationData?: (data: any) => void;
}

const RegisterContent: React.FC<RegisterContentProps> = ({
  setTypeRegister,
  method = "email",
  initialData,
  setRegistrationData,
}) => {
  const [show, setShow] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [activationToken, setActivationToken] = useState("");
  const [showSocialCompletion, setShowSocialCompletion] = useState(false);
  const [showStoreCreation, setShowStoreCreation] = useState(false);
  const [socialAuthData, setSocialAuthData] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  // API hooks
  const [
    register,
    {
      isSuccess: registerSuccess,
      error: registerError,
      isLoading: registerLoading,
    },
  ] = useRegisterMutation();
  const [
    activation,
    {
      isSuccess: activationSuccess,
      error: activationError,
      isLoading: activationLoading,
    },
  ] = useActivationMutation();
  const [
    socialAuth,
    { isSuccess: socialSuccess, error: socialError, isLoading: socialLoading },
  ] = useSocialAuthMutation();

  // If method is "social", use initialData to pre-fill form fields
  const [firstName, lastName] = initialData?.name?.split(" ") || ["", ""];

  // Regular registration form
  const formik = useFormik({
    initialValues: {
      firstName: method === "social" ? firstName : "",
      lastName: method === "social" ? lastName : "",
      email: method === "social" ? initialData?.email || "" : "",
      countryCode: "+212",
      country: "",
      mobile: "",
      password: "",
      termsAccepted: false,
      marketingConsent: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const name = `${values.firstName} ${values.lastName}`;
      const mobile = `${values.countryCode}${values.mobile}`;

      if (method === "email") {
        // Email registration flow
        try {
          const response = await register({
            name,
            email: values.email,
            mobile,
            password: values.password,
          }).unwrap();

          if (response.activationToken) {
            setActivationToken(response.activationToken);
            setRegistrationEmail(values.email);
            if (setRegistrationData) {
              setRegistrationData({
                email: values.email,
                password: values.password, // Store password for auto-login
                activationToken: response.activationToken,
              });
            }
            setTypeRegister("verify");
            toast.success("Please verify your email");
          }
        } catch (err) {
          // Error handling in useEffect
        }
      } else {
        // Social auth completion flow
        try {
          await socialAuth({
            name: name,
            email: initialData?.email,
            avatar: initialData?.avatar,
            mobile: mobile,
            password: values.password,
            isVerified: true, // Social auth users are automatically verified
          }).unwrap();

          // Success handling in useEffect
        } catch (err) {
          // Error handling in useEffect
        }
      }
    },
  });

  // Calculate password strength - Move this after formik is initialized
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    return passwordRequirements.filter((req) => req.regex.test(password))
      .length;
  };

  // Get password strength value - place this after formik initialization
  const passwordStrength = getPasswordStrength(formik.values.password);

  // Get color based on strength
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Social media login handlers
  const handleGoogleLogin = async () => {
    try {
      // Simulate successful Google login
      // In a real app, integrate with Google Auth API
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://i.pravatar.cc/300",
      };

      setSocialAuthData(userData);
      setShowSocialCompletion(true);
      toast.success("Please complete your profile");
    } catch (error) {
      toast.error("Google login failed");
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
      };

      setSocialAuthData(userData);
      setShowSocialCompletion(true);
      toast.success("Please complete your profile");
    } catch (error) {
      toast.error("Facebook login failed");
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
      };

      setSocialAuthData(userData);
      setShowSocialCompletion(true);
      toast.success("Please complete your profile");
    } catch (error) {
      toast.error("Apple login failed");
    }
  };

  // Social auth completion form
  const socialCompletionFormik = useFormik({
    initialValues: {
      countryCode: "+212",
      mobile: "",
      password: "",
    },
    validationSchema: socialCompletionSchema,
    onSubmit: async (values) => {
      if (!socialAuthData) return;

      try {
        const mobile = `${values.countryCode}${values.mobile}`;
        await socialAuth({
          name: socialAuthData.name,
          email: socialAuthData.email,
          avatar: socialAuthData.avatar,
          mobile: mobile,
          password: values.password,
        }).unwrap();

        // Social auth success will be handled in useEffect
      } catch (err) {
        // Error handling in useEffect
      }
    },
  });

  // OTP verification form
  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        await activation({
          activation_token: activationToken,
          activation_code: values.otp,
        }).unwrap();

        // Success handling in useEffect
      } catch (err) {
        // Error handling in useEffect
      }
    },
  });

  // Store creation form (shown after successful verification)
  const storeFormik = useFormik({
    initialValues: {
      storeName: "",
      storeDescription: "",
      storeType: "",
      storeCategory: "",
    },
    validationSchema: storeSchema,
    onSubmit: async (values) => {
      try {
        // Call your API to create store
        // For now we'll just show a success message
        toast.success("Store created successfully!");
        setTimeout(() => {
          window.location.href = "/en/dashboard";
        }, 2000);
      } catch (err) {
        toast.error("Failed to create store");
      }
    },
  });

  // Handle regular registration OTP verification success
  useEffect(() => {
    if (activationSuccess) {
      toast.success("Email verified successfully!");
      // Show store creation form
      setShowOtpForm(false);
      setShowStoreCreation(true);
    }

    if (activationError) {
      if ("data" in activationError) {
        const errorData = activationError as { data: { message: string } };
        toast.error(errorData.data.message || "Invalid OTP. Please try again.");
      }
    }
  }, [activationSuccess, activationError]);

  // Handle social auth success/error
  useEffect(() => {
    if (socialSuccess) {
      toast.success("Registration successful!");
      // Show store creation form or redirect to dashboard
      setTypeRegister("store");
    }

    if (socialError) {
      if ("data" in socialError) {
        const errorData = socialError as { data: { message: string } };
        toast.error(errorData.data.message || "Social login failed");
      }
    }
  }, [socialSuccess, socialError, setTypeRegister]);

  // Handle registration errors
  useEffect(() => {
    if (registerError) {
      if ("data" in registerError) {
        const errorData = registerError as { data: { message: string } };
        toast.error(errorData.data.message || "Registration failed");
      }
    }
  }, [registerError]);

  // Handle resending OTP
  const handleResendOtp = async () => {
    try {
      await register({
        email: registrationEmail,
        resendOtp: true,
      }).unwrap();
      toast.success("New OTP has been sent to your email");
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // Get current selected country data
  const currentCountry =
    countryCodes.find((c) => c.code === values.countryCode) || countryCodes[0];
  const FlagComponent = currentCountry.FlagComponent;

  // Social completion selected country
  const socialCurrentCountry =
    countryCodes.find(
      (c) => c.code === socialCompletionFormik.values.countryCode
    ) || countryCodes[0];
  const SocialFlagComponent = socialCurrentCountry.FlagComponent;

  // Store Creation Form
  if (showStoreCreation) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-3">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-2xl text-center font-semibold text-black dark:text-white">
            Create Your Store
          </h1>
          <p className="text-center text-sm text-gray-500">
            Set up your store details to start selling
          </p>
        </div>

        <form
          onSubmit={storeFormik.handleSubmit}
          className="w-full mt-6 space-y-6"
        >
          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="storeName"
            >
              Store Name
            </label>
            <div className="relative mt-1.5">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={storeFormik.values.storeName}
                onChange={storeFormik.handleChange}
                placeholder="My Amazing Store"
                className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] pl-10 pr-3.5 border ${
                  storeFormik.errors.storeName && storeFormik.touched.storeName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } transition-all focus:ring-2`}
              />
            </div>
            {storeFormik.errors.storeName && storeFormik.touched.storeName && (
              <span className="text-sm text-red-500 mt-1 block">
                {storeFormik.errors.storeName}
              </span>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="storeDescription"
            >
              Store Description
            </label>
            <textarea
              id="storeDescription"
              name="storeDescription"
              value={storeFormik.values.storeDescription}
              onChange={storeFormik.handleChange}
              rows={4}
              placeholder="Describe what your store sells and what makes it unique..."
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg p-3.5 border ${
                storeFormik.errors.storeDescription &&
                storeFormik.touched.storeDescription
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
            />
            {storeFormik.errors.storeDescription &&
              storeFormik.touched.storeDescription && (
                <span className="text-sm text-red-500 mt-1 block">
                  {storeFormik.errors.storeDescription}
                </span>
              )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="storeType"
              >
                Store Type
              </label>
              <select
                id="storeType"
                name="storeType"
                value={storeFormik.values.storeType}
                onChange={storeFormik.handleChange}
                className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                  storeFormik.errors.storeType && storeFormik.touched.storeType
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } mt-1.5 transition-all focus:ring-2`}
              >
                <option value="">Select Type</option>
                <option value="physical">Physical Products</option>
                <option value="digital">Digital Products</option>
                <option value="services">Services</option>
                <option value="hybrid">Hybrid</option>
              </select>
              {storeFormik.errors.storeType &&
                storeFormik.touched.storeType && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {storeFormik.errors.storeType}
                  </span>
                )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="storeCategory"
              >
                Category
              </label>
              <select
                id="storeCategory"
                name="storeCategory"
                value={storeFormik.values.storeCategory}
                onChange={storeFormik.handleChange}
                className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                  storeFormik.errors.storeCategory &&
                  storeFormik.touched.storeCategory
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } mt-1.5 transition-all focus:ring-2`}
              >
                <option value="">Select Category</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="home">Home & Garden</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="health">Health & Wellness</option>
                <option value="food">Food & Beverage</option>
                <option value="art">Art & Crafts</option>
                <option value="books">Books & Media</option>
                <option value="other">Other</option>
              </select>
              {storeFormik.errors.storeCategory &&
                storeFormik.touched.storeCategory && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {storeFormik.errors.storeCategory}
                  </span>
                )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg flex items-center justify-center py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors shadow-md hover:shadow-lg mt-4"
          >
            Create Store & Continue
          </button>
        </form>
      </div>
    );
  }

  // Social Auth Completion Form
  if (showSocialCompletion && socialAuthData) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-3">
        <div className="w-full flex flex-col gap-2 mb-4">
          <button
            onClick={() => setTypeRegister("method-select")}
            className="flex items-center gap-1 text-sm text-blue-600 mb-2 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to registration options</span>
          </button>

          <h1 className="text-2xl text-center font-semibold text-black dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-center text-sm text-gray-500">
            Just a few more details needed
          </p>

          <div className="flex flex-col items-center mt-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src={initialData?.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-medium">{initialData?.name}</p>
            <p className="text-sm text-gray-500">{initialData?.email}</p>
          </div>
        </div>

        <form onSubmit={socialCompletionFormik.handleSubmit} className="w-full">
          {/* Phone field */}
          <div className="mb-4">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <div className="mt-1.5 flex">
              <div className="relative">
                <select
                  name="countryCode"
                  value={socialCompletionFormik.values.countryCode}
                  onChange={socialCompletionFormik.handleChange}
                  className="h-[45px] appearance-none rounded-l-lg pl-10 pr-8 py-2 border border-r-0 border-gray-300 focus:border-blue-500 bg-white dark:bg-black-100 text-black dark:text-white cursor-pointer min-w-country-code"
                  title="Select country code"
                >
                  {countryCodes.map((country) => (
                    <option
                      key={country.code}
                      value={country.code}
                      className="flex items-center gap-1"
                    >
                      {country.code}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SocialFlagComponent className="h-4 w-6" />
                </div>
              </div>
              <input
                type="tel"
                name="mobile"
                value={socialCompletionFormik.values.mobile}
                onChange={socialCompletionFormik.handleChange}
                id="socialMobile"
                placeholder="612345678"
                className={`outline-none w-full text-black dark:text-white bg-transparent rounded-r-lg h-[45px] px-3.5 border ${
                  socialCompletionFormik.errors.mobile &&
                  socialCompletionFormik.touched.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } transition-all focus:ring-2`}
              />
            </div>
            {socialCompletionFormik.errors.mobile &&
              socialCompletionFormik.touched.mobile && (
                <span className="text-sm text-red-500 mt-1 block">
                  {socialCompletionFormik.errors.mobile}
                </span>
              )}
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="socialPassword"
            >
              Create Password
            </label>
            <div className="relative mt-1.5">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={socialCompletionFormik.values.password}
                onChange={socialCompletionFormik.handleChange}
                id="socialPassword"
                placeholder="••••••••"
                className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                  socialCompletionFormik.errors.password &&
                  socialCompletionFormik.touched.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } pr-10 transition-all focus:ring-2`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeOff className="text-gray-500 dark:text-gray-400 h-5 w-5" />
                ) : (
                  <Eye className="text-gray-500 dark:text-gray-400 h-5 w-5" />
                )}
              </button>
            </div>
            {socialCompletionFormik.errors.password &&
              socialCompletionFormik.touched.password && (
                <span className="text-sm text-red-500 mt-1 block">
                  {socialCompletionFormik.errors.password}
                </span>
              )}
          </div>

          <button
            type="submit"
            disabled={socialLoading}
            className="w-full rounded-lg flex items-center justify-center py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            {socialLoading ? "Processing..." : "Complete Registration"}
          </button>
        </form>
      </div>
    );
  }

  // OTP verification form
  if (showOtpForm) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-3">
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={() => setShowOtpForm(false)}
            className="flex items-center gap-1 text-sm text-blue-600 mb-2"
          >
            <ArrowLeft size={16} />
            <span>Back to registration</span>
          </button>

          <h1 className="text-2xl text-center font-semibold text-black dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-center text-sm text-gray-500">
            We've sent a 6-digit verification code to{" "}
            <span className="font-medium">{registrationEmail}</span>
          </p>
        </div>

        <form
          onSubmit={otpFormik.handleSubmit}
          className="w-full max-w-md mt-6"
        >
          <div className="mb-6">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
              htmlFor="otp"
            >
              Enter OTP Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              maxLength={6}
              value={otpFormik.values.otp}
              onChange={otpFormik.handleChange}
              className={`outline-none w-full text-center tracking-[0.5em] text-xl text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                otpFormik.errors.otp && otpFormik.touched.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
              placeholder="• • • • • •"
            />
            {otpFormik.errors.otp && otpFormik.touched.otp && (
              <span className="text-sm text-red-500 mt-1 block">
                {otpFormik.errors.otp}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={activationLoading}
            className={`w-full rounded-lg flex items-center justify-center py-4 text-base font-semibold text-white ${
              activationLoading
                ? "bg-blue-600/80 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } transition-colors shadow-md hover:shadow-lg`}
          >
            {activationLoading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={registerLoading}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {registerLoading ? "Sending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }

  // Normal email registration form (the existing form)
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-full flex items-center justify-center flex-col gap-2 p-3"
    >
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => setTypeRegister("method-select")}
          className="flex items-center gap-1 text-sm text-blue-600 mb-2 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to registration options</span>
        </button>

        <h1 className="text-2xl text-center font-semibold text-black dark:text-white">
          Create your account
        </h1>
        <p className="text-center text-sm text-gray-500">
          Join our community and start selling online
        </p>
      </div>

      <div className="w-full flex flex-col mt-4 gap-4">
        {/* Social Media Login - Enhanced UI */}
        <div className="w-full mb-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="relative h-12 overflow-hidden bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                <span className="hidden xs:block text-sm font-medium">
                  Google
                </span>
              </div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-400 via-red-500 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            <Button
              type="button"
              onClick={handleFacebookLogin}
              variant="outline"
              className="relative h-12 overflow-hidden bg-white hover:bg-blue-50 text-gray-700 border border-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-full">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="#1877F2"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="hidden xs:block text-sm font-medium">
                  Facebook
                </span>
              </div>
              <div className="absolute top-0 right-0 w-1 h-full bg-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            <Button
              type="button"
              onClick={handleAppleLogin}
              variant="outline"
              className="relative h-12 overflow-hidden bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center w-full">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                <span className="hidden xs:block text-sm font-medium">
                  Apple
                </span>
              </div>
              <div className="absolute top-0 right-0 w-1 h-full bg-black opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center my-5">
          <div className="absolute border-t border-gray-300 w-full"></div>
          <span className="relative bg-white dark:bg-black-100 px-4 text-sm text-gray-500 rounded-md">
            Or register with email
          </span>
        </div>

        {/* Rest of the form fields */}
        {/* Name fields - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              id="firstName"
              placeholder="John"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                errors.firstName && touched.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
            />
            {errors.firstName && touched.firstName && (
              <span className="text-sm text-red-500 mt-1 block">
                {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Doe"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                errors.lastName && touched.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 transition-all focus:ring-2`}
            />
            {errors.lastName && touched.lastName && (
              <span className="text-sm text-red-500 mt-1 block">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email field */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="example@gmail.com"
            className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
              errors.email && touched.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } mt-1.5 transition-all focus:ring-2`}
          />
          {errors.email && touched.email && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone field with enhanced country code selector using flag components */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <div className="mt-1.5 flex">
            <div className="relative">
              <select
                name="countryCode"
                value={values.countryCode}
                onChange={handleChange}
                className="h-[45px] appearance-none rounded-l-lg pl-10 pr-8 py-2 border border-r-0 border-gray-300 focus:border-blue-500 bg-white dark:bg-black-100 text-black dark:text-white cursor-pointer min-w-country-code"
                title="Select country code"
              >
                {countryCodes.map((country) => {
                  // const CountryFlag = country.FlagComponent;
                  return (
                    <option
                      key={country.code}
                      value={country.code}
                      className="flex items-center gap-1"
                    >
                      {country.code}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FlagComponent className="h-4 w-6" />
              </div>
            </div>
            <input
              type="tel"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              id="mobile"
              placeholder="612345678"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-r-lg h-[45px] px-3.5 border ${
                errors.mobile && touched.mobile
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } transition-all focus:ring-2`}
            />
          </div>
          {/* Country name helper text */}
          <div className="mt-1 text-xs text-gray-500">
            {currentCountry.name || ""}
          </div>
          {errors.mobile && touched.mobile && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.mobile}
            </span>
          )}
        </div>

        {/* Password field */}
        <div>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="••••••••"
              className={`outline-none w-full text-black dark:text-white bg-transparent rounded-lg h-[45px] px-3.5 border ${
                errors.password && touched.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } mt-1.5 pr-10 transition-all focus:ring-2`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center top-[7px]"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="text-gray-500 dark:text-gray-400 h-5 w-5" />
              ) : (
                <Eye className="text-gray-500 dark:text-gray-400 h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password strength meter */}
          {values.password && (
            <div className="mt-2">
              <div className="flex items-center">
                <div className="h-1.5 flex-grow bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor()} rounded-full transition-all`}
                    style={{
                      width: `${
                        (passwordStrength / passwordRequirements.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="ml-2 text-xs font-medium">
                  {passwordStrength <= 1 && "Weak"}
                  {passwordStrength > 1 && passwordStrength <= 3 && "Medium"}
                  {passwordStrength > 3 && "Strong"}
                </span>
              </div>

              {/* Password requirements */}
              <ul className="mt-2 space-y-1">
                {passwordRequirements.map((req) => (
                  <li key={req.id} className="flex items-center text-xs">
                    {req.regex.test(values.password) ? (
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <X className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        req.regex.test(values.password)
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {errors.password && touched.password && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Policy consent checkboxes */}
        <div className="space-y-4 mt-2">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={values.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="termsAccepted"
                className="text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
              {errors.termsAccepted && touched.termsAccepted && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.termsAccepted}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="marketingConsent"
                name="marketingConsent"
                type="checkbox"
                checked={values.marketingConsent}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="marketingConsent"
                className="text-gray-700 dark:text-gray-300"
              >
                I agree to receive marketing communications from Your Company
              </label>
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <button
            type="submit"
            disabled={registerLoading}
            className={`w-full rounded-lg flex items-center justify-center py-4 text-base font-semibold text-white ${
              registerLoading
                ? "bg-blue-600/80 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } transition-colors shadow-md hover:shadow-lg`}
          >
            {registerLoading ? "Creating Account..." : "Create Your Account"}
          </button>
        </div>

        <div className="w-full flex items-center mt-4 justify-center">
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              title="login"
              href="/en/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterContent;
