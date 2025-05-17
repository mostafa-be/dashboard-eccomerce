import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { IPrivacy } from "@/app/@types/types";
import { useFormik } from "formik";
import { useUpdatePrivacyUserMutation } from "@/redux/features/users/usersApi";
import { toast } from "react-hot-toast";

/**
 * Privacy Component
 * Allows users to manage privacy-related settings such as profile visibility, search engine indexing,
 * online status, friend requests, and message permissions. Uses Card UI components, Formik for form state,
 * and shows toast notifications on update success or error.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
  privacy?: IPrivacy;
};

const Privacy = ({ sectionRefs, privacy }: Props) => {
  const [updatePrivacyUser, { isSuccess, error, isLoading }] =
    useUpdatePrivacyUserMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Privacy settings updated successfully!");
    if (error) toast.error("Failed to update privacy settings.");
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      profileVisibility: privacy?.profileVisibility === "private",
      searchEngineIndexing: !!privacy?.searchEngineIndexing,
      showOnlineStatus: !!privacy?.showOnlineStatus,
      allowFriendRequests: !!privacy?.allowFriendRequests,
      allowMessagesFrom: privacy?.allowMessagesFrom || "everyone",
    },
    onSubmit: (values) => {
      // Convert profileVisibility back to string value
      const data = {
        privacy: {
          ...values,
          profileVisibility: values.profileVisibility ? "private" : "public",
        },
      };
      console.log(data);
      updatePrivacyUser(data);
    },
    enableReinitialize: true,
  });

  return (
    <Card
      ref={(el) =>
        (sectionRefs.current["privacy"] = el as HTMLDivElement | null)
      }
      id="privacy"
      className="scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-gray-200 dark:border-gray-800 shadow p-4 sm:p-6 md:p-8 w-full space-y-6 mx-auto"
    >
      <HeaderCard>
        <TitleCard
          title="Privacy"
          className="text-xl font-bold text-blue-700 dark:text-blue-300 "
        />
      </HeaderCard>
      <CardContent>
        <form
          className="flex flex-col space-y-4"
          onSubmit={formik.handleSubmit}
        >
          {/* Profile Visibility */}
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="profileVisibility"
              checked={formik.values.profileVisibility}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Make my profile private
            </span>
          </label>
          {/* Search Engine Indexing */}
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="searchEngineIndexing"
              checked={formik.values.searchEngineIndexing}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Allow search engines to index my profile
            </span>
          </label>
          {/* Online Status */}
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="showOnlineStatus"
              checked={formik.values.showOnlineStatus}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Show online status
            </span>
          </label>
          {/* Friend Requests */}
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="allowFriendRequests"
              checked={formik.values.allowFriendRequests}
              onChange={formik.handleChange}
              className="accent-blue-600 w-5 h-5 rounded-lg cursor-pointer"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Allow friend requests
            </span>
          </label>
          {/* Allow Messages From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Allow messages from
            </label>
            <Select
              name="allowMessagesFrom"
              value={formik.values.allowMessagesFrom}
              onValueChange={(value) =>
                formik.setFieldValue("allowMessagesFrom", value)
              }
            >
              <SelectTrigger className="w-max min-w-52">
                <SelectValue placeholder="Select who can message you" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="noone">No one</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-150"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Privacy Settings"}
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Privacy;
