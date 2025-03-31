import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { RemoveProductCompare } from "../Services/CompareService/RemoveProductCompare";
import { queryClient } from "../Services/MainService";

const compareFields = [
  { label: "Dung Tích", key: "subCategoryName" },
  { label: "Thành phần chính", key: "activeIngredients" },
  { label: "Công dụng chính", key: "mainBenefits" },
  { label: "Loại da", key: "skinType" },
  { label: "Vấn đề da", key: "skinConcerns" },
  { label: "Tác dụng", key: "skinEffect" },
  { label: "Thành phần chi tiết", key: "ingredients" },
];

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

export const CompareProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback nếu reload
  useEffect(() => {
    if (!location.state?.data) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const data = location.state?.data as { Products: Product[] };
  const userId = location.state?.userId as string;
  const CompareProducts = data?.Products || [];

  const { mutate } = useMutation({
    mutationFn: RemoveProductCompare,
    onSuccess: () => {
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

  const handleRemoveProductCompare = (product: Product) => {
    mutate({ userId, productId: product.id });
  };

  return (
    <section className="pt-[3.75rem] pb-[3.75rem] box-border">
      <div className="max-w-[1297px] px-[.78125rem] mx-auto w-full text-[clamp(14px,1rem,1rem)] box-border">
        <div className="lg:shadow-[6px_6px_39.7681px_rgba(0,0,0,0.05)] lg:bg-white lg:p-4">
          <h1 className="text-[#860315] font-bold text-center mb-10">
            So sánh sản phẩm
          </h1>

          <div className="flex justify-end mb-5">
            <Link
              to={"#"}
              className="text-white bg-[#860315] rounded-full flex items-center gap-2 px-4 h-[36px] font-medium"
            >
              <span>Chỉ hiện điểm khác biệt</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse w-full text-sm">
              <tbody>
                <tr>
                  <td className="w-[160px]"></td>
                  {CompareProducts.map((product) => (
                    <td
                      key={`info-${product.id}`}
                      className="w-[calc(100%/5)] text-center p-2 border border-gray-300 align-top"
                    >
                      <div className="relative bg-white shadow p-2 rounded">
                        <Link
                          to={"#"}
                          onClick={() => handleRemoveProductCompare(product)}
                          className="absolute top-0 right-2 z-10 bg-[rgba(134,3,21,0.5)] w-8 h-8 flex items-center justify-center rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m12 0H5"
                            />
                          </svg>
                        </Link>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-32 object-contain mb-2"
                        />
                        <h3 className="font-bold line-clamp-2 text-[#444]">
                          {product.name}
                        </h3>
                        <strong className="text-[rgb(134_3_21)] font-bold">
                          {product.originalPrice.toLocaleString()}đ
                        </strong>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Dòng so sánh các thuộc tính */}
                {compareFields.map((field) => (
                  <tr key={field.key}>
                    <td className="font-bold text-left border p-2 w-[160px]">
                      {field.label}
                    </td>
                    {CompareProducts.map((product) => {
                      const value = product[field.key as keyof Product];
                      return (
                        <td
                          key={`${field.key}-${product.id}`}
                          className="text-left border p-2"
                        >
                          {typeof value === "object" && value !== null
                            ? "name" in value
                              ? (value as SubCategory).name
                              : JSON.stringify(value)
                            : String(value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
