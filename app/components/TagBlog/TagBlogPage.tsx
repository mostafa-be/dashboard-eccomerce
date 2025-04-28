import React from "react";
import EditTagBlog from "./EditTagBlog";
import TagInformation from "./TagInformation";
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
 * TagBlogPage Component
 * Displays the details of a blog tag with an option to edit the tag.
 *
 * @param {TagBlogProps} props - The props for the component.
 * @param {object} props.tag - The tag details.
 * @param {function} props.refetch - Function to refetch the tag data.
 */
const TagBlogPage = ({ tag, refetch }: TagBlogProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Blogs", url: "/en/dashboard/blogs" },
    { name: "Tags", url: "/en/dashboard/blogs/tags" },
  ];

  return (
    <section className="w-full space-y-10">
      {/* Navigation and Edit Options */}
      <ChangerExporter
        links={links}
        active={editMode ? "Edit Tag" : "Tag Details"}
        isEdit
        dataEdit={{ editMode, setEditMode }}
      />

      {/* Tag Details or Edit Form */}
      <div className="w-full grid lg:grid-cols-2">
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
