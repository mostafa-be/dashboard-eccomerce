import React from "react";
import ProductInformation from "./ProductInformation";
import ReplyCommentProduct from "./ReplyCommentProduct";
import StockManagement from "./StockManagement";
import ChangerExporter from "../ui/ChangerExporter";

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

type ProductProps = {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    estimatedPrice: number;
    quantity: number;
    quantityOriginal: number;
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
  refetch: () => void;
};

const ProductPage = ({ product, refetch }: ProductProps) => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Products", url: "/en/products" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter
        links={links}
        active="Product Details"
        isPDF={false}
        isCSV={false}
        isPeriod={false}
      />
      <ProductInformation product={product} />
      <StockManagement
        quantity={product.quantity}
        quantityOriginal={product.quantityOriginal}
      />
      <ReplyCommentProduct
        reviews={product.reviews}
        ratings={product.ratings}
        productId={product._id}
        refetch={refetch}
      />
    </section>
  );
};

export default ProductPage;
