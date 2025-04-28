import React from "react";
import CustomerForm from "./CustomerForm";
import ChangerExporter from "../ui/ChangerExporter";

const CreateCustomerPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Customers", url: "/en/dashboard/customers" },
  ];
  return (
    <section className="w-full">
      <ChangerExporter
        links={links}
        active="Create Customer"
        isCSV={false}
        isPDF={false}
        isPeriod={false}
      />
      <CustomerForm />
    </section>
  );
};

export default CreateCustomerPage;
