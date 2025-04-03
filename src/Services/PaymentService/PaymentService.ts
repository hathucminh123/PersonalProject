import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface Payment {
  data: { [key: string]: string | undefined | number |null};
}

export const PaymentService = async ({ data }: Payment) => {
  try {
    const res = await httpClient.post({
      url: apiLinks.Payment.PostPayment,
      data: data,
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Create Payment request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
