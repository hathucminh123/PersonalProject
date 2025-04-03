import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Address {
    AddressId: string;
    userId:string|null;
}

export const DeleteAddressByuser = async ({ AddressId, userId }: Address) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Address.DELETEByUser}`,
      data: {
        AddressId:AddressId,
        userId:userId
      }
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Delete Address request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
