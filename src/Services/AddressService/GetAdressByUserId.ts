
import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";


interface Address {
    id: string;
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
    email: string;
    isDefault: boolean;
    createdAt: string; // ISO 8601 date string
  }
  

interface signal {
  signal: AbortSignal;
  id: string |undefined |null;
}

export const GetAdressByUserId = async ({
  signal,
  id,
}: signal): Promise<{ Address: Address[] }> => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.Address.GETById}/${id}`,
      signal: signal,
    });

    const address = response.data;
    return {
        Address: address as Address[],
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get Address failed:", error.message);
    } else {
      console.error("Unexpected error", error); 
    }
    throw error;
  }
};
