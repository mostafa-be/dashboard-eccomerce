import React from "react";
import Change from "./Change";
import EditSize from "./EditSize";
import SizeInformation from "./SizeInformation";

type SizeProps = {
  size: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};
const SizePage = ({ size, refetch }: SizeProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
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
