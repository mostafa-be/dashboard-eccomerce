import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ImageUp } from "lucide-react";
import { useUploadImageMutation } from "@/redux/features/image/imageApi";

type Image = {
  public_id: string;
  url: string;
};


type ProductMediaProps = {
  productImages: Image[];
  setProductImages: (images: Image[]) => void;
};

const ProductMedia: React.FC<ProductMediaProps> = ({
  productImages,
  setProductImages,
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadImage] = useUploadImageMutation();

  const handleImage = async (formData: FormData) => {
    const response = (await uploadImage(formData)) ;
    const imageData = {
      public_id: response.image.public_id,
      url: response.image.url,
    };
    setProductImages([...productImages, imageData]);
    console.log(productImages);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImage(reader.result);
        const formData = new FormData();
        formData.append("file", file);
        handleImage(formData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        const formData = new FormData();
        formData.append("file", file);
        handleImage(formData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    // Handle next step logic here
  };

  return (
    <Card className="w-full mt-5 bg-white dark:bg-black-100 p-5 rounded-lg shadow flex flex-col">
      <HeaderCard>
        <TitleCard title="Product Media" />
      </HeaderCard>
      <CardContent className="mt-5">
        <div>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <Image
                src={image as string}
                title="selected image from clipboard..."
                alt="Selected"
                layout="responsive"
                width={500}
                height={500}
                className="max-h-full w-full object-cover"
              />
            ) : (
              <div className="w-full px-5 py-5 flex flex-col items-center justify-center">
                <ImageUp
                  size={60}
                  className="text-gray-800 dark:text-white rotate-180"
                />
                <span className="text-gray-800 dark:text-white">
                  Drag and drop your thumbnail here or click to browse
                </span>
              </div>
            )}
          </label>
        </div>
        <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productImages &&
            productImages.map((productImage, index) => (
              <div key={index} className="w-full rounded-lg border">
                <Image
                  src={productImage.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Button onClick={handleNext} type="button" className="bg-blue-650/80">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductMedia;
