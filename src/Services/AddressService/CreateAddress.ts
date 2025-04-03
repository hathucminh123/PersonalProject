import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Address {
  data: { [key: string]: string | undefined |null};
}

export const CreateAddressdata = async ({ data }: Address) => {
  try {
    const res = await httpClient.post({
      url: apiLinks.Address.POST,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Post Adrress request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
