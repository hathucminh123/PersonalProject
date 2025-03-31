import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";


interface IAddProductCompare {
    productId: string |undefined;
    userId: string |null;
}

export const AddProductCompare = async ({ productId, userId }: IAddProductCompare) => {
  try {
    const res = await httpClient.post({
      url: `${apiLinks.Compare.CreateCompare}/${userId}/${productId}`,
      data: { productId, userId },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add Product Compare request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}