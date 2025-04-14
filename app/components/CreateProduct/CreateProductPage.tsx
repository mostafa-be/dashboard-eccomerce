"use client";
import React, { useEffect, useState } from "react";
import Change from "./Change";
import ProductInformation from "./ProductInformation";
import ProductMedia from "./ProductMedia";
import ProductPreview from "./ProductPreview";
import ProductDescription from "./ProductDescription";
import SteperProduct from "./SteperProduct";

const CreateProductPage = () => {
  const [active, setActive] = useState(0);
  const [productDescription, setProductDescription] = useState({
    title: "",
    description: "",
  });
  const [productInfo, setProductInfo] = useState({
    price: 0,
    estimatedPrice: 0,
    quantity: 0,
    quantityOriginal: 0,
    categories: "",
    collections: "",
    brand: "",
    tags: [],
    colors: [],
    sizes: [],
  });
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const discount =
      productInfo.price > 0
        ? (
            ((productInfo.estimatedPrice - productInfo.price) /
              (productInfo.estimatedPrice + productInfo.price)) *
            100
          ).toFixed(2)
        : 0;

    setProductData({
      ...productDescription,
      ...productInfo,
      images: productImages,
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full">
      <Change />
      <div className="w-full mt-10 flex flex-wrap-reverse justify-between gap-3 min-h-screen">
        <div className="w-full md:w-[75%]">{renderStep()}</div>
        <div className="w-full md:w-[23%]">
          <SteperProduct active={active} setActive={setActive} />
        </div>
      </div>
    </section>
  );
};

export default CreateProductPage;
