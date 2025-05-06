import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type AddressProps = {
  setAddress: (values: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) => void;
  isSuccess?: boolean;
};

/**
 * Address Component
 * Renders a form for address input with validation.
 *
 * @param {AddressProps} props - The component props.
 * @param {function} props.setAddress - Callback function to handle form submission.
 * @param {boolean} [props.isSuccess] - Indicates if the form submission was successful.
 */
const Address = ({ setAddress }: AddressProps) => {
  const initialValues = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    street: Yup.string()
      .required("Street is required")
      .min(3, "Street must be at least 3 characters long"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 2 characters long"),
    state: Yup.string()
      .required("State is required")
      .min(2, "State must be at least 2 characters long"),
    postalCode: Yup.string()
      .required("Postal Code is required")
      .matches(/^\d{5}$/, "Postal Code must be exactly 5 digits"),
    country: Yup.string()
      .required("Country is required")
      .min(2, "Country must be at least 2 characters long"),
  });

  // Handle form submission
  const onSubmit = (values: typeof initialValues) => {
    setAddress(values);
  };

  return (
    <div className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Address Information
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="mt-5 space-y-4">
          {/* Street Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Street
            </label>
            <Field
              name="street"
              type="text"
              as={Input}
              placeholder="Enter street address"
              className="w-full"
            />
            <ErrorMessage
              name="street"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* City Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City
            </label>
            <Field
              name="city"
              type="text"
              as={Input}
              placeholder="Enter city"
              className="w-full"
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          {/* State Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <Field
              name="state"
              type="text"
              as={Input}
              placeholder="Enter state"
              className="w-full"
            />
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Postal Code Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Postal Code
            </label>
            <Field
              name="postalCode"
              type="text"
              as={Input}
              placeholder="Enter postal code"
              className="w-full"
            />
            <ErrorMessage
              name="postalCode"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          {/* Country Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <Field
              name="country"
              type="text"
              as={Input}
              placeholder="Enter country"
              className="w-full"
            />
            <ErrorMessage
              name="country"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              Save Address
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Address;
