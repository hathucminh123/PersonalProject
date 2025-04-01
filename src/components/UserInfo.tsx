import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { NavLink } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { InfoTitle } from "./InfoTitle";
export const UserInfo: React.FC = () => {
  return (
    <section>
    <InfoTitle title="Tổng quan tài khoản"/>
      <div>
        <div>
          <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
            <div>
              <h2 className="leading-[1.7] lg:mb-5 lg:text-[clamp(14px,1.125rem,1.125rem)] text-[rgb(0,0,0)] font-medium m-0">
                Thông tin cá nhân
              </h2>
              <div className="flex flex-row justify-between gap-[12px]">
                <div className="gap-[.625rem] flex justify-between items-center">
                  <div className="flex items-center gap-[1rem]">
                    <div className="flex justify-center items-center text-[rgb(68,68,68)] font-normal text-[clamp(14px,1.25rem,1.25rem)] lg:w-6 lg:h-6">
                      <PersonIcon />
                    </div>
                    <div className="text-[rgb(68,68,68)] font-normal leading-[1.5] lg:text-[clamp(14px,0.875rem,0.875rem)]">
                      Thúc Minh
                    </div>
                  </div>
                </div>
                <div className="gap-[.625rem] flex justify-between items-center">
                  <div className="flex items-center gap-[1rem]">
                    <div className="flex justify-center items-center text-[rgb(68,68,68)] font-normal text-[clamp(14px,1.25rem,1.25rem)] lg:w-6 lg:h-6">
                      <MailOutlineIcon />
                    </div>
                    <div className="text-[rgb(68,68,68)] font-normal leading-[1.5] lg:text-[clamp(14px,0.875rem,0.875rem)]">
                      hathucminh456@gmail.com
                    </div>
                  </div>
                  <div>
                    <NavLink
                      to={""}
                      className="flex justify-center items-center border border-[rgb(134,3,21)] rounded-full bg-white text-[rgb(134,3,21)] font-normal whitespace-nowrap lg:h-[1.875rem] lg:px-4 lg:text-[clamp(14px,0.75rem,0.75rem)]"
                    >
                      <span>Thay đổi</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-5 lg:pt-5 border-t border-t-[#44444426]">
              <h2 className="leading-[1.7] lg:mb-5 lg:text-[clamp(14px,1.125rem,1.125rem)] text-[rgb(0,0,0)] font-medium m-0">
                Bảo mật
              </h2>
              <div className="flex-row justify-between flex gap-[12px]">
                <div className="gap-[.625rem] flex justify-between items-center">
                  <div className="flex items-center gap-[1rem]">
                    <div className="flex justify-center items-center text-[rgb(68,68,68)] font-normal text-[clamp(14px,1.25rem,1.25rem)] lg:w-6 lg:h-6">
                      <VpnKeyIcon />
                    </div>
                    <div className="text-[rgb(68,68,68)] font-normal leading-[1.5] lg:text-[clamp(14px,0.875rem,0.875rem)]">
                      Mật khẩu
                    </div>
                  </div>
                  <div>
                    <NavLink
                      to={""}
                      className="flex justify-center items-center border border-[rgb(134,3,21)] rounded-full bg-white text-[rgb(134,3,21)] font-normal whitespace-nowrap lg:h-[1.875rem] lg:px-4 lg:text-[clamp(14px,0.75rem,0.75rem)]"
                    >
                      <span>Thay đổi</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-5 lg:pt-5 border-t border-t-[#44444426]">
              <h2 className="leading-[1.7] lg:mb-5 lg:text-[clamp(14px,1.125rem,1.125rem)] text-[rgb(0,0,0)] font-medium m-0">
                Địa chỉ mặc định
              </h2>
              <div className="flex-row justify-between flex gap-[12px]">
                <div className="gap-[.625rem] flex justify-between items-center">
                  <div className="flex items-center gap-[1rem]">
                    <div className="flex justify-center items-center text-[rgb(68,68,68)] font-normal text-[clamp(14px,1.25rem,1.25rem)] lg:w-6 lg:h-6">
                      <LocationOnIcon />
                    </div>
                    <div className="text-[rgb(68,68,68)] font-normal leading-[1.5] lg:text-[clamp(14px,0.875rem,0.875rem)]">
                      Bạn chưa có địa chỉ mặc định
                    </div>
                  </div>
                  <div>
                    <NavLink
                      to={""}
                      className="flex justify-center items-center border border-[rgb(134,3,21)] rounded-full bg-white text-[rgb(134,3,21)] font-normal whitespace-nowrap lg:h-[1.875rem] lg:px-4 lg:text-[clamp(14px,0.75rem,0.75rem)]"
                    >
                      <span>Thay đổi</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
