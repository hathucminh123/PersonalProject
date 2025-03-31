import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface ShippingAddressInput {
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
    email: string;
    isDefault: boolean;
  }
interface Orders {
  data: { [key: string]: string | undefined | number | ShippingAddressInput |null};
}

export const CreateOrders = async ({ data }: Orders) => {
  try {
    const res = await httpClient.post({
      url: apiLinks.Orders.CreateOrder,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Create orders request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
