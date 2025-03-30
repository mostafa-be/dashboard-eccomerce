import React from "react";
import Change from "./Change";
import EditCategoryBlog from "./EditCategoryBlog";
import CategoryInformation from "./CategoryInformation";

type CategoryBlogProps = {
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};
const CategoryBlogPage = ({ category, refetch }: CategoryBlogProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditCategoryBlog
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

export default CategoryBlogPage;
