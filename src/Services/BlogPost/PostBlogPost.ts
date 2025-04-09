import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogPost {
    data: { [key: string]: string | undefined };
  }

export const PostBlogPost = async ({ data}: BlogPost) => {
  try {
    const res = await httpClient.post({
      url: `${apiLinks.BlogPost.Post}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Add Blog Post request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}