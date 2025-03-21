"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useRegisterByAdminMutation } from "@/redux/features/auth/authApi";

const CustomerForm = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [registerByAdmin, { isLoading, isSuccess, error }] =
    useRegisterByAdminMutation();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    avatar: "",
    role: "",
    functionality: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
    functionality: Yup.string().required("Functionality is required"),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      await registerByAdmin({ ...values, avatar }).unwrap();
      resetForm();
      setAvatar(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer created successfully!");
      redirect("/en/dashboard/customers");
    }
    if (error && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full md:w-2/3 mt-10 bg-white shadow dark:bg-black-100 transition-colors py-5 px-6 rounded-lg">
      <h5 className="text-xl font-semibold font-Poppins text-black dark:text-white">
        Create Customer
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5 space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover"
                />
              ) : (
                <div className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full flex items-center justify-center bg-gray-200"></div>
              )}
              <label htmlFor="avatar" className="sr-only">
                Upload Avatar
              </label>
              <input
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/png,image/jpg,image/jpeg,image/webp"
                title="Upload Avatar"
              />
              <label htmlFor="avatar">
                <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                  <Camera size={20} className="text-white" />
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Name
            </label>
            <Field
              name="name"
              type="text"
              as={Input}
              placeholder="Enter customer name"
              className="w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Email
            </label>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="Enter customer email"
              className="w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Mobile
            </label>
            <Field
              name="mobile"
              type="text"
              as={Input}
              placeholder="Enter mobile number"
              className="w-full"
            />
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Password
            </label>
            <Field
              name="password"
              type="password"
              as={Input}
              placeholder="Enter password"
              className="w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Role
            </label>
            <Field name="role">
              {({ field, form }: any) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setFieldValue("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Functionality
            </label>
            <Field name="functionality">
              {({ field, form }: any) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setFieldValue("functionality", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select functionality" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    <SelectItem value="ceo/founder">Ceo/Founder</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="functionality"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              className={`bg-blue-650 hover:bg-blue-600 text-white ${
                isLoading ? "cursor-progress" : "cursor-pointer"
              } min-w-32`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerForm;
