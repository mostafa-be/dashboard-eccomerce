import React from "react";
import EditCollection from "./EditCollection";
import CollectionInformation from "./CollectionInformation";
import ChangerExporter from "../ui/ChangerExporter";

type CollectionProps = {
  collection: {
    _id: string;
    name: string;
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
 * CollectionPage Component
 * Displays detailed information about a collection and allows editing the collection.
 *
 * @param {CollectionProps} props - The props for the component.
 * @param {object} props.collection - The collection details.
 * @param {string} props.collection._id - The unique identifier for the collection.
 * @param {string} props.collection.name - The name of the collection.
 * @param {object} props.collection.thumbnail - The thumbnail of the collection.
 * @param {string} props.collection.thumbnail.url - The URL of the collection's thumbnail.
 * @param {string} props.collection.thumbnail.public_id - The public ID of the collection's thumbnail.
 * @param {string} props.collection.createdAt - The creation date of the collection.
 * @param {string} props.collection.updatedAt - The last update date of the collection.
 * @param {function} props.refetch - A function to refetch the collection data.
 */
const CollectionPage = ({ collection, refetch }: CollectionProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Collections", url: "/en/dashboard/products/collections" },
  ];

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Collection" : "Collection Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Collection Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditCollection
            collection={collection}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <CollectionInformation collection={collection} />
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
