import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogCategories {
    // data: { [key: string]: string | undefined };
    id:number;
  }

export const DeleteBlogCategories = async ({ id}: BlogCategories) => {
  try {
    const res = await httpClient.delete({
      url: `${apiLinks.BlogCategories.Delete}/${id}`,
    //   data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Blog Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}