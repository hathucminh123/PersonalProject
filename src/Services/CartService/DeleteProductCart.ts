import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";


interface DeleteProductCart {
  userId: string;
  productId: string;
}
export const DeleteProductCart = async ({ userId, productId }: DeleteProductCart) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Cart.DeleteCart}/${productId}/${userId}`,
      params: {
        userId: userId,
        productId: productId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    throw error;
  }
};