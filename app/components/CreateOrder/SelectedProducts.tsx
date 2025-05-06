"use client";
import React, { useState } from "react";

import { Card, HeaderCard, TitleCard, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import CardProduct from "./CardProduct";
import { Product } from "@/app/@types/types";

type Item = {
  product: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

type SelectedProductsProps = {
  products: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedProducts: Item[];
};

/**
 * SelectedProducts Component
 * Allows filtering and selecting products for creating an order.
 *
 * @param {SelectedProductsProps} props - The component props.
 * @param {Product[]} props.products - The list of products to display.
 */
const SelectedProducts = ({
  products,
  setSelectedProducts,
  selectedProducts,
}: SelectedProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Filters products based on the search term.
   */
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Updates the selected product's options (color, size, quantity).
   *
   * @param {string} productId - The product ID.
   * @param {Partial<{ color: string; size: string; quantity: number }>} updates - The updates to apply.
   */

  /**
   * Toggles the selection of a product.
   *
   * @param {Product} product - The product to toggle.
   */

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="w-full flex items-center justify-between">
        <TitleCard title="Select Products" />
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </HeaderCard>
      <CardContent className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const selectedProduct = selectedProducts.find(
            (p) => p.product === product._id
          );

          return (
            <CardProduct
              key={product._id}
              product={product}
              selectedProduct={!!selectedProduct}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SelectedProducts;
