import httpClient from "../../httpClient/httpClient";


import { apiLinks } from "../MainService";
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
  
interface IGetProductCompare {
    userId: string|null;
    signal: AbortSignal;
}
export const GetProductCompareProduct = async ({ userId,signal }: IGetProductCompare) => {
    try {
        const res = await httpClient.get({
            url: `${apiLinks.Compare.GetCompareProduct}/${userId}`,
            signal: signal,
        });
        const products = res.data;
        return {
          Products: products as Product[],
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Get Product Compare request failed:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
        throw error;
    }
}