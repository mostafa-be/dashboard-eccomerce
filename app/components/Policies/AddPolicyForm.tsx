"use client";

import React, { useEffect } from "react";
import {
  useCreatePolicyMutation,
  useEditPolicyMutation,
} from "@/redux/features/policies/policiesApi";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import MyEditor from "../MyEditor";
import { Policy } from "@/app/@types/types";
import { redirect } from "next/navigation";

/**
 * AddPolicyForm Component
 * Handles the creation or editing of a policy with form validation using Formik and Yup, and includes a rich text editor for policy content.
 *
 * @param {AddPolicyFormProps} props - The component props.
 * @param {Policy} [props.policy] - The policy data for editing (if applicable).
 * @param {boolean} [props.isEdit] - Flag to indicate if the form is for editing.
 * @param {Function} props.refetch - Function to refetch policies after submission.
 * @returns {JSX.Element} The rendered Add/Edit Policy form component.
 */
type AddPolicyFormProps = {
  policy?: Policy;
  isEdit?: boolean;
  refetch: () => void;
};

const AddPolicyForm = ({ policy, isEdit, refetch }: AddPolicyFormProps) => {
  const [
    createPolicy,
    { isLoading: isCreating, isSuccess: isCreateSuccess, error: createError },
  ] = useCreatePolicyMutation();
  const [
    editPolicy,
    { isLoading: isEditing, isSuccess: isEditSuccess, error: editError },
  ] = useEditPolicyMutation();

  // Policy types
  const policyTypes = [
    "contact information",
    "privacy policy",
    "refund policy",
    "terms of service",
    "shipping policy",
    "cookie policy",
    "warranty policy",
    "payment policy",
    "cancellation policy",
    "security policy",
    "user agreement",
  ];

  // Initial form values
  const initialValues = {
    type: policy?.type || "",
    title: policy?.title || "",
    content: policy?.content || "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    type: Yup.string().required("Policy type is required"),
    title: Yup.string().required("Policy title is required"),
    content: Yup.string()
      .required("Policy content is required")
      .test(
        "is-valid-content",
        "Content must not be empty or invalid",
        (value) => !!value && value.trim().length > 0
      ),
  });

  // Form submission handler
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (isEdit) {
        await editPolicy({ type: policy?.type || "", data: values }).unwrap();
        toast.success("Policy updated successfully!");
      } else {
        await createPolicy(values).unwrap();
        toast.success("Policy created successfully!");
        resetForm();
      }
      refetch();
    } catch {
      toast.error("Failed to submit policy. Please try again.");
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      refetch();
      redirect("/en/dashboard/layout/policies");
    }

    const error = createError || editError;
    if (error && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isCreateSuccess, isEditSuccess, createError, editError, refetch]);

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6 space-y-4">
      <HeaderCard className="w-full">
        <TitleCard
          title={isEdit ? "Edit Policy" : "Add New Policy"}
          className="text-xl font-semibold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="space-y-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Policy Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Policy Type
                </label>
                <Field name="type">
                  {({ field }: FieldProps) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => setFieldValue("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="capitalize"
                          placeholder="Select a policy type"
                        />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-black-100">
                        {policyTypes.map((type) => (
                          <SelectItem
                            className="capitalize"
                            key={type}
                            value={type}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Policy Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Policy Title
                </label>
                <Field
                  name="title"
                  as={Input}
                  placeholder="Enter policy title"
                  className="w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Policy Content */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Policy Content
                </label>
                <Field
                  name="content"
                  render={({ field, form }: FieldProps) => (
                    <MyEditor
                      value={field.value || ""}
                      onChange={(value: string) =>
                        form.setFieldValue(field.name, value || "")
                      }
                    />
                  )}
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex items-center justify-end">
                <Button
                  type="submit"
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ${
                    isCreating || isEditing
                      ? "cursor-progress"
                      : "cursor-pointer"
                  }`}
                  disabled={isCreating || isEditing}
                >
                  {isCreating || isEditing
                    ? isEdit
                      ? "Updating..."
                      : "Creating..."
                    : isEdit
                    ? "Update Policy"
                    : "Add Policy"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddPolicyForm;
