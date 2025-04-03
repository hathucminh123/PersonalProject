import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

export interface OrderDetail {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  imageUrl: string;
}
export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  email: string;
  isDefault: boolean;
  createdAt: string; // ISO date string
}
export interface Order {
  id: string;
  userId: string;
  // user: any | null; // hoặc định nghĩa rõ nếu cần
  totalPrice: number;
  discountAmount: number;
  shippingFee: number;
  status: number; // có thể dùng enum nếu muốn
  shippingAddress: ShippingAddress;
  paymentMethod: string; // "CreditCard" | "Cash" | ...
  createdAt: string;
  orderDetails: OrderDetail[];
  // discounts: any[]; // hoặc tạo thêm interface nếu bạn có dữ liệu cụ thể
}

interface signal {
  signal: AbortSignal;
  userId: string|null;
}

export const GetOrderServiceByUserId = async ({
  signal,
  userId,
}: signal): Promise<{ Order: Order[] }> => {
  try {
    const response = await httpClient.get({
      url: ` ${apiLinks.Orders.GetOrderbyUserId}/${userId}`,
      signal: signal,
    });

    const order = response.data;
    return {
      Order: order as Order[],
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
