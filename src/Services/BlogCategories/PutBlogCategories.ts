import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogCategories {
    data: { [key: string]: string | undefined };
    id:number;
  }

export const PutBlogCategories = async ({ id,data}: BlogCategories) => {
  try {
    const res = await httpClient.put({
      url: `${apiLinks.BlogCategories.Put}/${id}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Put Blog Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}