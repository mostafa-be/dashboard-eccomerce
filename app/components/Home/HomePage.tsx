import React from "react";
import Auth from "./Auth";
import Description from "./Description";

const HomePage = () => {
  return (
    <main className="w-dvw h-dvh bg-white dark:bg-black/90 grid grid-cols-2">
          <Auth />
          <Description/>
    </main>
  );
};

export default HomePage;
