import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { RemoveProductCompare } from "../Services/CompareService/RemoveProductCompare";
import { queryClient } from "../Services/MainService";
interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
  isBestSeller: boolean;
  stock: number;
  tags: string;
  imageUrl: string;
  createdAt: string;
  subCategoryId: string;
  subCategory: SubCategory;
  subCategoryName: string;
  skinEffect: string;
  activeIngredients: string;
  expShelfLife: number;
  paoShelfLife: number;
  skinType: string;
  benefits: string;
  ingredients: string;
  mainBenefits: string;
  skinConcerns: string;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  categoryId: string;
  categoryName: string | null;
  productCount: number;
  createdAt: string;
}

interface ProductCompareProps {
  product: Product;
  userId: string | null;
  refetch: () => void;
}

export const ProductCompare: React.FC<ProductCompareProps> = ({
  product,
  userId,
  refetch,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: RemoveProductCompare,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["Compare-Products", userId],

        refetchType: "active",
      
      });
      console.log("Remove Product Compare successfully");
    },
    onError: (error) => {
      console.error("Remove Product Compare request failed:", error);
    },
  });

  const handleRemoveProductCompare = () => {
    mutate({ userId: userId, productId: product.id });
  };
  return (
    <div className="flex flex-wrap sm:flex-row justify-start gap-3 h-auto lg:rounded p-[10px] -mr-[10px] -ml-[10px] lg:ml-[-12px] relative shadow bg-white overflow-hidden ">
      <div className="!pl-[12px] !pr-[0] relative w-[160px] h-[160px] ">
        <img
          className="w-[160px] h-[160px] inline max-w-full  align-middle"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="!pl-[12px] !pr-[0] flex flex-col h-full text-left ">
        <h4 className="line-clamp-2 overflow-hidden h-auto font-semibold text-sm text-left leading-[1.5] text-[rgb(68_68_68/1)]">
          {product.name}
        </h4>
        <div className="mt-[.25rem] mb-[.25rem] flex justify-between gap-[.5rem]">
          <div className="flex flex-row justify-start items-start flex-1 flex-wrap gap-x-1">
            <span className="text-[rgb(134_3_21/1)] font-normal text-[11px] leading-[1.5]">
              {product.originalPrice}đ
            </span>
          </div>
        </div>
        <div>
          <Link
            to={"#"}
            onClick={handleRemoveProductCompare}
            className={`absolute top-0 right-0 flex justify-center items-center z-[1] rounded w-8 h-8 ${
              isPending
                ? "bg-gray-300 cursor-not-allowed animate-pulse"
                : "bg-[rgb(229_231_235/1)] text-[rgb(134_3_21/1)]"
            }`}
          >
            {isPending ? (
              <svg
                className="w-4 h-4 animate-spin text-[rgb(134_3_21/1)]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M9 3V4H4V6H5V19A2 2 0 0 0 7 21H17A2 2 0 0 0 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6Z" />
              </svg>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
