import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { useFormik } from "formik";
import { useUpdateNotificationOptionUserMutation } from "@/redux/features/users/usersApi";
import { toast } from "react-hot-toast";
import { INotificationsOptions } from "@/app/@types/types";

/**
 * Notifications Component
 * Renders notification preferences using Card components, Input, and space-y for spacing.
 * Handles update with useUpdateNotificationOptionUserMutation and toast notifications.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  notificationsOptions?: INotificationsOptions;
  refetch: () => void;
};

const Notifications = ({
  sectionRefs,
  notificationsOptions,
  refetch,
}: Props) => {
  const [updateNotificationOptionUser, { isSuccess, error, isLoading }] =
    useUpdateNotificationOptionUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Notification settings updated successfully!");
      refetch();
    }
    if (error) toast.error("Failed to update notification settings.");
  }, [isSuccess, error, refetch]);

  const formik = useFormik({
    initialValues: {
      marketing: !!notificationsOptions?.marketing,
      productUpdates: !!notificationsOptions?.productUpdates,
      reminders: !!notificationsOptions?.reminders,
    },
    onSubmit: (values) => {
      const data = {
        notificationsOptions: {
          ...values,
          marketing: values.marketing,
          productUpdates: values.productUpdates,
          reminders: values.reminders,
        },
      };
      updateNotificationOptionUser(data);
    },
    enableReinitialize: true,
  });

  return (
    <Card
      ref={(el) =>
        (sectionRefs.current["notifications"] = el as HTMLDivElement | null)
      }
      id="notifications"
      className="mb-16 scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full space-y-6 mx-auto"
    >
      <HeaderCard>
        <TitleCard
          title="Notifications"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 "
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
              name="marketing"
              checked={formik.values.marketing}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Marketing notifications
            </span>
          </label>
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="productUpdates"
              checked={formik.values.productUpdates}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Product updates
            </span>
          </label>
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="reminders"
              checked={formik.values.reminders}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">Reminders</span>
          </label>
          <CardFooter className="flex items-center justify-end ">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Notifications"}
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Notifications;
