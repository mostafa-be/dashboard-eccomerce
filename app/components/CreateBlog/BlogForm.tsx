"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { useCreateBlogMutation } from "@/redux/features/blogs/blogsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetAllTagsBlogQuery } from "@/redux/features/blogTags/blogTagsApi";
import { useGetAllCategoriesBlogQuery } from "@/redux/features/blogCategories/blogCategoriesApi";
import {MultiSelect} from "../ui/multi-select";
import Image from "next/image";
import { ImageUp } from "lucide-react";
const BlogForm = () => {
  const [thumbnail, setThumbnail] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const [dragging, setDragging] = React.useState(false);
  const [createBlog, { isLoading, isSuccess, error }] = useCreateBlogMutation();
  const { data: tagsData } = useGetAllTagsBlogQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: categoriesData } = useGetAllCategoriesBlogQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const tags = Array.isArray(tagsData?.tags) ? tagsData.tags : [];
  const categories = Array.isArray(categoriesData?.categories)
    ? categoriesData.categories
    : [];

  const initialValues = {
    title: "",
    description: "",
    subDescription: "",
    category: "",
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    subDescription: Yup.string().required("Sub-description is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array().min(1, "At least one tag is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      await createBlog(values).unwrap();
      resetForm();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setThumbnail(reader.result);
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
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog created successfully!");
    }
    if (error && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full md:w-2/3 mt-10 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        Create Blog
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Title
            </label>
            <Field
              name="title"
              type="text"
              as={Input}
              placeholder="Enter blog title"
              className="w-full"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Description
            </label>
            <Field
              name="description"
              as={Textarea}
              placeholder="Enter blog description"
              className="w-full"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Sub-description
            </label>
            <Field
              name="subDescription"
              as={Textarea}
              placeholder="Enter blog sub-description"
              className="w-full"
            />
            <ErrorMessage
              name="subDescription"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Category
            </label>
            <Field name="category">
              {({ field, form }: any) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setFieldValue("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
{ /*         <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Tags
            </label>
            <Field name="tags">
              {({ field, form }: any) => (
                <MultiSelect
                selected={Array.isArray(field.value) ? field.value : []} // Ensure field.value is an array
                  onChange={(selectedValues) =>
                    form.setFieldValue("tags", selectedValues)
                  }
                  options={tags.map((tag) => ({
                    label: tag.name,
                    value: tag._id,
                  }))}
                />
              )}
            </Field>
            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>*/}
          <div>
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
              {thumbnail ? (
                <Image
                  src={thumbnail as string}
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
            <Button
              type="submit"
              className={`bg-blue-650 hover:bg-blue-600 text-white ${
                isLoading ? "cursor-progress" : "cursor-pointer"
              } min-w-32`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BlogForm;
