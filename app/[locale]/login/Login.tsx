"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import apple_svg from "../../../../public/icons_svg/apple.svg";
import google_svg from "../../../../public/icons_svg/google.svg";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { signIn } from "next-auth/react";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});
type Props = {
  setAuth: (type: string) => void;
};

const Login = ({ setAuth }: Props) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, isLoading }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      redirect("/en/dashboard");
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
          Login in to your account
        </h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="w-full mt-5 flex max-lg:flex-col items-center justify-center gap-7">
        <button
          onClick={() => signIn("google")}
          className="w-[300px] select-none shadow border border-zinc-400 px-2 py-3  flex items-center justify-center gap-4 rounded-full cursor-pointer"
        >
          <Image
            src={google_svg}
            alt="logo google-svg"
            className="w-5 h-5 object-cover"
          />
          <span className="text-sm text-black font-[500] capitalize">
            log in with google
          </span>
        </button>
        <button    onClick={()=> signIn("appel")} className="w-[300px] select-none shadow border border-zinc-400 px-2 py-3  flex items-center justify-center gap-4 rounded-full cursor-pointer">
          <Image
            src={apple_svg}
            alt="logo apple-svg"
            className="w-5 h-5 object-cover"
          />
          <span className="text-sm text-black font-[500] capitalize">
            log in with apple
          </span>
        </button>
      </div>
      <div className="w-full flex items-center gap-2 my-3">
        <hr className="w-full m-0" />
        <h5 className="text-center  font-Poppins text-sm text-gray-700 dark:text-white ">
          Or
        </h5>
        <hr className="w-full m-0" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full ">
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
        <div className="w-full flex items-center py-2 justify-end">
          <span
            className="text-sm text-black font-[500] "
            onClick={() => setAuth && setAuth("forgotPassword")}
          >
            Forgot password?{" "}
            <span className="text-blue-650 cursor-pointer">Rest</span>
          </span>
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Login"}
            className={`w-full  rounded-lg flex items-center justify-center py-3 text-sm font-[600] text-white ${
              isLoading
                ? "bg-blue-650/80 cursor-progress"
                : "bg-blue-650 cursor-pointer"
            } `}
          />
        </div>
        <div className="w-full flex items-center mt-2 justify-center ">
          <p className="text-sm text-center text-black/90 font-bold">
            Don&apos;t have an account yet?{" "}
            <span
              onClick={() => setAuth && setAuth("register")}
              className="text-blue-650 underline cursor-pointer"
            >
              Sign up now
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
