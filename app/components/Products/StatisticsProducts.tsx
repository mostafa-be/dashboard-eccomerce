import React, { useEffect, useState } from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

type StatisticsProductsProps = {
  products: any;
};

const StatisticsProducts = ({ products }: StatisticsProductsProps) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [outStock, setOutStock] = useState(0);
  const [bestProduct, setBestProduct] = useState("");

  useEffect(() => {
    const total = products?.length || 0;
    const inStockCount =
      (products &&
        products?.filter((product: any) => product.quantity > 0).length) ||
      0;
    const outStockCount =
      (products &&
        products?.filter((product: any) => product.quantity === 0).length) ||
      0;
    const bestProductItem =
      products &&
      products?.reduce((prev, current) =>
        prev.sales > current.sales ? prev : current
      );

    setTotalProducts(total);
    setInStock(inStockCount);
    setOutStock(outStockCount);
    setBestProduct(bestProductItem?.title || "N/A");
  }, [products]);

  const statistics = [
    {
      title: "Total Products",
      value: totalProducts,
    },
    {
      title: "Products In Stock",
      value: inStock,
    },
    {
      title: "Products Out of Stock",
      value: outStock,
    },
    {
      title: "Best Selling Product",
      value: bestProduct,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
      {statistics.map((statistic, index) => (
        <Card
          key={index}
          className="w-full bg-white dark:bg-black-100 rounded-lg shadow p-3"
        >
          <HeaderCard className="flex items-center justify-between">
            <TitleCard title={statistic.title} />
          </HeaderCard>
          <CardContent className="w-full mt-5 flex flex-col">
            <span className="text-gray-900 dark:text-white text-lg text-center font-normal">
              {statistic.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsProducts;
