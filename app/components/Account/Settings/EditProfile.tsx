import { User } from "@/app/@types/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useUpdateProfileUserMutation } from "@/redux/features/users/usersApi";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

/**
 * EditProfile Component
 * Renders a profile edit form with avatar, name, email, and mobile fields.
 * Uses Formik for validation and handles update with toast notifications.
 */
type Props = {
  user?: User;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
};

const validate = (values: { name: string; email: string; mobile: string }) => {
  const errors: Partial<typeof values> = {};
  if (!values.name) errors.name = "Name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\+?\d{7,15}$/.test(values.mobile)) {
    errors.mobile = "Invalid mobile number";
  }
  return errors;
};

const EditProfile = ({ sectionRefs, user }: Props) => {
  const [updateProfileUser, { isSuccess, error, isLoading }] =
    useUpdateProfileUserMutation();
  const { name, email, avatar, mobile } = user || {};
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    avatar?.url || "/default-avatar.png"
  );

  useEffect(() => {
    if (isSuccess) toast.success("Profile updated successfully!");
    if (error) toast.error("Failed to update profile.");
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: name || "",
      email: email || "",
      mobile: mobile || "",
    },
    validate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload: {
        name: string;
        email: string;
        mobile: string;
        avatar?: string | ArrayBuffer | null;
      } = { ...values };
      if (typeof image === "string" && image !== avatar?.url) {
        payload.avatar = image;
      }
      await updateProfileUser(payload);
    },
  });

  return (
    <Card
      ref={(el) =>
        (sectionRefs.current["profile"] = el as HTMLDivElement | null)
      }
      id="profile"
      className="bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-6 md:p-8 w-full mx-auto scroll-mt-32"
    >
      <HeaderCard>
        <TitleCard
          title="Profile"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4"
        />
      </HeaderCard>

      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative">
          <Image
            src={
              typeof image === "string"
                ? image
                : avatar?.url || "/default-avatar.png"
            }
            alt={`avatar of ${formik.values.name || "user"}`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border-2 border-blue-400 dark:border-blue-700 object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 cursor-pointer shadow transition"
            title="Change avatar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"
              />
            </svg>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              title="Upload avatar"
              placeholder="Upload avatar"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setImage(ev.target?.result || null);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input
              type="text"
              name="name"
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-xs text-red-600">{formik.errors.name}</div>
            )}
          </div>
          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              name="email"
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number
            </label>
            <Input
              type="tel"
              name="mobile"
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Your mobile number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-xs text-red-600">{formik.errors.mobile}</div>
            )}
          </div>
          <CardFooter className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
