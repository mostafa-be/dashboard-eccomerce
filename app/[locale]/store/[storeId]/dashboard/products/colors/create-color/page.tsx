import CreateColorPage from "@/app/components/CreateColor/CreateColorPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {

  return (
    <>

      <Heading
        title="Create Color"
        keywords="Create Color"
        description="Create Color"
      />
      <CreateColorPage />
    </>
  );
};

export default page;
