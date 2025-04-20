import React, { useEffect } from "react";
import { Card, CardFooter, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useGetCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useGetCollectionQuery } from "@/redux/features/collections/collectionsApi";
import { useGetBrandQuery } from "@/redux/features/brand/brandsApi";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";
import Image from "next/image";

type ProductPreviewProps = {
  productData: {
    title: string;
    description: string;
    price: number;
    estimatedPrice: number;
    categories: string;
    collections: string;
    brand: string;
    images: File[];
    colors: string[];
    sizes: string[];
    tags: string[];
    quantityOriginal?: number;
    quantity?: number;
    discount?: number;
  };
  active: number;
  setActive: (active: number) => void;
  isEdit: boolean;
  productId: string;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({
  productData,
  setActive,
  active,
  isEdit,
  productId,
}) => {
  const { title, description, price, estimatedPrice, brand, discount, images } =
    productData;

  const validImages = Array.isArray(images) ? images : []; // Ensure images is an array

  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  const { data: dataBrand } = useGetBrandQuery(
    { id: brand },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataColors } = useGetAllColorsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataSizes } = useGetAllSizesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataTags } = useGetAllTagsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataCollection } = useGetCollectionQuery(
    { id: productData.collections },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataCategory } = useGetCategoryQuery(
    { id: productData.categories },
    { refetchOnMountOrArgChange: true }
  );

  const filteredColors = dataColors?.colors.filter(
    (color: { _id: string; name: string }) =>
      productData.colors.includes(color._id)
  );

  const filteredSizes = dataSizes?.sizes.filter(
    (size: { _id: string; name: string }) =>
      productData.sizes.includes(size._id)
  );

  const filteredTags = dataTags?.tags.filter(
    (tag: { _id: string; name: string }) => productData.tags.includes(tag._id)
  );
  const category = dataCategory?.category || {};
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product created successfully!");
      redirect("/en/dashboard/products");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, isError, error]);

  const handleProductCreate = async () => {
    const data = productData;
    if (!isLoading) {
      await createProduct(data);
    }
  };
  return (
    <Card className="w-full  bg-white dark:bg-black-100 shadow space-y-5 rounded-lg p-6">
      <CardContent className="w-full">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={validImages[0]} // Convert File to URL
            width={500}
            height={500}
            alt="Product Image"
            className="w-full h-full object-cover rounded-md"
          />
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded-md">
            Bestseller
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Collection: {dataCollection?.collection?.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Categories: {category?.name}
          </p>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-400 ${
                  index < 4 ? "fas fa-star" : "far fa-star"
                }`}
              ></span>
            ))}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              (120 reviews)
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-lg font-semibold text-gray-700 dark:text-white">
              ${price}
            </p>
            <p className="text-sm mb-2 line-through text-gray-500 dark:text-gray-400">
              ${estimatedPrice}
            </p>
            <span className="text-sm text-red-500 font-semibold">
              {discount}% off
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700 dark:text-white mb-2">
              Description:
            </h4>
            <div
              className="text-sm text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700 dark:text-white mb-2">
              Additional Information:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
              <li>Brand: {dataBrand?.brand?.name}</li>
              <li>
                Available Colors:{" "}
                {filteredColors
                  ?.map((color: { _id: string; name: string }) => color.name)
                  .join(", ")}
              </li>
              <li>
                Available Sizes:{" "}
                {filteredSizes
                  ?.map((size: { _id: string; name: string }) => size.name)
                  .join(", ")}
              </li>
              <li>
                Tags:{" "}
                {filteredTags
                  ?.map((tag: { _id: string; name: string }) => tag.name)
                  .join(", ")}
              </li>
            </ul>
          </div>
        </div>
        <Button
          type="button"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          Buy Now
        </Button>{" "}
      </CardContent>
      <CardFooter className="w-full flex items-center justify-between ">
        <Button
          type="button"
          onClick={() => setActive(active - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleProductCreate}
          className={`bg-blue-650 hover:bg-blue-600 text-white ${
            isLoading ? "cursor-progress" : "cursor-pointer"
          } min-w-32`}
          disabled={isLoading}
        >
          {isLoading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Product"
            : "Create Product"}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductPreview;
