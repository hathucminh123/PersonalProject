import React from "react";
import { InfoTitle } from "./InfoTitle";
import { useQuery } from "@tanstack/react-query";
import { GetOrderServiceByUserId } from "../Services/OrderService/GetOrdersByUserId";

export const UserOrders: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const { data } = useQuery({
    queryKey: ["Orders", userId],
    queryFn: ({ signal }) =>
      GetOrderServiceByUserId({ signal: signal, userId: userId }),
    enabled: !!userId,
  });

  const orders = data?.Order || [];

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đang giao";
      case 3:
        return "Hoàn tất";
      case 4:
        return "Đã huỷ";
      default:
        return "Không rõ";
    }
  };

  return (
    <section>
      <InfoTitle title="Quản lý đơn hàng">
        <div className="flex items-center gap-[16px] text-[clamp(1rem,1rem)]">
          <div className="text-[clamp(14px,.875rem,.875rem)] text-[rgb(0,0,0)] font-normal leading-[1.6] box-border">
            Tất cả đơn hàng: <span>{orders.length}</span>
          </div>
        </div>
      </InfoTitle>

      <div>
        <div className="shadow rounded-[.9375rem] pb-[3.125rem] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#8603151a]">
              <tr>
                <th className="py-5 px-5 text-left font-semibold">
                  Mã đơn hàng
                </th>
                <th className="py-5 px-5 text-left font-semibold">Sản phẩm</th>
                <th className="py-5 px-5 text-left font-semibold">Tổng tiền</th>
                <th className="py-5 px-5 text-left font-semibold">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="py-4 px-5 text-sm text-gray-700">
                      {order.id}
                    </td>
                    <td className="py-4 px-5 text-sm text-gray-700">
                      {order.orderDetails && order.orderDetails.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {order.orderDetails.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="text-sm text-gray-800">
                                <p className="font-medium">
                                  {item.productName}
                                </p>
                                <p>
                                  SL: {item.quantity}{" "}
                                  {item.totalPrice > 0 && (
                                    <span className="text-[rgb(134,3,21)] font-semibold">
                                      - {item.totalPrice.toLocaleString()}₫
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>Không có sản phẩm</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-sm text-[rgb(134,3,21)] font-bold">
                      {order.totalPrice?.toLocaleString()}₫
                    </td>
                    <td className="py-4 px-5 text-sm text-gray-700">
                      {getStatusText(order.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
