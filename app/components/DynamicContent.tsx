import React, { useEffect, useState } from "react";

const DynamicContent = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleString()); // Only set this on the client
  }, []);

  return <p>{timestamp || "Loading..."}</p>;
};

export default DynamicContent;
