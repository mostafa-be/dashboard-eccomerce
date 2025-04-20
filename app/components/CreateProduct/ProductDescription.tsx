//"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import MyEditor from "../MyEditor";

const ProductDescription = ({
  setProductDescription,
  productDescription,
  active,
  setActive,
}: {
  setProductDescription: (values: {
    title: string;
    description: string;
  }) => void;
  productDescription: {
    title: string;
    description: string;
  };
  active: number;
  setActive: (step: number) => void;
}) => {
  const initialValues = {
    title: productDescription.title,
    description: productDescription.description,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters long"),
    description: Yup.string()
      .required("Description is required")
      .test(
        "is-valid-description",
        "Description must not be empty or invalid",
        (value) => !!value && value.trim().length > 0
      ),
  });

  const handleNext = (values: typeof initialValues) => {
    setProductDescription(values);
    setActive(active + 1);
  };

  return (
    <div className="w-full  bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Product Description
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleNext}
      >
        <Form className="mt-5 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Field
              name="title"
              type="text"
              as={Input}
              placeholder="Enter product title"
              className="w-full"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Field
              name="description"
              render={({ field, form }: FieldProps) => (
                <MyEditor
                  value={field.value || ""} // Ensure value is not undefined
                  onChange={
                    (value: string) =>
                      form.setFieldValue(field.name, value || "") // Default to an empty string
                  }
                />
              )}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              Next
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductDescription;
