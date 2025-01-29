"use client";

import React, { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import Verification from "./Verification";
const Auth = () => {
  const [auth, setAuth] = useState("login");
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className="w-full flex flex-col items-center justify-center max-lg:p-5 ">
      {auth === "login" && <Login setAuth={setAuth} />}
      {auth === "forgotPassword" && <ForgotPassword setAuth={setAuth} />}
      {auth === "register" && <Register setAuth={setAuth} />}
      {auth === "verify" && <Verification setAuth={setAuth} />}
      <div className="w-full flex items-center justify-center mt-10">
        <p className="text-sm text-center text-gray-500">
          {year} Nexora-All Rights Reserverd
        </p>
      </div>
    </section>
  );
};

export default Auth;
