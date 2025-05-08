"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  useCreateBlogMutation,
  useEditBlogMutation,
} from "@/redux/features/blogs/blogsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetAllTagsBlogQuery } from "@/redux/features/blogTags/blogTagsApi";
import { useGetAllCategoriesBlogQuery } from "@/redux/features/blogCategories/blogCategoriesApi";
import Image from "next/image";
import { ImageUp } from "lucide-react";
import MyEditor from "../MyEditor";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "../ui/multi-select";
import { redirect } from "next/navigation";
import { Blog } from "@/app/@types/types";

/**
 * BlogForm Component
 * Handles the creation or editing of a blog post with fields for title, description, category, tags, and thumbnail.
 *
 * @param {BlogFormProps} props - The component props.
 * @param {Blog} [props.blog] - The blog data for editing.
 * @param {boolean} [props.isEdit] - Indicates if the form is in edit mode.
 */
type BlogFormProps = {
  blog?: Blog;
  isEdit?: boolean;
};

const BlogForm = ({ blog, isEdit }: BlogFormProps) => {
  const _id = blog?._id || null;
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(
    blog?.thumbnail?.url || null
  );
  const [dragging, setDragging] = useState(false);

  const [
    createBlog,
    { isLoading: isCreating, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateBlogMutation();
  const [
    editBlog,
    { isLoading: isEditing, isSuccess: isEditSuccess, error: editError },
  ] = useEditBlogMutation();

  const { data: tagsData } = useGetAllTagsBlogQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: categoriesData } = useGetAllCategoriesBlogQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const tags = tagsData?.tags || [];
  const categories = categoriesData?.categories || [];

  const initialValues = {
    title: blog?.title || "",
    description: blog?.description || "",
    subDescription: blog?.subDescription || "",
    category: blog?.category?._id || "",
    tags: blog?.tags?.map((tag) => tag._id) || [],
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
    const payload = { ...values, thumbnail };
    if (isEdit) {
      await editBlog({ id: _id, data: payload }).unwrap();
    } else {
      await createBlog(payload).unwrap();
      resetForm();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragEvents = (
    e: React.DragEvent<HTMLLabelElement>,
    isOver: boolean
  ) => {
    e.preventDefault();
    setDragging(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      toast.success(
        isEdit ? "Blog updated successfully!" : "Blog created successfully!"
      );
      redirect("/en/dashboard/blogs");
    }
    const error = createError || editError;
    if (error && "data" in error) {
      toast.error((error as { data: { message: string } }).data.message);
    }
  }, [isCreateSuccess, isEditSuccess, createError, editError]);

  return (
    <div className="w-full md:w-2/3 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        {isEdit ? "Edit Blog" : "Create Blog"}
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5 space-y-4">
          {/* Title Field */}
          <Field name="title">
            {({ field }: FieldProps) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Title
                </label>
                <Input {...field} placeholder="Enter blog title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </Field>

          {/* Description Field */}
          <Field name="description">
            {({ field, form }: FieldProps) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Description
                </label>
                <MyEditor
                  value={field.value || ""}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </Field>

          {/* Sub-description Field */}
          <Field name="subDescription">
            {({ field }: FieldProps) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Sub-description
                </label>
                <Textarea {...field} placeholder="Enter blog sub-description" />
                <ErrorMessage
                  name="subDescription"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </Field>

          {/* Category Field */}
          <Field name="category">
            {({ field, form }: FieldProps) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Category
                </label>
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
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </Field>

          {/* Tags Field */}
          <Field name="tags">
            {({ field, form }: FieldProps) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Tags
                </label>
                <MultiSelect
                  options={tags.map((tag) => ({
                    label: tag.name,
                    value: tag._id,
                  }))}
                  selected={field.value}
                  onChange={(selectedValues) =>
                    form.setFieldValue("tags", selectedValues)
                  }
                  placeholder="Select tags"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </Field>

          {/* Thumbnail Upload */}
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
              onDragOver={(e) => handleDragEvents(e, true)}
              onDragLeave={(e) => handleDragEvents(e, false)}
              onDrop={handleDrop}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail as string}
                  title="Selected image from clipboard..."
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
                ? "Update Blog"
                : "Create Blog"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BlogForm;
