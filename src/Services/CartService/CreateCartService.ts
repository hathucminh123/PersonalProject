import httpClient from "../../httpClient/httpClient";

import { apiLinks } from "../MainService";


interface Cart {
    data: { [key: string]: string | undefined |null|number};
}

export const createCart = async ({data}:Cart) => {
  try {
    const response = await httpClient.post({
        url: apiLinks.Cart.CreateCart,
        data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};
