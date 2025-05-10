"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Banner, Product } from "@/app/@types/types";
import { Textarea } from "../ui/textarea";
import {
  useCreateBannerMutation,
  useEditBannerMutation,
} from "@/redux/features/banners/bannersApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

/**
 * BannerForm Component
 * Handles the creation or editing of a banner with fields for selecting a product, uploading images, and entering text.
 *
 * @param {BannerFormProps} props - The component props.
 * @param {Product[]} props.products - List of products to select from.
 * @param {boolean} [props.isEdit] - Flag to indicate if the form is for editing.
 * @param {Banner} [props.banner] - Banner data for editing (if applicable).
 * @returns {JSX.Element} The rendered banner form component.
 */
type BannerFormProps = {
  products: Product[];
  isEdit?: boolean;
  banner?: Banner;
};

const BannerForm = ({ products, banner, isEdit }: BannerFormProps) => {
  const [imageMobile, setImageMobile] = useState<string | ArrayBuffer | null>(
    banner?.imageMobile?.url || null
  );
  const [imageDesktop, setImageDesktop] = useState<string | ArrayBuffer | null>(
    banner?.imageDesktop?.url || null
  );

  const [
    createBanner,
    { isSuccess: isCreateSuccess, error: createError, isLoading: isCreating },
  ] = useCreateBannerMutation();
  const [
    editBanner,
    { isSuccess: isEditSuccess, error: editError, isLoading: isEditing },
  ] = useEditBannerMutation();

  const initialValues = {
    product: banner?.product || "",
    title: banner?.title || "",
    subdescription: banner?.subdescription || "",
  };

  const validationSchema = Yup.object({
    product: Yup.string().required("Product is required"),
    title: Yup.string().required("Title is required"),
    subdescription: Yup.string().required("Sub-description is required"),
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const payload = { ...values, imageMobile, imageDesktop };
    if (isEdit) {
      await editBanner({ id: banner?._id, data: payload }).unwrap();
    } else {
      await createBanner(payload).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      toast.success(
        isEdit ? "Banner updated successfully!" : "Banner created successfully!"
      );
      redirect("/en/dashboard/layout/banners");
    }
    const error = createError || editError;
    if (error && "data" in error) {
      toast.error((error as { data: { message: string } }).data.message);
    }
  }, [isCreateSuccess, isEditSuccess, createError, editError, isEdit]);

  return (
    <div className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        {isEdit ? "Edit Banner" : "Create Banner"}
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Title
            </label>
            <Field
              name="title"
              type="text"
              as={Input}
              placeholder="Enter banner title"
              className="w-full"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Sub-description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Sub-description
            </label>
            <Field
              name="subdescription"
              as={Textarea}
              placeholder="Enter banner sub-description"
              className="w-full border rounded-md p-2"
            />
            <ErrorMessage
              name="subdescription"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Select Product */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Select Product
            </label>
            <Field name="product">
              {({ field, form }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setFieldValue("product", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    {products.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="product"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Desktop Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Desktop Image
            </label>
            <input
              type="file"
              accept="image/*"
              title="Upload a desktop image"
              placeholder="Choose a desktop image"
              onChange={(e) => handleFileChange(e, setImageDesktop)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imageDesktop && (
              <Image
                src={imageDesktop as string}
                alt="Desktop Preview"
                width={200}
                height={100}
                className="mt-2 rounded-md"
              />
            )}
          </div>

          {/* Mobile Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Mobile Image
            </label>
            <input
              type="file"
              accept="image/*"
              title="Upload a mobile image"
              placeholder="Choose a mobile image"
              onChange={(e) => handleFileChange(e, setImageMobile)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imageMobile && (
              <Image
                src={imageMobile as string}
                alt="Mobile Preview"
                width={200}
                height={100}
                className="mt-2 rounded-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              className={`bg-blue-650 hover:bg-blue-600 text-white ${
                isCreating || isEditing ? "cursor-progress" : "cursor-pointer"
              } min-w-32`}
              disabled={isCreating || isEditing}
            >
              {isCreating || isEditing
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Banner"
                : "Create Banner"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BannerForm;
