import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { ShieldCheck } from "lucide-react";
type Props = {
  setAuth: (type: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setAuth }) => {
  const { token } = useSelector(
    (state: { auth: { token: string } }) => state.auth
  );

  const [activation, { isSuccess, isLoading, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setAuth("login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured: ", error);
      }
    }
  }, [isSuccess, error, setAuth]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`text-2xl text-center font-semibold text-black"`}>
        Verify Your Account
      </h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-blue-650 flex items-center justify-center">
          <ShieldCheck className="text-white" size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center gap-3 justify-around">
        {Object.keys(verifyNumber)?.map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
            placeholder="0"
            title={`Verification digit ${index + 1}`}
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`w-full  rounded-lg flex items-center justify-center py-3 text-sm font-[600] text-white ${
            isLoading
              ? "bg-blue-650/80 cursor-progress"
              : "bg-blue-650 cursor-pointer"
          } `}
          onClick={verificationHandler}
        >
          {isLoading ? "loading..." : "Verify OTP"}
        </button>
      </div>
      <br />
      <div className="w-full flex items-center  justify-center ">
        <p className="text-sm text-center text-black/90 font-bold">
          Go back to sign in?{" "}
          <span
            onClick={() => setAuth && setAuth("register")}
            className="text-blue-650 underline cursor-pointer"
          >
            Sin in
          </span>
        </p>
      </div>
      <br />
    </div>
  );
};

export default Verification;
