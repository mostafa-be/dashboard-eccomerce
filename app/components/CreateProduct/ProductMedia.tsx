import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../ui/card";
import { Button } from "../ui/button";
import { ImageUp, X } from "lucide-react";
import Image from "next/image";

type ProductMediaProps = {
  productImages: string[];
  setProductImages: (images: string[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const ProductMedia: React.FC<ProductMediaProps> = ({
  productImages = [],
  setProductImages,
  active,
  setActive,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileReaders: Promise<string>[] = Array.from(files).map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file); // Convert file to base64 string
        })
    );

    Promise.all(fileReaders)
      .then((base64Images) => {
        setProductImages([...productImages, ...base64Images]);
      })
      .catch((error) => console.error("Error reading files:", error));
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };

  const handleNext = () => {
    if (productImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    setActive(active + 1);
  };

  return (
    <Card className="w-full  bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard>
        <TitleCard title="Product Media" />
      </HeaderCard>
      <CardContent className="w-full">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Upload Product Media
          </h2>
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center">
              <ImageUp
                size={40}
                className="text-gray-400 dark:text-gray-500 mb-2"
              />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Drag and drop your images here or click to browse
              </p>
            </div>
            <input
              id="file"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {productImages.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  src={image}
                  alt={`Preview ${index}`}
                  width={500}
                  height={500}
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
                <button
                  title="Remove Image"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          type="button"
          onClick={() => setActive(active - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition-all duration-200"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductMedia;
