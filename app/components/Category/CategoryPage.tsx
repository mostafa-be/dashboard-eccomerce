import React from "react";
import Change from "./Change";
import CategoryInformation from "./CategoryInformation";
import EditCategory from "./EditCategory";

type CategoryProps = {
  category: {
    _id: string;
    name: string;
    collectionProduct: {
      _id: string;
      name: string;
      thumbnail: {
        url: string;
        public_id: string;
      };
      createdAt: Date;
      updatedAt: Date;
    };
    thumbnail: {
      url: string;
      public_id: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};
const CategoryPage = ({ category, refetch }: CategoryProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditCategory
            category={category}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <CategoryInformation category={category} />
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
