"use client";
import { useCreateCollectionMutation } from "@/redux/features/collections/collectionsApi";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";

const CollectionForm = () => {
  const [createCollection, { isLoading, isSuccess, error }] =
    useCreateCollectionMutation();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Collection name is required"),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      await createCollection({ name: values.name }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Collection created successfully!");
      redirect("/en/dashboard/products/collections");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  if (isLoading) {
    <div className="w-full h-dvh flex items-center justufy-center">
      <h1 className="text-xl text-black dark:text-white">Loading.....</h1>
    </div>;
  }
  return (
    <div className="w-full md:w-2/3 mt-10 bg-white shadow dark:bg-black-100 transition-colors py-5 px-6">
      <div className="w-full">
        <h5 className="text-xl font-semibold font-Poppins text-black dark:text-white">
          Create Collection
        </h5>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Collection Name
            </label>
            <Field
              name="name"
              type="text"
              as={Input}
              placeholder="Enter collection name"
              className="w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <Button
            type="submit"
            className={`bg-blue-650 hover:bg-blue-600 text-white ${
              isLoading ? " cursor-progress" : " cursor-pointer"
            } min-w-32`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Collection"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CollectionForm;
