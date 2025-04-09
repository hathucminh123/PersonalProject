import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogSubCategories {
    data: { [key: string]: string | undefined };
  }

export const PostBlogSubCategories = async ({ data}: BlogSubCategories) => {
  try {
    const res = await httpClient.post({
      url: `${apiLinks.BlogSubCategories.Post}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add Blog Sub Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}