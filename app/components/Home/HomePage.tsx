import React from "react";
import Auth from "./Auth/Auth";
import Description from "./Description";

const HomePage = () => {
  return (
    <main className="min-w-dvw min-h-dvh overflow-hidden bg-white flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 lg:p-5">
      <Description />
      <Auth />
    </main>
  );
};

export default HomePage;
