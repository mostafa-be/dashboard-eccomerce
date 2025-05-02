"use client";

import React, { useState } from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  useCreateExpenseMutation,
  useEditExpenseMutation,
} from "@/redux/features/expenses/expensesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Expense } from "@/app/@types/types";

/**
 * ExpenseForm Component
 * Handles the creation and editing of an expense with advanced Formik features.
 *
 * @param {ExpenseFormProps} props - The props for the component.
 * @param {boolean} [props.isEdit] - Indicates if the form is in edit mode.
 * @param {Expense} [props.expense] - The expense data to edit.
 * @param {function} [props.refetch] - Function to refetch data after submission.
 * @returns {JSX.Element} The ExpenseForm component.
 */
type ExpenseFormProps = {
  isEdit?: boolean;
  expense?: Expense;
  refetch?: () => void;
};

const ExpenseForm = ({
  isEdit = false,
  expense,
  refetch,
}: ExpenseFormProps) => {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();
  const [editExpense, { isLoading: isEditing }] = useEditExpenseMutation();

  const initialValues = {
    title: expense?.title || "",
    amount: expense?.amount || "",
    category: expense?.category || "",
    department: expense?.department || "",
    notes: expense?.notes || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number"),
    category: Yup.string().required("Category is required"),
    department: Yup.string().required("Department is required"),
    notes: Yup.string(),
  });

  /**
   * Handles file attachment changes.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  /**
   * Handles form submission for creating or editing an expense.
   *
   * @param {typeof initialValues} values - The form values.
   * @param {() => void} resetForm - Function to reset the form after submission.
   */
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (isEdit && expense) {
        await editExpense({ id: expense._id, data: { ...values } }).unwrap();
        toast.success("Expense updated successfully!");
        refetch?.();
      } else {
        await createExpense(values).unwrap();
        toast.success("Expense created successfully!");
        resetForm();
        setAttachment(null);
        redirect("/en/dashboard/expenses");
      }
    } catch (error: { data: { message: string } }) {
      toast.error(
        error?.data?.message || "Failed to submit expense. Please try again."
      );
    }
  };

  return (
    <Card className="w-full space-y-4 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard>
        <TitleCard title={isEdit ? "Edit Expense" : "New Expense"} />
      </HeaderCard>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="space-y-4">
              {/* Title Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  as={Input}
                  placeholder="Enter expense title"
                  className={`${
                    errors.title && touched.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Amount Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Amount
                </label>
                <Field
                  name="amount"
                  type="number"
                  as={Input}
                  placeholder="Enter expense amount"
                  className={`${
                    errors.amount && touched.amount
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Category Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Category
                </label>
                <Field
                  name="category"
                  type="text"
                  as={Input}
                  placeholder="Enter expense category"
                  className={`${
                    errors.category && touched.category
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Department Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Department
                </label>
                <Field
                  name="department"
                  type="text"
                  as={Input}
                  placeholder="Enter department"
                  className={`${
                    errors.department && touched.department
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Notes Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Notes
                </label>
                <Field
                  name="notes"
                  as={Textarea}
                  placeholder="Enter additional notes"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Attachment Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Attachment
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleAttachmentChange}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {attachment && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Selected file: {attachment.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isCreating || isEditing}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${
                    !isValid || !dirty
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                >
                  {isCreating || isEditing
                    ? "Submitting..."
                    : isEdit
                    ? "Update Expense"
                    : "Create Expense"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
