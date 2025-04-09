import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface BlogSubCategories {
    data: { [key: string]: string | undefined };
    id:number
  }

export const PutBlogSubCategories = async ({ data ,id}: BlogSubCategories) => {
  try {
    const res = await httpClient.put({
      url: `${apiLinks.BlogSubCategories.Put}/${id}`,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Put Blog Sub Categories request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
}