import React from "react";
import CategoryInformation from "./CategoryInformation";
import EditCategory from "./EditCategory";
import ChangerExporter from "../ui/ChangerExporter";

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

/**
 * CategoryPage Component
 * Displays detailed information about a category and allows editing the category.
 *
 * @param {CategoryProps} props - The props for the component.
 * @param {object} props.category - The category details.
 * @param {string} props.category._id - The unique identifier for the category.
 * @param {string} props.category.name - The name of the category.
 * @param {object} props.category.collectionProduct - The associated collection product details.
 * @param {object} props.category.thumbnail - The thumbnail of the category.
 * @param {string} props.category.createdAt - The creation date of the category.
 * @param {string} props.category.updatedAt - The last update date of the category.
 * @param {function} props.refetch - A function to refetch the category data.
 */
const CategoryPage = ({ category, refetch }: CategoryProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Categories", url: "/en/dashboard/products/categories" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Category" : "Category Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Category Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2">
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
