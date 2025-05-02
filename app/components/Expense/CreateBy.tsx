import React from "react";
import { User } from "../Customers/columns";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type Props = {
  user: User;
};

/**
 * CreateBy Component
 * Displays detailed information about the user who created the expense.
 *
 * @param {Props} props - The props for the component.
 * @param {User} props.user - The user data.
 */
const CreateBy = ({ user }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Created By
      </h3>
      <div className="mt-4 flex items-center gap-4">
        {/* User Avatar */}
        <Avatar>
          {user.avatar?.url ? (
            <AvatarImage src={user.avatar.url} alt={user.name} />
          ) : (
            <AvatarFallback>
              {user.name?.slice(0, 1).toUpperCase() || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        {/* User Information */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Name:</strong> {user.name || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Email:</strong> {user.email || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Mobile:</strong> {user.mobile || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Role:</strong> {user.role || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Functionality:</strong> {user.functionality || "N/A"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Blocked:</strong> {user.isBlocked ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Additional Information 
      <div className="mt-6 space-y-2">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
          Additional Information
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Address Count:</strong> {user.address?.length || 0}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Cart Items:</strong> {user.cart?.length || 0}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Wishlist Items:</strong> {user.wishlist?.length || 0}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Compared Items:</strong> {user.compared?.length || 0}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Total Orders:</strong> {user.orders?.length || 0}
        </p>
      </div>*/}
    </div>
  );
};

export default CreateBy;
