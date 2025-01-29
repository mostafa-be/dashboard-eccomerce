import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
type Props = {
  setAuth: (type: string) => void;
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
});
const ForgotPassword = ({ setAuth }: Props) => {
  const [ForgotPassword, { isSuccess, error, isLoading }] =
    useForgotPasswordMutation();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      await ForgotPassword({ email });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Please check your email for the reset link");
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
        <h1 className="text-2xl font-semibold text-black">Forgot Password</h1>
        <p className="text-sm text-gray-500">
          Please enter your email address to search for your account.
        </p>
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
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value={`${isLoading ? "Loading..." : "Send Reset Link"}`}
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
              Log in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
