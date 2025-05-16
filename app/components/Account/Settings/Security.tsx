import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { ISecurity } from "@/app/@types/types";
import { useUpdateSecurityUserMutation } from "@/redux/features/users/usersApi";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

/**
 * Security Component
 * Renders security settings using Card components and Input.
 * Handles update with useUpdateSecurityUserMutation and toast notifications.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  security?: ISecurity;
};

const Security = ({ sectionRefs, security }: Props) => {
  const [updateSecurityUser, { isSuccess, error, isLoading }] =
    useUpdateSecurityUserMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Security settings updated successfully!");
    if (error) toast.error("Failed to update security settings.");
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
    <Card
      ref={(el) =>
        (sectionRefs.current["security"] = el as HTMLDivElement | null)
      }
      id="security"
      className="mb-16 scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full mx-auto"
    >
      <HeaderCard>
        <TitleCard
          title="Security"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4"
        />
      </HeaderCard>
      <CardContent>
        <form
          className="flex flex-col space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="twoFactorAuth"
              checked={formik.values.twoFactorAuth}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Two-Factor Authentication
            </span>
          </label>
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="loginAlerts"
              checked={formik.values.loginAlerts}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Login alerts
            </span>
          </label>
          {/* Backup Codes */}
          {security?.backupCodes && security.backupCodes.length > 0 && (
            <div>
              <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
          {/* Recent Devices */}
          {security?.recentDevices && security.recentDevices.length > 0 && (
            <div>
              <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Recent Devices
              </span>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {security.recentDevices.map((dev, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded px-2 py-1"
                  >
                    <span>{dev.device}</span>
                    <span className="text-[11px] text-gray-400">
                      {dev.lastActive
                        ? new Date(dev.lastActive).toLocaleString()
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Trusted Devices */}
          {security?.trustedDevices && security.trustedDevices.length > 0 && (
            <div>
              <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Trusted Devices
              </span>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {security.trustedDevices.map((dev, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-800 rounded px-2 py-1"
                  >
                    {dev}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Security Settings"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default Security;
