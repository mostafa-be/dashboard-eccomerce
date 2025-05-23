"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { useEditTagMutation } from "@/redux/features/tags/tagsApi";
type EditTagProps = {
  tag: {
    _id: string;
    name: string;
  };
  refetch: () => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTag = ({
  tag,
  refetch,
  editMode,
  setEditMode,
}: EditTagProps) => {
  const { _id, name } = tag;
  const [editTag, { isLoading, isSuccess, error }] =
    useEditTagMutation();
  const initialValues = {
    name: name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("tag name is required"),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      const data = { name: values.name };
      await editTag({ id: _id, data }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tag updated successfully!");
      refetch();
      setEditMode(!editMode);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-5">
      <HeaderCard className="w-full  flex items-center justify-between">
        <TitleCard
          title="Edit Tag Blog"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-5">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Tag Name
              </label>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Enter Tag name"
                className="w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className={`bg-blue-650 hover:bg-blue-600 text-white ${
                  isLoading ? " cursor-progress" : " cursor-pointer"
                } min-w-32`}
                disabled={isLoading}
              >
                {isLoading ? "Updating...." : "Update Category"}
              </Button>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditTag;
