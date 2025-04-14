import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

// Dynamically import the image resize module
// @ts-ignore
const ImageResize = dynamic(() => import("quill-image-resize-module-react"), {
  ssr: false,
});
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MyEditor = ({
  value,
  onChange
}:{
  value: string;
  onChange: (value: string) => void;
}) => {

  const quillRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill-new").then(({ Quill }) => {
        Quill.register("modules/imageResize", ImageResize);
      });
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {}, // Enable the image resize module
  };



  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      className="h-max max-w-full bg-white dark:bg-black-100 text-black dark:text-white"
    />
  );
};

export default MyEditor;
