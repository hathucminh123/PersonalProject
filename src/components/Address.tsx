import React from "react";
import { InfoTitle } from "./InfoTitle";
import { Link } from "react-router-dom";

export const Address: React.FC = () => {
  return (
    <section>
      <InfoTitle title="Sổ địa chỉ" appear={true} />
      <div>
        <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
          <h2 className="text-black font-medium leading-[1.7] lg:mb-5 lg:text-[clamp(14px,1.125rem,1.125rem)]">
            Địa chỉ của tôi
          </h2>
          <div>
            <div className="flex lg:flex-row lg:justify-between lg:gap-5">
              <div>
                <h2 className="flex items-center text-[#444] font-normal lg:text-[clamp(14px,1rem,1rem)] lg:leading-[1.7]">
                  <span>Hà Thúc Minh</span>
                  {", "}
                  <span>0918624936</span>
                </h2>
                <p className="text-[#444] font-normal lg:mt-2 lg:text-[clamp(14px,1rem,1rem)] lg:leading-[1.7]">
                  213/98 tổ 12 Khu Phố 3 Phường Tân Thới Hiệp , Phường Tân Thới
                  Hiệp, Quận 12, Hồ Chí Minh
                </p>
                <div className="flex flex-wrap gap-[1rem] mt-[.5rem]">
                  <Link
                    to="#"
                    className="rounded-none bg-none p-0 text-[#444] font-normal underline lg:text-[clamp(14px,0.875rem,0.875rem)] lg:leading-[1.7] transition-all duration-200 ease-in-out"
                  >
                    Chỉnh sửa
                  </Link>
                  <form action="" className="inline">
                    <button
                      type="submit"
                      className="rounded-none bg-none p-0 text-[#444] font-normal underline lg:text-[clamp(14px,0.875rem,0.875rem)] lg:leading-[1.7] transition-all duration-200 ease-in-out"
                    >
                      Xóa
                    </button>
                  </form>
                </div>
              </div>
              <form action="" className="inline">
                <div className="flex">
                  <button
                    type="submit"
                    className="flex items-center gap-2 pl-3 pr-3 h-8 text-[clamp(14px,0.875rem,0.875rem)] text-white font-medium bg-[#860315e6] border border-[#860315e6] rounded-full cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Đặt làm đỉa chỉ mặc định
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
