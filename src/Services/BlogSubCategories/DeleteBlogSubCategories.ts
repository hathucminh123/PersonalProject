import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogSubCategories {
    // data: { [key: string]: string | undefined };
    id:number;
  }

export const DeleteBlogSubCategories = async ({ id}: BlogSubCategories) => {
  try {
    const res = await httpClient.delete({
      url: `${apiLinks.BlogSubCategories.Delete}/${id}`,
    //   data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Blog sub Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}