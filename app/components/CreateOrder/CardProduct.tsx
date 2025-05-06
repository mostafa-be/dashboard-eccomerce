import { Color, Product, Size } from "@/app/@types/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

type CardProductProps = {
  product: Product;
  selectedProduct: boolean;
  selectedProducts: {
    product: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<
      {
        product: string;
        color: string;
        size: string;
        quantity: number;
        price: number;
      }[]
    >
  >;
};

/**
 * CardProduct Component
 * Displays a product card with options to select color, size, and quantity.
 * Allows adding or removing the product from the selected list.
 *
 * @param {CardProductProps} props - The component props.
 */
const CardProduct = ({
  product,
  selectedProduct,
  selectedProducts,
  setSelectedProducts,
}: CardProductProps) => {
  const { _id, title, price, colors, sizes, images, quantity } = product;
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(1);

  /**
   * Decreases the selected quantity by 1, ensuring it doesn't go below 1.
   */
  const minus = () => {
    setSelectedQuantity((prev) => Math.max(1, prev - 1));
  };

  /**
   * Increases the selected quantity by 1, ensuring it doesn't exceed the available stock.
   */
  const plus = () => {
    setSelectedQuantity((prev) => Math.min(quantity, prev + 1));
  };

  /**
   * Handles adding or updating the product in the selected products list.
   */
  const handleSelectProduct = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a color and size.");
      return;
    }

    const existingProductIndex = selectedProducts.findIndex(
      (item) => item.product === _id
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = {
        product: _id,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQuantity,
        price,
      };
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          product: _id,
          color: selectedColor,
          size: selectedSize,
          quantity: selectedQuantity,
          price,
        },
      ]);
    }

    toast.success("Product added to the order.");
  };

  /**
   * Handles removing the product from the selected products list.
   */
  const handleRemoveProduct = () => {
    setSelectedProducts((prev) => prev.filter((item) => item.product !== _id));
    toast.success("Product removed from the order.");
  };

  return (
    <div
      key={_id}
      className={`border rounded-lg p-4 flex flex-col items-center justify-between cursor-pointer ${
        selectedProduct
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
          : "border-gray-300 dark:border-gray-700"
      }`}
    >
      {/* Product Image */}
      <div className="w-24 h-24 relative">
        {images?.[0]?.url ? (
          <Image
            src={images[0].url}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Product Title and Price */}
      <h4 className="mt-3 text-sm font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
        {title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ${price.toFixed(2)}
      </p>

      {/* Color Selection */}
      <div className="w-full flex items-center flex-wrap gap-2">
        {colors &&
          (colors as Color[])?.map((color) => (
            <span
              key={color._id}
              title={color.name}
              style={{ backgroundColor: color.code }}
              className={`rounded-full w-6 h-6 border-2 cursor-pointer ${
                selectedColor === color._id
                  ? "border-blue-500"
                  : "border-gray-300 dark:border-gray-600"
              } hover:scale-110 transition-transform duration-200`}
              onClick={() => setSelectedColor(color._id)}
            />
          ))}
      </div>

      {/* Size Selection */}
      <div className="w-full mt-3 flex flex-wrap items-center gap-2">
        {sizes &&
          (sizes as Size[])?.map((size) => (
            <div
              key={size._id}
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                selectedSize === size._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setSelectedSize(size._id)}
            >
              <span className="text-sm capitalize">{size.name}</span>
            </div>
          ))}
      </div>

      {/* Quantity Selection */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center border rounded-md overflow-hidden">
          <div
            onClick={minus}
            className="flex items-center justify-center h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Minus size={20} />
          </div>
          <div className="flex items-center justify-center h-10 min-w-14 border-x">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedQuantity}
            </span>
          </div>
          <div
            onClick={plus}
            className="flex items-center justify-center h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Plus size={20} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex items-center justify-between w-full gap-2">
        <button
          onClick={handleSelectProduct}
          className={`flex-1 py-2 rounded-md text-sm font-semibold ${
            selectedProduct ? "bg-blue-500 text-white " : "bg-gray-200"
          } dark:text-black hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors duration-200`}
        >
          {selectedProduct ? "Update" : "Select"}
        </button>
        {selectedProduct && (
          <button
            onClick={handleRemoveProduct}
            className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            title="Remove Product"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
