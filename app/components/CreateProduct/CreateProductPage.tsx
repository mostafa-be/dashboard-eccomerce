"use client";
import React, { useEffect, useState } from "react";
import Change from "./Change";
import ProductInformation from "../Products/ProductInformation";
//import ProductOptions from "./ProductOptions";
import ProductMedia from "./ProductMedia";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";
import ProductPreview from "./ProductPreview";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Image = {
  public_id: string;
  url: string;
};

const CreateProductPage = () => {
  const [active, setActive] = useState(0);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    quantity: 0,
    categories: "",
    collections: "",
    brand: "",
    tags: [],
    colors: [],
    sizes: [],
  });
  const [productImages, setProductImages] = useState<Image[]>();
  const [productData, setProductData] = useState({});
  const date = new Date();
  const [createProduct, { isLoading, isSuccess, isError }] =
    useCreateProductMutation();

  useEffect(() => {
    setProductData({
      title: productInfo.title,
      description: productInfo.description,
      price: productInfo.price,
      estimatedPrice: productInfo.estimatedPrice,
      quantityOriginal: productInfo.quantity,
      quantity: productInfo.quantity,
      categories: productInfo.categories,
      collections: productInfo.collections,
      brand: productInfo.brand,
      discount:
        ((productInfo.price - productInfo.price) /
          (productInfo.price + productInfo.price)) *
        100,
      date: date,
      tags: productInfo.tags,
      colors: productInfo.colors,
      sizes: productInfo.sizes,
      images: [{ public_id: "string", url: "string" }],
    });
  }, [productImages, productInfo]);

  useEffect(() => {
    if (isSuccess) {
      redirect("/en/dashboard/products");
      toast.success("Product created successfully!");
    } else if (isError) {
      //  toast.error("Failed to create product.");
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return (
      <div className="w-flull h-dvh flex items-center justify-center">
        <h1 className="text-xl text-black dark:text-white">Loading ...</h1>
      </div>
    );
  }
  const handleProductCreate = async () => {
    const data = productData;
    if (!isLoading) {
      await createProduct(data);
    }
  };

  return (
    <section className="w-full">
      <Change />
      <div className="w-full  flex   flex-wrap-reverse gap-3 min-h-screen">
        <form onSubmit={handleProductCreate} className="w-full  md:w-[75%] ">
          {active === 0 && (
            <ProductInformation
              productInfo={productInfo}
              setProductInfo={setProductInfo}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 1 && (
            <ProductMedia
              productImages={productImages}
              setProductImages={setProductImages}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <ProductPreview
              productData={productData}
              active={active}
              setActive={setActive}
            />
          )}
        </form>
        {/* <div className=" flex-grow ">
          <ProductOptions active={active} />
        </div>*/}
      </div>
    </section>
  );
};

export default CreateProductPage;
/**
 *           {active === 1 && (
            <ProductData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <ProductContent
              productContentData={productContentData}
              setProductContentData={setProductContentData}
              active={active}
              setActive={setActive}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 3 && (
            <ProductPreview
              productData={productData}
              active={active}
              setActive={setActive}
              handleProductCreate={handleProductCreate}
            />
          )}
 */
