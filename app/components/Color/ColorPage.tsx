import React from "react";
import EditColor from "./EditColor";
import ColorInformation from "./ColorInformation";
import ChangerExporter from "../ui/ChangerExporter";

type ColorProps = {
  color: {
    _id: string;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

/**
 * ColorPage Component
 * Displays detailed information about a color and allows editing the color.
 *
 * @param {ColorProps} props - The props for the component.
 * @param {object} props.color - The color details.
 * @param {string} props.color._id - The unique identifier for the color.
 * @param {string} props.color.name - The name of the color.
 * @param {string} props.color.code - The code of the color.
 * @param {string} props.color.createdAt - The creation date of the color.
 * @param {string} props.color.updatedAt - The last update date of the color.
 * @param {function} props.refetch - A function to refetch the color data.
 */
const ColorPage = ({ color, refetch }: ColorProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Colors", url: "/en/dashboard/products/colors" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Color" : "Color Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Color Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2">
        {editMode ? (
          <EditColor
            color={color}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <ColorInformation color={color} />
        )}
      </div>
    </section>
  );
};

export default ColorPage;
