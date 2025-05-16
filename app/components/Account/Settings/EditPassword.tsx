import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import { useFormik } from "formik";
import { useUpdatePasswordUserMutation } from "@/redux/features/users/usersApi";
import { toast } from "react-hot-toast";

/**
 * EditPassword Component
 * Renders a simple, modern password change form using Card components and Formik validation.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
};

const validate = (values: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const errors: Partial<typeof values> = {};

  // Strong password regex: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;

  if (!values.oldPassword) {
    errors.oldPassword = "Old password is required";
  }
  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (!strongPassword.test(values.newPassword)) {
    errors.newPassword =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your new password";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

const EditPassword = ({ sectionRefs }: Props) => {
  const [updatePasswordUser, { isSuccess, error, isLoading }] =
    useUpdatePasswordUserMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      updatePasswordUser({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      // resetForm will be called in useEffect on success
    },
  });

  // Reset form on success and show toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
      formik.resetForm();
    }
    if (error) toast.error("Failed to update password.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  return (
    <Card
      ref={(el) =>
        (sectionRefs.current["password"] = el as HTMLDivElement | null)
      }
      id="password"
      className="mb-16 scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-6 max-w-full mx-auto"
    >
      <HeaderCard>
        <TitleCard
          title="Password"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4"
        />
      </HeaderCard>
      <CardContent>
        <form
          className="flex flex-col space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                className={`block w-full rounded-lg border ${
                  formik.touched.oldPassword && formik.errors.oldPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition`}
                placeholder="Old password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <div className="text-xs text-red-600 mt-1">
                  {formik.errors.oldPassword}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className={`block w-full rounded-lg border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition`}
                placeholder="New password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-xs text-red-600 mt-1">
                  {formik.errors.newPassword}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`block w-full rounded-lg border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition`}
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-xs text-red-600 mt-1">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start md:items-end justify-end pt-4 space-y-2">
        <div className="w-full text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            Password requirements:
          </span>
          <ul className="list-disc ml-5 mt-1 space-y-0.5">
            <li>
              At least <span className="font-semibold">8 characters</span>
            </li>
            <li>
              At least <span className="font-semibold">one uppercase</span> and{" "}
              <span className="font-semibold">one lowercase</span> letter
            </li>
            <li>
              At least <span className="font-semibold">one number</span>
            </li>
            <li>
              At least <span className="font-semibold">one symbol</span> (e.g.
              !@#$%^&amp;*)
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
          disabled={isLoading}
          onClick={formik.submitForm}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default EditPassword;
