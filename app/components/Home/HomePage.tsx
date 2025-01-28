import React from "react";
import Auth from "./Auth/Auth";
import Description from "./Description";

const HomePage = () => {
  return (
    <main className="w-dvw h-dvh bg-white dark:bg-black/90 grid grid-cols-2 gap-10 p-5">
      <Description />
      <Auth />
    </main>
  );
};

export default HomePage;
