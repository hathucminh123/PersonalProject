import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Products {
  data: { [key: string]: string | undefined };
}

export const PostProducts = async ({ data }: Products) => {
  try {
    const res = await httpClient.post({
      url: apiLinks.Product.CreateProducts,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Post Products request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
