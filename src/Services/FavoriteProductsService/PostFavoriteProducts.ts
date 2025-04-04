import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";


interface IAddProductFavorite {
    productId: string |undefined;
    userId: string |null;
}

export const PostFavoriteProducts = async ({ productId, userId }: IAddProductFavorite) => {
  try {
    const res = await httpClient.post({
      url: `${apiLinks.FavoriteProducts.Post}`,
      data: { productId, userId },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add Product Favorite request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}