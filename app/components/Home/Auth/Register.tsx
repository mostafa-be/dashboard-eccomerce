"use client";
//import { signIn } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your full name!").min(6),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});
type Props = {
  setAuth: (type: string) => void;
};

const Register = ({ setAuth }: Props) => {
  const [show, setShow] = useState(false);
  const [register, { isSuccess, error, isLoading }] = useRegisterMutation();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      await register({ name, email, password });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Please check your email to verify your account!");
      setAuth("verify");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <form
      onSubmit={handleSubmit}
      action=""
      method="post"
      className=" w-full lg:w-[400px] flex  flex-col gap-2"
    >
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-black">
          Register your account
        </h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="w-full flex flex-col mt-10 gap-2">
        <div className="w-full ">
          <div className="w-full">
            <label className={`text-lg text-black font-normal`} htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="John Doe"
              className={`outline-none ${
                errors.name &&
                touched.name &&
                "border border-red-500 outline outline-red-500"
              } w-full text-black bg-transparent rounded-lg !h-[45px] px-3.5   font-Poppins border mt-1.5`}
            />
            {errors.name && touched.name && (
              <span className="text-sm font-normal text-red-500 pt-2 block">
                {errors.name}
              </span>
            )}
          </div>
          <div className="w-full">
            <label className={`text-lg text-black font-normal`} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="example@gmail.com"
              className={`outline-none ${
                errors.email &&
                touched.email &&
                "border border-red-500 outline outline-red-500"
              } w-full text-black bg-transparent rounded-lg !h-[45px] px-3.5   font-Poppins border mt-1.5`}
            />
            {errors.email && touched.email && (
              <span className="text-sm font-normal text-red-500 pt-2 block">
                {errors.email}
              </span>
            )}
          </div>
          <div className="w-full mt-5 relative mb-1">
            <div className="w-full relative">
              {" "}
              <label
                className={`text-lg text-black font-normal `}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={!show ? "password" : "text"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="password!@%"
                className={`outline-none ${
                  errors.password &&
                  touched.password &&
                  " border border-red-500 outline outline-red-500"
                } w-full text-black  bg-transparent rounded-lg !h-[45px] px-3.5   font-Poppins border mt-1.5`}
              />
              {!show ? (
                <EyeOff
                  className="absolute text-gray-600 bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <Eye
                  className="absolute text-gray-600  bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
            {errors.password && touched.password && (
              <span className="text-sm font-normal text-red-500 pt-2 block">
                {errors.password}
              </span>
            )}
          </div>
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Register"}
            className={`w-full  rounded-lg flex items-center justify-center py-3 text-sm font-[600] text-white ${
              isLoading
                ? "bg-blue-650/80 cursor-progress"
                : "bg-blue-650 cursor-pointer"
            } `}
          />
        </div>
        <div className="w-full flex items-center mt-2 justify-center ">
          <p className="text-sm text-center text-black/90 font-bold">
            Have an account ?{" "}
            <span
              onClick={() => setAuth && setAuth("login")}
              className="text-blue-650 underline cursor-pointer"
            >
              Login now
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
