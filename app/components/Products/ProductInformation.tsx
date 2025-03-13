"use client";
import React, { FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  HeaderCard,
  TitleCard,
  CardFooter,
} from "../ui/card";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useGetAllCollectionsQuery } from "@/redux/features/collections/collectionsApi";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultiSelect from "../ui/multi-select";

type ProductInformationProps = {
  productInfo: any;
  setProductInfo: (product: any) => void;
  active: number;
  setActive: (active: number) => void;
};
type Category = {
  _id: string;
  name: string;
};
type Collection = {
  _id: string;
  name: string;
};
type Brand = {
  _id: string;
  name: string;
};
type Tag = {
  _id: string;
  name: string;
};
type Color = {
  _id: string;
  name: string;
};
type Size = {
  _id: string;
  name: string;
};

const ProductInformation: FC<ProductInformationProps> = ({
  productInfo,
  setProductInfo,
  active,
  setActive,
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleEditorChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    setProductInfo({ ...productInfo, description: content || "" });
  };

  const handleCategoryChange = (value: string) => {
    setProductInfo({ ...productInfo, categories: value });
  };

  const handleCollectionChange = (value: string) => {
    setProductInfo({ ...productInfo, collections: value });
  };

  const handleBrandChange = (value: string) => {
    setProductInfo({ ...productInfo, brand: value });
  };

  const handleTagsChange = (values: string[]) => {
    setProductInfo({ ...productInfo, tags: values });
  };

  const handleColorsChange = (values: string[]) => {
    setProductInfo({ ...productInfo, colors: values });
  };

  const handleSizesChange = (values: string[]) => {
    setProductInfo({ ...productInfo, sizes: values });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setActive(active + 1);
    console.log(productInfo);
    // Handle form submission logic here
  };

  const editorRef = React.useRef<Editor>(null);
  const categories = dataCategories?.categories || [];
  const collections = dataCollections?.collections || [];
  const brands = dataBrands?.brands || [];
  const tags = dataTags?.tags || [];
  const colors = dataColors?.colors || [];
  const sizes = dataSizes?.sizes || [];

  return (
    <Card className="w-full mt-5 bg-white dark:bg-black-100 p-5 rounded-lg shadow flex flex-col">
      <HeaderCard>
        <TitleCard title="Product Information " />
      </HeaderCard>
      <CardContent className="mt-5">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Title
          </label>
          <Input
            type="text"
            name="title"
            value={productInfo.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full active:!border-blue-650  "
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Description
          </label>
          <Editor
            initialValue={productInfo.description}
            previewStyle="vertical"
            height="300px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
            onChange={handleEditorChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Collection
          </label>
          <Select
            value={productInfo.collections?.name || ""}
            onValueChange={handleCollectionChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection: Collection) => (
                <SelectItem
                  key={collection._id}
                  value={collection._id}
                  className="capitalize"
                >
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Category
          </label>
          <Select
            value={productInfo.categories?.name || ""}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                  className="capitalize"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Brand
          </label>
          <Select
            value={productInfo.brand?.name || ""}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand: Brand) => (
                <SelectItem
                  key={brand._id}
                  value={brand._id}
                  className="capitalize"
                >
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Tags
          </label>
          <MultiSelect
            values={productInfo.tags}
            onChange={handleTagsChange}
            options={tags.map((tag: Tag) => ({
              label: tag.name,
              value: tag._id,
            }))}
            placeholder="Select tags"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Colors
          </label>
          <MultiSelect
            values={productInfo.colors}
            onChange={handleColorsChange}
            options={colors.map((color: Color) => ({
              label: color.name,
              value: color._id,
            }))}
            placeholder="Select colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Sizes
          </label>
          <MultiSelect
            values={productInfo.sizes}
            onChange={handleSizesChange}
            options={sizes.map((size: Size) => ({
              label: size.name,
              value: size._id,
            }))}
            placeholder="Select sizes"
          />
        </div>
        <div className="mb-4 max-md:flex-col flex items-center gap-4">
          {" "}
          <div className="w-full">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Price
            </label>
            <Input
              type="number"
              name="price"
              min={0}
              value={productInfo.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Estimated Price
            </label>
            <Input
              type="number"
              name="estimatedPrice"
              value={productInfo.estimatedPrice}
              min={0}
              onChange={handleChange}
              placeholder="Enter estimated price"
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Quantity
          </label>
          <Input
            type="number"
            name="quantity"
            value={productInfo.quantity}
            onChange={handleChange}
            placeholder="Enter product quantity"
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Button onClick={handleNext} type="button" className="bg-blue-650/80">
          Next{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductInformation;
