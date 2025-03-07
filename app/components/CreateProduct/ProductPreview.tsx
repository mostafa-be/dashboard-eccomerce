import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../ui/card";
import { Button } from "../ui/button";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useGetAllCollectionsQuery } from "@/redux/features/collections/collectionsApi";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";

type ProductPreviewProps = {
  productData: any;
  active: number;
  setActive: (active: number) => void;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({
  productData,
  active,
  setActive,
}) => {
  const {
    title,
    description,
    price,
    estimatedPrice,
    quantity,
    categories,
    collections,
    brand,
    tags,
    colors,
    sizes,
    images,
  } = productData;

  const handlePreview = () => {
    setActive(active - 1);
  };

  const { data: dataCategories } = useGetAllCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: dataCollections } = useGetAllCollectionsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: dataBrands } = useGetAllBrandsQuery(
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

  const filteredCategories = dataCategories?.categories.filter(
    (category: any) => categories.includes(category._id)
  );
  const filteredCollections = dataCollections?.collections.filter(
    (collection: any) => collections.includes(collection._id)
  );
  const filteredBrands = dataBrands?.brands.filter(
    (brand: any) => brand._id === brand
  );
  const filteredTags = dataTags?.tags.filter((tag: any) =>
    tags.includes(tag._id)
  );
  const filteredColors = dataColors?.colors.filter((color: any) =>
    colors.includes(color._id)
  );
  const filteredSizes = dataSizes?.sizes.filter((size: any) =>
    sizes.includes(size._id)
  );

  return (
    <Card className="w-full mt-5 bg-white dark:bg-black-100 p-5 rounded-lg shadow flex flex-col">
      <HeaderCard>
        <TitleCard title="Product Preview" />
      </HeaderCard>
      <CardContent className="mt-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Title:
          </h3>
          <p className="text-gray-700 dark:text-white">{title}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Description:
          </h3>
          <p className="text-gray-700 dark:text-white">{description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Price:
          </h3>
          <p className="text-gray-700 dark:text-white">{price}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Estimated Price:
          </h3>
          <p className="text-gray-700 dark:text-white">{estimatedPrice}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Quantity:
          </h3>
          <p className="text-gray-700 dark:text-white">{quantity}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Categories:
          </h3>
          <ul className="text-gray-700 dark:text-white">
            {filteredCategories?.map((category: any) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Collections:
          </h3>
          <ul className="text-gray-700 dark:text-white">
            {filteredCollections?.map((collection: any) => (
              <li key={collection._id}>{collection.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Brand:
          </h3>
          <p className="text-gray-700 dark:text-white">
            {filteredBrands?.[0]?.name}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Tags:
          </h3>
          <ul className="text-gray-700 dark:text-white">
            {filteredTags?.map((tag: any) => (
              <li key={tag._id}>{tag.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Colors:
          </h3>
          <ul className="text-gray-700 dark:text-white">
            {filteredColors?.map((color: any) => (
              <li key={color._id}>{color.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Sizes:
          </h3>
          <ul className="text-gray-700 dark:text-white">
            {filteredSizes?.map((size: any) => (
              <li key={size._id}>{size.name}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Images:
          </h3>
          {/*  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images?.map((image: any, index: number) => (
              <div key={index} className="w-full rounded-lg border">
                <Image
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>*/}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 justify-between">
        <Button
          onClick={handlePreview}
          type="button"
          className="bg-blue-650/50 w-40"
        >
          Preview
        </Button>
        <Button type="submit" className="bg-blue-650/80 w-40">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductPreview;
