import React from "react";
import EditSize from "./EditSize";
import SizeInformation from "./SizeInformation";
import ChangerExporter from "../ui/ChangerExporter";

type SizeProps = {
  size: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

/**
 * SizePage Component
 * Displays detailed information about a size and allows editing the size.
 *
 * @param {SizeProps} props - The props for the component.
 * @param {object} props.size - The size details.
 * @param {string} props.size._id - The unique identifier for the size.
 * @param {string} props.size.name - The name of the size.
 * @param {string} props.size.createdAt - The creation date of the size.
 * @param {string} props.size.updatedAt - The last update date of the size.
 * @param {function} props.refetch - A function to refetch the size data.
 */
const SizePage = ({ size, refetch }: SizeProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Sizes", url: "/en/dashboard/products/sizes" },
  ];

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Size" : "Size Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Size Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditSize
            size={size}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <SizeInformation size={size} />
        )}
      </div>
    </section>
  );
};

export default SizePage;
