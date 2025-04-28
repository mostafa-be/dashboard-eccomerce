import React from "react";
import EditCategoryBlog from "./EditCategoryBlog";
import CategoryInformation from "./CategoryInformation";
import ChangerExporter from "../ui/ChangerExporter";

type CategoryBlogProps = {
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

/**
 * CategoryBlogPage Component
 * Displays the details of a blog category with an option to edit the category.
 *
 * @param {CategoryBlogProps} props - The props for the component.
 * @param {object} props.category - The category details.
 * @param {function} props.refetch - Function to refetch the category data.
 */
const CategoryBlogPage = ({ category, refetch }: CategoryBlogProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
    { name: "Categories", url: "/en/dashboard/blogs/categories" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Edit Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Category" : "Category Details"}
        isEdit
        dataEdit={{
          editMode,
          setEditMode,
        }}
      />

      {/* Category Details or Edit Form */}
      <div className="w-full grid lg:grid-cols-2">
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
