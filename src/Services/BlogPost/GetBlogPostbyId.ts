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

// interface subCategories{
//     id:string,
//     name:string,
//     slug:string,
//     blogCategoryId:number,
//     blogCategoryName:string,
//     blogPosts:blogPosts[]
// }
  
// interface BlogCategories {
//     id:number,
//     name:string,
//     slug:string,
//     subCategories:subCategories[]
// }


interface IBlogPost {
   
    signal: AbortSignal;
    id:number;
}
export const GetBlogPostbyId = async ({ signal,id }: IBlogPost) => {
    try {
        const res = await httpClient.get({
            url: `${apiLinks.BlogPost.GetById}/${id}`,
            signal: signal,
        });
        const blogPost = res.data;
        return {
            BlogPost: blogPost as blogPosts,
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