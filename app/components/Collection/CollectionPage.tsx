import React from "react";
import Change from "./Change";
import EditCollection from "./EditCollection";
import CollectionInformation from "./CollectionInformation";

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
const CollectionPage = ({ collection, refetch }: CollectionProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
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
