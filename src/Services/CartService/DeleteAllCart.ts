import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface DeleteAllCart {
  userId: string;
}

export const deleteAllCart = async (userId: DeleteAllCart) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Cart.DeleteAllCart}/${userId}`,
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting all cart items:", error);
    throw error;
  }
};
