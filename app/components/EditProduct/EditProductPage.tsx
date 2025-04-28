"use client";
import React, { useEffect, useState } from "react";
import ProductDescription from "../CreateProduct/ProductDescription";
import ProductInformation from "../CreateProduct/ProductInformation";
import ProductMedia from "../CreateProduct/ProductMedia";
import SteperProduct from "../CreateProduct/SteperProduct";
import Change from "./Change";
import ProductPreview from "../CreateProduct/ProductPreview";
import ChangerExporter from "../ui/ChangerExporter";

type EditProductPageProps = {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    estimatedPrice: number;
    quantity: number;
    quantityOriginal: number;
    discount: number;
    categories: { _id: string; name: string };
    collections: { _id: string; name: string };
    brand: { _id: string; name: string };
    tags: { _id: string; name: string }[];
    colors: { _id: string; name: string; code: string }[];
    sizes: { _id: string; name: string }[];
    images: { public_id: string; url: string }[];
  };
  refetch: () => void;
};
const EditProductPage = ({ product }: EditProductPageProps) => {
  const {
    _id,
    title,
    description,
    price,
    estimatedPrice,
    quantity,
    quantityOriginal,
    categories,
    collections,
    brand,
    tags,
    colors,
    sizes,
    images,
  } = product;
  const [active, setActive] = useState(0);
  const [productDescription, setProductDescription] = useState({
    title: title,
    description: description,
  });
  const [productInfo, setProductInfo] = useState({
    price: price,
    estimatedPrice: estimatedPrice,
    quantity: quantity,
    quantityOriginal: quantityOriginal,
    categories: categories?._id,
    collections: collections?._id,
    brand: brand?._id,
    tags: tags.map((tag) => tag?._id),
    colors: colors.map((color) => color?._id),
    sizes: sizes.map((size) => size?._id),
  });
  const [productImages, setProductImages] = useState<string[]>(
    images.map((image) => image.url)
  );
  const [productData, setProductData] = useState();
  useEffect(() => {
    const discount =
      productInfo.price > 0 && productInfo.estimatedPrice > 0
        ? (
            ((productInfo.estimatedPrice - productInfo.price) /
              productInfo.estimatedPrice) *
            100
          ).toFixed(2)
        : 0;

    setProductData({
      ...productDescription,
      ...productInfo,
      images: productImages || [],
      discount,
    });
  }, [productDescription, productImages, productInfo]);

  const renderStep = () => {
    switch (active) {
      case 0:
        return (
          <ProductDescription
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            active={active}
            setActive={setActive}
          />
        );
      case 1:
        return (
          <ProductInformation
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            active={active}
            setActive={setActive}
          />
        );
      case 2:
        return (
          <ProductMedia
            productImages={productImages}
            setProductImages={setProductImages}
            active={active}
            setActive={setActive}
          />
        );
      case 3:
        return (
          <ProductPreview
            productData={productData}
            active={active}
            setActive={setActive}
            isEdit={true}
            productId={_id}
          />
        );
      default:
        return null;
    }
  };
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/products" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter
        links={links}
        active="Edit Product"
        isCSV={false}
        isPDF={false}
        isPeriod={false}
      />
      <div className="w-full grid md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9  gap-3 min-h-screen">
        <div className="w-full md:col-span-3 lg:col-span-5 xl:col-span-7">{renderStep()}</div>
        <div className="w-full md:col-span-2 lg:col-span-3 xl:col-span-2">
          <SteperProduct active={active} setActive={setActive} />
        </div>
      </div>
    </section>
  );
};

export default EditProductPage;
