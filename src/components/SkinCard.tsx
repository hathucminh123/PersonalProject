import { Link } from "react-router-dom";

import React from "react";
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

interface Props {
  product: Product;
}
const SkinCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="w-[205.4px] mr-[15px] h-auto flex-shrink-0  relative transition-transform block">
      <div
        className="h-[100%] flex flex-col justify-between relative 
    shadow-[6px_8px_39.7681px_#0000000d] 
    bg-white  gap-2 rounded-md p-[10px]"
      >
        <div className="relative">
          <Link
            to={`/detail/${product.id}`}
            className="relative flex justify-center items-center aspect-[259/250]  h-auto rounded-[10px] 
    overflow-hidden transition-all duration-200 ease-in-out"
          >
            <img
              // src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
              // alt="máy rửa mặt"
              src={product.imageUrl}
              alt={product.name}
              className="static w-full h-full object-contain 
    top-0 left-0 
    transition-all duration-300 ease-in-out inline hover:scale-110"
            />
          </Link>
          <ul className="m-0 p-0 list-none">
            {product.isBestSeller ? (
              <li className="flex ">
                <span className="bg-[#ff0000] text-white left-[0.25rem] top-[0.25rem] text-[12px] absolute z-5 pl-[8px] pr-[8px] font-medium rounded-full transition-all duration-200 ease-in-ou">
                  💥 Best Seller
                </span>
              </li>
            ) : (
              <li className="flex ">
                <span className="bg-[#ff0000] text-white left-[0.25rem] top-[0.25rem] text-[12px] absolute z-5 pl-[8px] pr-[8px] font-medium rounded-full transition-all duration-200 ease-in-ou">
                  ️🎉 Sản phẩm mới
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col justify-between h-full text-left">
          <div>
            <ul className="flex static flex-wrap items-center mt-1 gap-1 m-0 p-0 list-none">
              <li className="flex">
                <span className="bg-[#3c3c3c] text-[#ffffff] static text-[11px] z-5  transition-all duration-200 ease-in-out pr-[8px] pl-[8px] font-normal rounded-full">
                  BEAUTY DEVICES OF THE YEAR
                </span>
              </li>
            </ul>
            <h3 className="h-[2.625rem] text-[14px] text-gray-700  leading-[1.5] line-clamp-2 hover:text-[#860315] font-bold">
              <Link
                to={`/detail/${product.id}`}
                className="relative  transition-[background-size] duration-[350ms] "
              >
                {product.name}
              </Link>
            </h3>
            <div className="flex justify-between mt-[10px] mb-[10px] gap-[0.5rem]">
              <div className="mt-[0px] flex flex-col flex-wrap gap-x-1 flex-[1_1_0%]">
                <span className="text-[14px] text-[#860315] font-extrabold leading-[1.5]">
                  {product.finalPrice.toLocaleString()} đ
                </span>
                <span className="text-gray-500 font-medium leading-[1.5] line-through lg:text-xs">
                  {product.originalPrice.toLocaleString()} đ
                </span>
              </div>
              <div
                className="flex justify-center items-center bg-[#860315] px-[6px] h-[17px] 
    text-white font-medium text-xs rounded-[2px]"
              >
                <span>{product.discountPercentage}%</span>
              </div>
            </div>
            <div className="mt-[0.5rem] text-[14px] text-gray-600 font-medium leading-[1.6] overflow-hidden line-clamp-2">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full text-[14px]">
            <div className="mt-1 bg-[rgba(68,68,68,0.1)] h-full text-gray-600 text-left border border-[rgba(68,68,68,0.2)] rounded px-1 py-[2px] lg:text-xs">
              <p className="bg-[#468fff] text-[#ffffff] m-0">
                {product.skinEffect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinCard;
