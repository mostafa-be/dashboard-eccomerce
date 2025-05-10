import React from "react";
import { Banner } from "@/app/@types/types";
import Image from "next/image";

/**
 * BannerDetails Component
 * Displays detailed information about a banner, including title, description, images, and product association.
 *
 * @param {Props} props - The component props.
 * @param {Banner} props.banner - The banner data to display.
 * @returns {JSX.Element} The rendered banner details component.
 */
type Props = {
  banner: Banner;
};

const BannerDetails = ({ banner }: Props) => {
  const { title, subdescription, imageDesktop, imageMobile, product } =
    banner || {};

  return (
    <div className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-[16px] font-[400]">
        {subdescription}
      </p>

      {/* Desktop Image */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">
          Desktop Image
        </h3>
        {imageDesktop?.url ? (
          <Image
            src={imageDesktop.url}
            alt="Desktop Banner"
            width={500}
            height={300}
            className="rounded-lg object-cover"
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No desktop image available.
          </p>
        )}
      </div>

      {/* Mobile Image */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">
          Mobile Image
        </h3>
        {imageMobile?.url ? (
          <Image
            src={imageMobile.url}
            alt="Mobile Banner"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No mobile image available.
          </p>
        )}
      </div>

      {/* Associated Product */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">
          Associated Product
        </h3>
        {product ? (
          <p className="text-gray-800 dark:text-gray-200">{product.title}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No associated product.
          </p>
        )}
      </div>
    </div>
  );
};

export default BannerDetails;
