import React from "react";
import { InfoTitle } from "./InfoTitle";

export const UserOrders: React.FC = () => {
  return (
    <section>
      <InfoTitle title="Quản lý đơn hàng">
        <div className="flex items-center gap-[16px] text-[clamp(1rem,1rem)]">
          <div className="text-[clamp(14px ,.875rem,.875rem)] text-[rgb(0,0,0)] font-normal leading-[1.6] box-border">
            Tất cả đơn hàng
            {": "}
            <span>0</span>
          </div>
        </div>
      </InfoTitle>
      <div>
        <div className="shadow rounded-[.9375rem] pb-[3.125rem] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#8603151a]">
              <tr>
                <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                  Mã đơn hàng
                </th>
                <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                  Sản phẩm
                </th>
                <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                  Tổng tiền
                </th>
                <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
