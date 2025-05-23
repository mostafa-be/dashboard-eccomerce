"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";
import { useCreateBrandMutation } from "@/redux/features/brand/brandsApi";
import Image from "next/image";
import { ImageUp } from "lucide-react";

const BrandForm = () => {
  const [logo, setLogo] = React.useState<string | ArrayBuffer | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [createBrand, { isLoading, isSuccess, error }] =
    useCreateBrandMutation();

  const initialValues = {
    name: "",
    logo: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Brand name is required"),
  });
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      await createBrand({ ...values, logo }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Brand created successfully!");
      redirect("/en/dashboard/products/brands");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full md:w-2/3 mt-10 bg-white shadow dark:bg-black-100 transition-colors py-5 px-6">
      <div className="w-full">
        <h5 className="text-xl font-semibold font-Poppins text-black dark:text-white">
          Create Brand
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
              Brand Name
            </label>
            <Field
              name="name"
              type="text"
              as={Input}
              placeholder="Enter brand name"
              className="w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                dragging ? "bg-blue-500" : "bg-transparent"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {logo ? (
                <Image
                  src={logo as string}
                  title="selected image from clipboard..."
                  alt="Selected"
                  layout="responsive"
                  width={500}
                  height={500}
                  className="max-h-full w-full object-cover"
                />
              ) : (
                <div className="w-full px-5 py-5 flex flex-col items-center justify-center">
                  <ImageUp
                    size={60}
                    className="text-gray-800 dark:text-white rotate-180"
                  />
                  <span className="text-gray-800 dark:text-white">
                    Drag and drop your thumbnail here or click to browse
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className="w-full flex items-center justify-end">
            {" "}
            <Button
              type="submit"
              className={`bg-blue-650 hover:bg-blue-600 text-white ${
                isLoading ? " cursor-progress" : " cursor-pointer"
              } min-w-32`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Brand"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BrandForm;
