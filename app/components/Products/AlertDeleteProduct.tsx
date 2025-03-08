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
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/productsApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

type AlertDeleteProductProps = {
  _id: string;
};

export function AlertDeleteProduct({ _id }: AlertDeleteProductProps) {
  const [deleteProduct, { isLoading, isSuccess, isError, error }] =
    useDeleteProductMutation();
  const { refetch, isFetching, isUninitialized } = useGetAllProductsQuery(
    {},
    { skip: true, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfully!");
      if (!isFetching && !isUninitialized) {
        refetch();
      }
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete product.");
      }
    }
  }, [isSuccess, isError, error, refetch, isFetching, isUninitialized]);

  const handleDeleteProduct = async () => {
    if (!isLoading) {
      refetch();
      await deleteProduct(_id);

      alert("products Deleted su")
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="!p-0 !m-0 !shadow-none !outline-none !bg-transparent flex items-center gap-2 text-red-600 hover:!text-red-800 border-none"
        >
          <Trash2 />
          <span className="">Delete Product</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteProduct()}
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
