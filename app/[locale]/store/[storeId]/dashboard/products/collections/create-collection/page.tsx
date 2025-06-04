import CreateCollectionPage from "@/app/components/CreateCollection/CreateCollectionPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading
        title="Create Collection"
        keywords="create collection"
        description="create collection"
      />
      <CreateCollectionPage />
    </>
  );
};

export default page;
