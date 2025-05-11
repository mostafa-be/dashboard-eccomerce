import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { useCreateFaqMutation } from "@/redux/features/faqs/faqsApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

/**
 * AddFaqForm Component
 * Handles the creation of a new FAQ with form validation using Formik and Yup.
 *
 * @param {AddFaqFormProps} props - The component props.
 * @param {Function} props.refetch - Function to refetch FAQs after adding a new one.
 * @returns {JSX.Element} The rendered Add FAQ form component.
 */
type AddFaqFormProps = {
  refetch: () => void;
};

const AddFaqForm = ({ refetch }: AddFaqFormProps) => {
  const [createFaq, { isLoading }] = useCreateFaqMutation();

  // Initial form values
  const initialValues = {
    question: "",
    answer: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  });

  // Form submission handler
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createFaq(values).unwrap();
      toast.success("FAQ added successfully!");
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Failed to add FAQ. Please try again.");
      console.error("Failed to create FAQ:", error);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6 space-y-4">
      <HeaderCard className="w-full">
        <TitleCard
          className="text-xl font-semibold text-gray-800 dark:text-gray-100"
          title="Add New FAQ"
        />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Question Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Question
              </label>
              <Field
                name="question"
                as={Input}
                placeholder="Enter the question"
                className="w-full"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Answer Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Answer
              </label>
              <Field
                name="answer"
                as={Textarea}
                placeholder="Enter the answer"
                className="w-full"
              />
              <ErrorMessage
                name="answer"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ${
                  isLoading ? "cursor-progress" : "cursor-pointer"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add FAQ"}
              </Button>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddFaqForm;
