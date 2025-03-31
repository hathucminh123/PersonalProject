import httpClient from "../../httpClient/httpClient";

import { apiLinks } from "../MainService";


interface Cart {
    data: { [key: string]: string | undefined |null|number};
}

export const UpdateCart = async ({data}:Cart) => {
  try {
    const response = await httpClient.put({
        url: apiLinks.Cart.UpdateCart,
        data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error Update cart:", error);
    throw error;
  }
};
