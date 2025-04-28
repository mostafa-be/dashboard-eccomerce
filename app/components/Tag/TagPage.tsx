import React from "react";
import TagInformation from "./TagInformation";
import EditTag from "./EditTag";
import ChangerExporter from "../ui/ChangerExporter";

type TagBlogProps = {
  tag: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

/**
 * TagPage Component
 * Displays detailed information about a tag and allows editing the tag.
 *
 * @param {TagBlogProps} props - The props for the component.
 * @param {object} props.tag - The tag details.
 * @param {string} props.tag._id - The unique identifier for the tag.
 * @param {string} props.tag.name - The name of the tag.
 * @param {string} props.tag.createdAt - The creation date of the tag.
 * @param {string} props.tag.updatedAt - The last update date of the tag.
 * @param {function} props.refetch - A function to refetch the tag data.
 */
const TagPage = ({ tag, refetch }: TagBlogProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/dashboard/products" },
    { name: "Tags", url: "/en/dashboard/products/tags" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Export Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Tag" : "Tag Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Tag Information or Edit Mode */}
      <div className="w-full grid lg:grid-cols-2">
        {editMode ? (
          <EditTag
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

export default TagPage;
