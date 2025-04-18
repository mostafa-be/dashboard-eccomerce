import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Product } from "./columns";
import {
  Package,
  CheckCircle,
  XCircle,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

type StatisticsProductsProps = {
  products: Array<Product>;
};

const StatisticsProducts = ({ products }: StatisticsProductsProps) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [outStock, setOutStock] = useState(0);
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [bestSellingProduct, setBestSellingProduct] = useState<Product | null>(
    null
  );

  useEffect(() => {
    const total = products?.length || 0;
    const inStockCount =
      products?.filter((product: Product) => product.quantity > 0).length || 0;
    const outStockCount =
      products?.filter((product: Product) => product.quantity === 0).length ||
      0;
    const purchasedCount = products?.reduce(
      (sum, product) => sum + (product.quantityOriginal - product.quantity),
      0
    );
    const bestProduct =
      products.length > 0
        ? products.reduce((prev, current) =>
            prev.quantityOriginal - prev.quantity >
            current.quantityOriginal - current.quantity
              ? prev
              : current
          )
        : null;

    setTotalProducts(total);
    setInStock(inStockCount);
    setOutStock(outStockCount);
    setTotalPurchased(purchasedCount || 0);
    setBestSellingProduct(bestProduct);
  }, [products]);

  const statistics = [
    {
      title: "Total Products",
      value: totalProducts,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      textColor: "text-white",
      icon: <Package size={90} className="text-white opacity-20" />,
    },
    {
      title: "Products In Stock",
      value: inStock,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      textColor: "text-white",
      icon: <CheckCircle size={90} className="text-white opacity-20" />,
    },
    {
      title: "Products Out of Stock",
      value: outStock,
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      textColor: "text-white",
      icon: <XCircle size={90} className="text-white opacity-20" />,
    },
    {
      title: "Total Purchased",
      value: totalPurchased,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      textColor: "text-black",
      icon: <ShoppingCart size={90} className="text-black opacity-20" />,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {statistics.map((statistic, index) => (
        <Card
          key={index}
          className={`relative w-full rounded-lg shadow-lg p-5 flex flex-col items-center justify-center overflow-hidden ${statistic.bgColor} hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="absolute top-2 left-2">{statistic.icon}</div>
          <CardContent className="flex flex-col items-center z-10">
            <h4
              className={`text-lg font-semibold text-center ${statistic.textColor}`}
            >
              {statistic.title}
            </h4>
            <span className={`text-4xl font-extrabold ${statistic.textColor}`}>
              {statistic.value}
            </span>
          </CardContent>
        </Card>
      ))}
      {bestSellingProduct && (
        <Card className="relative w-full col-span-1 md:col-span-2 rounded-lg shadow-lg p-5 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-purple-500 to-purple-700 hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-2 left-2">
            <TrendingUp size={90} className="text-white opacity-20" />
          </div>
          <CardContent className="flex flex-col items-center z-10">
            <h4 className="text-lg font-semibold text-center text-white">
              Best Selling Product
            </h4>
            <span className="text-4xl font-extrabold text-white">
              {bestSellingProduct.title}
            </span>
            <p className="text-sm text-white">
              Sold:{" "}
              {bestSellingProduct.quantityOriginal -
                bestSellingProduct.quantity}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StatisticsProducts;
