"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { useEditSizeMutation } from "@/redux/features/sizes/sizesApi";
type EditSizeProps = {
  size: {
    _id: string;
    name: string;
    
  };
  refetch: () => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditSize = ({
  size,
  refetch,
  editMode,
  setEditMode,
}: EditSizeProps) => {
  const { _id, name } = size;
  const [editSize, { isLoading, isSuccess, error }] =
    useEditSizeMutation();
  const initialValues = {
    name: name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("size name is required"),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      const data = { name: values.name };
      await editSize({ id: _id, data }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Size updated successfully!");
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
          title="Edit Size Blog"
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
                Size Name
              </label>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Enter Size name"
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

export default EditSize;
