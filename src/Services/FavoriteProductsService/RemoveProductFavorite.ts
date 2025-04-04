import httpClient from "../../httpClient/httpClient";


import { apiLinks } from "../MainService";

interface IRemoveProductCompare {
    productId: string|undefined |null;
    userId: string|null;
}
export const RemoveProductFavorite = async ({ productId, userId }: IRemoveProductCompare) => {
    try {
        const res = await httpClient.delete({
            url: `${apiLinks.FavoriteProducts.Delete}/${productId}/${userId}`,
            data: { productId, userId },
        });
        return res.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Remove Product Favorite request failed:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
        throw error;
    }
}