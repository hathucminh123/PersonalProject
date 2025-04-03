import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Address {
    AddressId: string;
    // userId:string
}

export const DeleteAddressByAdmin = async ({ AddressId}: Address) => {
  try {
    const response = await httpClient.delete({
      url: `${apiLinks.Address.DELETEByAdmin}/${AddressId}`,
    //   data: {
    //     AddressId:AddressId,
    //     userId:userId
    //   }
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
