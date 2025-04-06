"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { useEditColorMutation } from "@/redux/features/colors/colorsApi";
type EditColorProps = {
  color: {
    _id: string;
    name: string;
    code: string;
  };
  refetch: () => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditColor = ({
  color,
  refetch,
  editMode,
  setEditMode,
}: EditColorProps) => {
  const { _id, name, code } = color;
  const [editColor, { isLoading, isSuccess, error }] = useEditColorMutation();
  const initialValues = {
    name: name,
    code: code,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("color name is required"),
    code: Yup.string().required("color code is required"),
  });

  const handleSubmit = async (
    values: { name: string; code: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      const data = { name: values.name, code: values.code };
      await editColor({ id: _id, data }).unwrap();
      resetForm();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Color updated successfully!");
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
          title="Edit Color Blog"
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
                Color Name
              </label>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Enter Color name"
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
              <Field
                name="code"
                type="color"
                as={Input}
                placeholder="Enter Color code"
                className="w-full"
              />
              <ErrorMessage
                name="code"
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
                {isLoading ? "Updating...." : "Update Color"}
              </Button>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditColor;
