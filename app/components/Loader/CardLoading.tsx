import React from "react";

type Props = {
  className?: string;
};

const CardLoading = ({ className }: Props) => {
  return (
    <div
      className={`w-full bg-gray-200 animate-pulse rounded-md ${className}`}
    />
  );
};

export default CardLoading;
