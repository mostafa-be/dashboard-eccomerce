import React from "react";
import Change from "./Change";
import EditTagBlog from "./EditTagBlog";
import TagInformation from "./TagInformation";

type TagBlogProps = {
  tag: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};
const TagBlogPage = ({ tag, refetch }: TagBlogProps) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <section className="w-full">
      <Change editMode={editMode} setEditMode={setEditMode} />
      <div className="w-full grid lg:grid-cols-2 mt-10">
        {editMode ? (
          <EditTagBlog
            tag={tag}
            refetch={refetch}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        ) : (
          <TagInformation tag={tag} />
        )}
      </div>
    </section>
  );
};

export default TagBlogPage;
