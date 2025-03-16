"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";
import { useCreateColorMutation } from "@/redux/features/colors/colorsApi";

const ColorForm = () => {
  const [createColor, { isLoading, isSuccess, error }] =
    useCreateColorMutation();

  const initialValues = {
    name: "",
    code: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Color name is required"),
    code: Yup.string().required("Color code is required"),
  });

  const handleSubmit = async (
    values: { name: string; code: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      await createColor({ name: values.name, code: values.code }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Color created successfully!");
      redirect("/en/dashboard/products/colors");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <h1 className="text-xl text-black dark:text-white">Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 mt-10 bg-white shadow dark:bg-black-100 transition-colors py-5 px-6">
      <div className="w-full">
        <h5 className="text-xl font-semibold font-Poppins text-black dark:text-white">
          Create Color
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
              Color Name
            </label>
            <Field
              name="name"
              type="text"
              as={Input}
              placeholder="Enter color name"
              className="w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Color Code
            </label>
            <Field name="code" type="color" as={Input} className="w-full" />
            <ErrorMessage
              name="code"
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
            {isLoading ? "Creating..." : "Create Color"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ColorForm;
