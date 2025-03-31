import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Product {
  data: { [key: string]: string | number | number[]|undefined |null};
  id: number;
}

export const PutJobPost = async ({ data, id }: Product) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.Product.UpdateProducts}/${id}`,
      data: data,
      params: { id },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Put Product request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
