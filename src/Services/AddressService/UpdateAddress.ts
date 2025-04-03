import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Address {
  data: { [key: string]: string | number | number[]|undefined |null};
//   id: number;
}

export const UpdateAddress = async ({ data }: Address) => {
  try {
    const response = await httpClient.put({
      url: `${apiLinks.Address.PUT}`,
      data: data,
    //   params: { id },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Put Address User request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
