import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#1D7C42] border-solid rounded-full animate-spin"></div>
    </div>
  );
};
export const ProductDetailsloader = () => {
  return (
    <div className="mb-20">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse mx-auto sm:mx-0 sm:flex-1 sm:text-left"></div>
      </div>

      {/* Product image skeleton */}
      <div className="w-full h-64 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>

      <div className="space-y-4 mt-4">
        {/* Product title and price */}
        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>

        {/* Rating */}
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>

        {/* Dispensary info */}
        <div className="flex items-center gap-3 mt-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>

        {/* Grams input */}
        <div className="mt-6">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
        </div>

        {/* Fulfillment method */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-24 rounded animate-pulse"></div>
            <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse ml-6"></div>
            <div className="h-4 bg-gray-200 w-24 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Warnings */}
        <div className="mt-6">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <div className="w-full h-12 bg-gray-300 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default { Loader, ProductDetailsloader };
