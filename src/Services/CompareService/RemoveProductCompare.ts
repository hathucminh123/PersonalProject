import httpClient from "../../httpClient/httpClient";


import { apiLinks } from "../MainService";

interface IRemoveProductCompare {
    productId: string;
    userId: string|null;
}
export const RemoveProductCompare = async ({ productId, userId }: IRemoveProductCompare) => {
    try {
        const res = await httpClient.delete({
            url: `${apiLinks.Compare.DeleteCompare}/${userId}/${productId}`,
            data: { productId, userId },
        });
        return res.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Remove Product Compare request failed:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
        throw error;
    }
}