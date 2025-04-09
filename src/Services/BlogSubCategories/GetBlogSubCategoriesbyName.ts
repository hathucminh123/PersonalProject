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
  
// interface BlogCategories {
//     id:number,
//     name:string,
//     slug:string,
//     subCategories:subCategories[]
// }


interface IBlogCategories {
   
    signal: AbortSignal;
    name:string|null
}
export const GetBlogSubCatgoriesByName = async ({ signal,name }: IBlogCategories) => {
    try {
        const res = await httpClient.get({
            url: `${apiLinks.BlogSubCategories.GetByName}`,
            signal: signal,
            params:{
              name:name
            }
        });
        const blogSubCategories = res.data;
        return {
            BlogSubCategories: blogSubCategories as subCategories,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Get Blog Sub Categories request failed:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
        throw error;
    }
}