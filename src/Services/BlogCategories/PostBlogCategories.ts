import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogCategories {
    data: { [key: string]: string | undefined };
  }

export const PostBlogCategories = async ({ data}: BlogCategories) => {
  try {
    const res = await httpClient.post({
      url: `${apiLinks.BlogCategories.Post}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add Blog Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}