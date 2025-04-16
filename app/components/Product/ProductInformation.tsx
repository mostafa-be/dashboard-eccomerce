"use client";

import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
type IComment = {
  user: {
    name: string;
    email: string;
    isVerified: boolean;
  };
  comment: string;
  commentReplies?: IComment[];
  _id: string;
};
type ProductInformationProps = {
  product: {
    title: string;
    description: string;
    price: number;
    estimatedPrice: number;
    discount: number;
    categories: { name: string };
    collections: { name: string };
    brand: { name: string };
    tags: { name: string }[];
    colors: { name: string; code: string }[];
    sizes: { name: string }[];
    images: { url: string }[];
    ratings?: number;
    reviews: {
      user: { name: string; email: string; isVerified: boolean };
      rating: number;
      review: string;
      commentReplies: IComment[];
      _id: string;
    }[];
  };
};

const ProductInformation = ({ product }: ProductInformationProps) => {
  const {
    title,
    description,
    price,
    estimatedPrice,
    discount,
    categories,
    collections,
    brand,
    tags,
    colors,
    sizes,
    images,
    ratings = 0,
    reviews,
  } = product;

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard>
        <TitleCard
          title="Product Details"
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="w-full mt-5 space-y-6">
        {/* Carousel Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
              {images.length > 0 ? (
                <Image
                  src={images[0].url}
                  alt="Product Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500 dark:text-gray-400">
                    No Image Available
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={`${
                    index < Math.round(ratings)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ${price}
              </p>
              <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                ${estimatedPrice}
              </p>
              <span className="text-sm text-red-500 font-semibold">
                {discount}% off
              </span>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-sm text-gray-600 dark:text-gray-300"
            ></p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Category:</strong> {categories.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Collection:</strong> {collections.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Brand:</strong> {brand.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Tags:</strong> {tags.map((tag) => tag.name).join(", ")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Colors:</strong>{" "}
                {colors.map((color) => color.name).join(", ")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Sizes:</strong>{" "}
                {sizes.map((size) => size.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInformation;
