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


interface Cart {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product; // Include the Product type here
}


interface signal {
  userId:string;
  signal:AbortSignal;
}

export const GetAllCartByUserId = async ({signal,userId}:signal):Promise<{Carts:Cart[]}>  => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Cart.GetAllCart}/user/${userId}`,
      signal: signal,
      // params: {
      //   userId: userId,
      // },
    });
    const carts = response.data;
    return {
      Carts: carts as Cart[],
    };
  } catch (error) {
    console.error("Error fetching cart by user ID:", error);
    throw error;
  }
}