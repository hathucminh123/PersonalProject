import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface ProductId {
  id: number;
}

export const DeleteJobPost = async ({ id }: ProductId) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Product.DeleteProducts}/${id}`,
      params: { id },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Products request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
