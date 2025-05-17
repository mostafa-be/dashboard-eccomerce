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
import { Formik } from "formik";
import { ISecurity } from "@/app/@types/types";
import { toast } from "react-hot-toast";
import { useUpdateSecurityUserMutation } from "@/redux/features/users/usersApi";

/**
 * TwoFA Component
 * Allows users to enable/disable two-factor authentication and login alerts.
 * Uses Formik for form state, Input/Button components for UI, and shows toast notifications on update.
 */
type Props = {
  sectionRefs?: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  security?: ISecurity;
  refetch: () => void;
};

const TwoFA = ({ security, refetch }: Props) => {
  const [updateSecurityUser, { isSuccess, error, isLoading }] =
    useUpdateSecurityUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("2FA settings updated successfully!");
      refetch();
    }
    if (error) toast.error("Failed to update 2FA settings.");
  }, [isSuccess, error, refetch]);

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
          <Formik
            initialValues={{
              twoFactorAuth: !!security?.twoFactorAuth,
              loginAlerts: !!security?.loginAlerts,
            }}
            enableReinitialize
            onSubmit={(values) => {
              console.log("Form values:", values);
              updateSecurityUser({
                twoFactorAuth: values.twoFactorAuth,
                loginAlerts: values.loginAlerts,
              });
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Add an extra layer of security to your account by enabling
                    two-factor authentication.
                  </p>
                  <label className="inline-flex items-center gap-2">
                    <Input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={values.twoFactorAuth}
                      onChange={handleChange}
                      className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                    />
                    <span>Enable Two-Factor Authentication</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <Input
                      type="checkbox"
                      name="loginAlerts"
                      checked={values.loginAlerts}
                      onChange={handleChange}
                      className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
                    />
                    <span>Login Alerts</span>
                  </label>
                </div>
                {/* Optionally show backup codes */}
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
                <CardFooter className="flex items-center justify-end ">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save 2FA Settings"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFA;
