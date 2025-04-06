import React from "react";
import Change from "./Change";
import EditBrand from "./EditBrand";
import BrandInformation from "./BrandInformation";

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
const BrandPage = ({ brand, refetch }: BrandProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
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
