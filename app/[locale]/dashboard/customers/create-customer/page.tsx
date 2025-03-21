import CreateCustomerPage from "@/app/components/CreateCustomer/CreateCustomerPage";
import Heading from "@/utils/Heading";

import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Customer"
        keywords="Create Customer"
        description="Create Customer"
      />
      <CreateCustomerPage />
    </>
  );
};

export default page;
