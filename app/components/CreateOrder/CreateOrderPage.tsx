"use client";

import React from "react";
import { redirect } from "next/navigation";
import ChangerExporter from "../ui/ChangerExporter";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useGetAllCustomersQuery } from "@/redux/features/users/usersApi";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import SelectedProducts from "./SelectedProducts";
import SelectedUser from "./SelectedUser";
import Address from "./Address";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * CreateOrderPage Component
 * Displays the page for creating a new order, including product and customer selection.
 */

const CreateOrderPage = () => {
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [selectedProducts, setSelectedProducts] = React.useState<
    {
      product: string;
      color: string;
      size: string;
      quantity: number;
      price: number;
    }[]
  >([]);
  const [address, setAddress] = React.useState<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>();
  const [method, setMethod] = React.useState<string>("Cash on Delivery");

  // Fetch products data
  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllProductsQuery({}, { refetchOnMountOrArgChange: true });

  // Fetch customers data
  const {
    data: dataCustomers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    error: errorCustomers,
    refetch: refetchCustomers,
  } = useGetAllCustomersQuery({}, { refetchOnMountOrArgChange: true });

  // Fetch create order mutation
  const [createOrder, { isLoading, isSuccess, error, data }] =
    useCreateOrderMutation();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("order created successfully!");
      setSelectedProducts([]);
      setSelectedUserId(null);
      setAddress(undefined);
      setMethod("Cash on Delivery");
      redirect(`/en/dashboard/orders/${data?.order?._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    setSelectedProducts,
    setSelectedUserId,
    setAddress,
    setMethod,
    data,
  ]);
  // Handle loading state
  if (isLoadingProducts || isLoadingCustomers) {
    return <LoadingList />;
  }

  // Handle error state
  if (isErrorProducts || isErrorCustomers) {
    const errorMessage =
      (isErrorProducts && errorProducts?.data?.message) ||
      (isErrorCustomers && errorCustomers?.data?.message) ||
      "An error occurred while loading data.";
    return (
      <LoadingError
        message={errorMessage}
        onRetry={() => {
          refetchProducts();
          refetchCustomers();
        }}
      />
    );
  }

  // Handle create order
  const handleCreateOrder = async () => {
    if (selectedUserId && selectedProducts.length > 0 && address) {
      try {
        const response = await createOrder({
          user: selectedUserId,
          shippingInfo: address,
          orderItems: selectedProducts,
          method: method,
          totalPrice: selectedProducts.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
        }).unwrap();

        //const { order } = await response;
        //redirect(`/en/dashboard/orders/${order?._id}`);

        //console.log(response);
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "data" in error &&
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data
        ) {
          toast.error((error.data as { message: string }).message);
        } else {
          toast.error("Failed to create order. Please try again.");
        }
      }
    } else {
      toast.error("Please select a user, products, and provide an address.");
    }
  };

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Orders", url: "/en/dashboard/orders" },
  ];
  const methods = [
    "Cash on Delivery",
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Stripe",
    "Razorpay",
    "Bank Transfer",
    "Google Pay",
    "Apple Pay",
    "Amazon Pay",
    "Payoneer",
    "Cryptocurrency",
    "Gift Card",
    "Cash",
    "Cheque",
    "Money Order",
    "Wire Transfer",
    "Western Union",
    "Alipay",
    "WeChat Pay",
    "Venmo",
  ];
  const products = dataProducts?.products || [];
  const customers = dataCustomers?.customers || [];

  return (
    <section className="w-full space-y-10">
      {/* Navigation Links */}
      <ChangerExporter links={links} active="Create Order" />

      {/* Product Selection */}
      <SelectedProducts
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        products={products}
      />

      {/* Customer Selection */}
      <SelectedUser
        customers={customers}
        setSelectedUserId={setSelectedUserId}
        selectedUserId={selectedUserId}
      />

      {/* Address Information*/}
      <Address isSuccess={isSuccess} setAddress={setAddress} />

      {/* Payment Method*/}
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-nowrap">
          Payment Method:
        </label>
        <Select value={method} onValueChange={(value) => setMethod(value)}>
          <SelectTrigger className="min-w-52 max-w-96 py-2 px-3 border rounded-md bg-white dark:bg-black-100">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent className="dark:bg-black-200">
            {methods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          type="button"
          onClick={handleCreateOrder}
          disabled={isLoading}
        >
          {isLoading ? "Creating Order..." : "Create Order"}
        </button>
      </div>

      {/* Order Summary */}
    </section>
  );
};

export default CreateOrderPage;
