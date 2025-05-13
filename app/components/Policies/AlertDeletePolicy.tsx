import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  useDeletePolicyByTypeMutation,
  useGetAllPoliciesQuery,
} from "@/redux/features/policies/policiesApi";

/**
 * AlertDeletePolicy Component
 * Displays a confirmation dialog for deleting a policy by type.
 *
 * @param {AlertDeletePolicyProps} props - The component props.
 * @param {string} props.type - The type of the policy to delete.
 * @returns {JSX.Element} The rendered delete confirmation dialog.
 */
type AlertDeletePolicyProps = {
  type: string;
};

export function AlertDeletePolicy({ type }: AlertDeletePolicyProps) {
  const [deletePolicy, { isLoading, isSuccess, isError, error }] =
    useDeletePolicyByTypeMutation();
  const { refetch } = useGetAllPoliciesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Policy deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete policy.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeletePolicy = async () => {
    if (!isLoading) {
      await deletePolicy(type);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="!p-0 !m-0 !shadow-none !outline-none !bg-transparent flex items-center gap-2 text-red-600 hover:!text-red-800 border-none"
        >
          <Trash2 size={25} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            policy and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePolicy}
            className="bg-blue-650 hover:bg-blue-600 dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
