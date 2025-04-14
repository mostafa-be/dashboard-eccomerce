"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MultiSelect } from "../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetAllCollectionsQuery } from "@/redux/features/collections/collectionsApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandsApi";
import { useGetAllTagsQuery } from "@/redux/features/tags/tagsApi";
import { useGetAllColorsQuery } from "@/redux/features/colors/colorsApi";
import { useGetAllSizesQuery } from "@/redux/features/sizes/sizesApi";

type ProductInfo = {
  price: number;
  estimatedPrice: number;
  quantity: number;
  quantityOriginal: number;
  collections: string;
  categories: string;
  brand: string;
  colors: string[];
  tags: string[];
  sizes: string[];
};

type ProductInformationProps = {
  productInfo: ProductInfo;
  setProductInfo: (info: ProductInfo) => void;
  setActive: (active: number) => void;
  active: number;
};

const ProductInformation = ({
  productInfo,
  setProductInfo,
  setActive,
  active,
}: ProductInformationProps) => {
  const { data: collectionsData } = useGetAllCollectionsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: categoriesData } = useGetAllCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: brandsData } = useGetAllBrandsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: tagsData } = useGetAllTagsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: colorsData } = useGetAllColorsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const { data: sizesData } = useGetAllSizesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const collections = Array.isArray(collectionsData?.collections)
    ? collectionsData.collections
    : [];
  const categories = Array.isArray(categoriesData?.categories)
    ? categoriesData.categories
    : [];
  const brands = Array.isArray(brandsData?.brands) ? brandsData.brands : [];
  const sizes = Array.isArray(sizesData?.sizes) ? sizesData.sizes : [];
  const tags = Array.isArray(tagsData?.tags) ? tagsData.tags : [];
  const colors = Array.isArray(colorsData?.colors)
    ? colorsData.colors.map(
        (color: { _id: string; name: string; code: string }) => ({
          label: color.name,
          value: color._id,
        })
      )
    : [];

  const initialValues = {
    price: productInfo.price,
    estimatedPrice: productInfo.estimatedPrice,
    quantity: productInfo.quantity,
    quantityOriginal: productInfo.quantity,
    collections: productInfo.collections,
    categories: productInfo.categories,
    brand: productInfo.brand,
    colors: productInfo.colors,
    tags: productInfo.tags,
    sizes: productInfo.sizes,
  };

  const validationSchema = Yup.object({
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    estimatedPrice: Yup.number()
      .required("Estimated price is required")
      .positive("Estimated price must be a positive number"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),
    collections: Yup.string().required("Collection is required"),
    categories: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    colors: Yup.array().min(1, "At least one color is required"),
    sizes: Yup.array().min(1, "At least one size is required"),
    tags: Yup.array().min(1, "At least one tag is required"),
  });

  const handleSubmit = (values: ProductInfo) => {
    setProductInfo({
      ...productInfo,
      price: values.price,
      estimatedPrice: values.estimatedPrice,
      quantity: values.quantity,
      collections: values.collections,
      categories: values.categories,
      brand: values.brand,
      colors: values.colors,
      tags: values.tags,
      sizes: values.sizes,
    });
    setActive(active + 1);
  };

  return (
    <div className="w-full  bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        Product Information
      </h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-5 space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Price
            </label>
            <Field
              name="price"
              type="number"
              as={Input}
              placeholder="Enter product price"
              className="w-full"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Estimated Price
            </label>
            <Field
              name="estimatedPrice"
              type="number"
              as={Input}
              placeholder="Enter estimated price"
              className="w-full"
            />
            <ErrorMessage
              name="estimatedPrice"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Quantity
            </label>
            <Field
              name="quantity"
              type="number"
              as={Input}
              placeholder="Enter product quantity"
              className="w-full"
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Collection
            </label>
            <Field name="collections">
              {({ field, form }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    form.setFieldValue("collections", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    {collections.map(
                      (collection: { _id: string; name: string }) => (
                        <SelectItem key={collection._id} value={collection._id}>
                          {collection.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="collections"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Category
            </label>
            <Field name="categories">
              {({ field, form }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setFieldValue("categories", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    {categories.map(
                      (category: { _id: string; name: string }) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="categories"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Brand
            </label>
            <Field name="brand">
              {({ field, form }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setFieldValue("brand", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black-100">
                    {brands.map((brand: { _id: string; name: string }) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="brand"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Colors
            </label>
            <Field name="colors">
              {({ field, form }: FieldProps) => (
                <MultiSelect
                  options={colors}
                  selected={field.value}
                  onChange={(selectedValues) =>
                    form.setFieldValue("colors", selectedValues)
                  }
                  placeholder="Select colors"
                />
              )}
            </Field>
            <ErrorMessage
              name="colors"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Sizes
            </label>
            <Field name="sizes">
              {({ field, form }: FieldProps) => (
                <MultiSelect
                  options={sizes.map((size: { _id: string; name: string }) => ({
                    label: size.name,
                    value: size._id,
                  }))}
                  selected={field.value}
                  onChange={(selectedValues) =>
                    form.setFieldValue("sizes", selectedValues)
                  }
                  placeholder="Select sizes"
                />
              )}
            </Field>
            <ErrorMessage
              name="sizes"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Tags
            </label>
            <Field name="tags">
              {({ field, form }: FieldProps) => (
                <MultiSelect
                  options={tags.map((tag: { _id: string; name: string }) => ({
                    label: tag.name,
                    value: tag._id,
                  }))}
                  selected={field.value}
                  onChange={(selectedValues) =>
                    form.setFieldValue("tags", selectedValues)
                  }
                  placeholder="Select tags"
                />
              )}
            </Field>
            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <Button
              type="button"
              onClick={() => setActive(active - 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-blue-650 hover:bg-blue-600 text-white min-w-32"
            >
              Next
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductInformation;
