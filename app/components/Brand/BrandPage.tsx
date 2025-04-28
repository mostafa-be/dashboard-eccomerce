import React from "react";
import EditBrand from "./EditBrand";
import BrandInformation from "./BrandInformation";
import ChangerExporter from "../ui/ChangerExporter";

type BrandProps = {
  brand: {
    _id: string;
    name: string;
    logo: {
      url: string;
      public_id: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

/**
 * BrandPage Component
 * Displays detailed information about a brand and allows editing the brand.
 *
 * @param {BrandProps} props - The props for the component.
 * @param {object} props.brand - The brand details.
 * @param {string} props.brand._id - The unique identifier for the brand.
 * @param {string} props.brand.name - The name of the brand.
 * @param {object} props.brand.logo - The logo of the brand.
 * @param {string} props.brand.logo.url - The URL of the brand's logo.
 * @param {string} props.brand.logo.public_id - The public ID of the brand's logo.
 * @param {string} props.brand.createdAt - The creation date of the brand.
 * @param {string} props.brand.updatedAt - The last update date of the brand.
 * @param {function} props.refetch - A function to refetch the brand data.
 */
const BrandPage = ({ brand, refetch }: BrandProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Brands", url: "/en/dashboard/products/brands" },
  ];

  const dataEdit = {
    editMode: editMode,
    setEditMode: setEditMode,
  };

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Brand" : "Brand Details"}
        isEdit={true}
        dataEdit={dataEdit}
      />

      {/* Brand Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditBrand
            brand={brand}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <BrandInformation brand={brand} />
        )}
      </div>
    </section>
  );
};

export default BrandPage;
