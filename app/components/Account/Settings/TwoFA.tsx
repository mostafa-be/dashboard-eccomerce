import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { ISecurity } from "@/app/@types/types";
import { useUpdateSecurityUserMutation } from "@/redux/features/users/usersApi";
import { toast } from "react-hot-toast";

/**
 * TwoFA Component
 * Renders a 2FA settings card with Formik and all relevant security settings.
 * Uses Input and Button components for best practices.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  security?: ISecurity;
};

const TwoFA = ({  security }: Props) => {
  const [updateSecurityUser, { isSuccess, error, isLoading }] =
    useUpdateSecurityUserMutation();

  useEffect(() => {
    if (isSuccess) toast.success("2FA settings updated successfully!");
    if (error) toast.error("Failed to update 2FA settings.");
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      twoFactorAuth: !!security?.twoFactorAuth,
      loginAlerts: !!security?.loginAlerts,
    },
    onSubmit: (values) => {
      updateSecurityUser(values);
    },
    enableReinitialize: true,
  });

  return (
    <div id="2fa" className="scroll-mt-32 w-full space-y-10 mx-auto">
      <Card className="bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full">
        <HeaderCard>
          <TitleCard
            title="Two-Factor Authentication (2FA)"
            className="text-xl font-bold text-blue-700 dark:text-blue-300"
          />
        </HeaderCard>
        <CardContent>
          <form
            className="flex flex-col space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add an extra layer of security to your account by enabling
                two-factor authentication.
              </p>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={formik.values.twoFactorAuth}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Enable Two-Factor Authentication</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <Input
                  type="checkbox"
                  name="loginAlerts"
                  checked={formik.values.loginAlerts}
                  onChange={formik.handleChange}
                  className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                />
                <span>Login Alerts</span>
              </label>
            </div>
            {/* Optionally show backup codes, trusted devices, etc. */}
            {security?.backupCodes && security.backupCodes.length > 0 && (
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Backup Codes
                </span>
                <ul className="text-xs text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-1">
                  {security.backupCodes.map((code, idx) => (
                    <li
                      key={idx}
                      className="font-mono bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
                    >
                      {code}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-end ">
          <Button
            type="submit"
            onClick={() => formik.submitForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save 2FA Settings"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TwoFA;
