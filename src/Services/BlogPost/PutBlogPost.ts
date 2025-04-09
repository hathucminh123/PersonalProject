import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogPost {
  data: { [key: string]: string | undefined };
  id: number;
}

export const PutBlogPost = async ({ id, data }: BlogPost) => {
  try {
    const res = await httpClient.put({
      url: `${apiLinks.BlogPost.Put}/${id}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Put Blog Post request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
