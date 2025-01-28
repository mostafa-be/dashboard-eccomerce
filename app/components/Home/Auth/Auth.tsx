"use client";

import React, { useState } from "react";
import Login from "./Login";

const Auth = () => {
  const [auth, setAuth] = useState("login");
  return (
    <section className="w-full flex flex-col items-center justify-center">
      {auth === "login" && <Login setAuth={setAuth} />}
      <div className="w-full flex items-center justify-center mt-5">
        <p className="text-sm text-center text-gray-500">
          2024 Nexora - All Rights Reserverd
        </p>
      </div>
    </section>
  );
};

export default Auth;
