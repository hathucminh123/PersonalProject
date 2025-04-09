import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogPost {
    // data: { [key: string]: string | undefined };
    id:number;
  }

export const DeleteBlogPost = async ({ id}: BlogPost) => {
  try {
    const res = await httpClient.delete({
      url: `${apiLinks.BlogPost.delete}/${id}`,
    //   data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete BlogPost request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}