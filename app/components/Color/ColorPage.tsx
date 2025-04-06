import React from "react";
import Change from "./Change";
import EditColor from "./EditColor";
import ColorInformation from "./ColorInformation";


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
const ColorPage = ({ color, refetch }: ColorProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
      <div className="w-full grid lg:grid-cols-2 mt-10">
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
