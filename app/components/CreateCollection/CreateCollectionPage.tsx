import React from "react";
import CollectionForm from "./CollectionForm";
import ChangerExporter from "../ui/ChangerExporter";

const CreateCollectionPage = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Collections", url: "/en/dashboard/products/collections" },
  ];
  return (
    <section className="w-full">
      <ChangerExporter links={links} active="Create Collection" />
      <CollectionForm />
    </section>
  );
};

export default CreateCollectionPage;
