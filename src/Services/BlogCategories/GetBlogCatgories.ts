import httpClient from "../../httpClient/httpClient";


import { apiLinks } from "../MainService";


interface blogPosts{
    id: number;
    title: string;
    imageUrl: string;
    content: string;
    createdAt: string; // ISO date string
    blogSubCategoryId: number;
    blogSubCategoryName: string;
}

interface subCategories{
    id:string,
    name:string,
    slug:string,
    blogCategoryId:number,
    blogCategoryName:string,
    blogPosts:blogPosts[]
}
  
interface BlogCategories {
    id:number,
    name:string,
    slug:string,
    subCategories:subCategories[]
}


interface IBlogCategories {
   
    signal: AbortSignal;
}
export const GetBlogCatgories = async ({ signal }: IBlogCategories) => {
    try {
        const res = await httpClient.get({
            url: `${apiLinks.BlogCategories.Get}`,
            signal: signal,
        });
        const blogCategories = res.data;
        return {
            BlogCategories: blogCategories as BlogCategories[],
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Get Blog Categories request failed:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
        throw error;
    }
}