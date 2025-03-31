import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";


export const UserProfile: React.FC = () => {
  return (
    <section className="pt-[40px] pb-[3.75rem] box-content ">
      <div className="max-w-[85vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto ">
        <div className="lg:text-base text-gray-700 w-full max-w-none mb-5 box-border border border-gray-200">
          <div className="border border-dashed border-[#444] rounded-[8px] py-2 px-[10px] bg-white font-bold">
            <p className="m-0">
              Chào mừng bạn đã trở thành thành viên của Happyskin
            </p>
          </div>
        </div>
        <div className="flex flex-wrap lg:-mr-[0.78125rem] lg:-ml-[0.78125rem]">
          <div className="xl:w-1/4 xl:pr-[0.78125rem] xl:pl-[0.78125rem]">
            <nav className="bg-white shadow rounded-[0.9375rem] p-6 lg:shadow lg:rounded-[0.9375rem] lg:p-6">
              <div className="xl:text-[clamp(14px,1rem,1rem)] flex justify-center items-center gap-4 lg:flex-row">
                <div className="w-[4rem] h-[4rem] rounded-full">
                  <img
                    className="w-full h-full object-contain inline align-middle box-border border border-gray-200"
                    src="https://www.happyskin.vn/media/no-image.png"
                    alt="No image"
                  />
                </div>
                <div className="flex-1 text-[#444] font-medium leading-[1.7] box-border  md:text-[clamp(14px,1rem,1rem)] lg:text-[clamp(14px,1rem,1rem)]">
                  Thúc Minh
                </div>
              </div>
              {/* <div className="account-navbar-list lg:mt-6 lg:border-t lg:border-t-[#44444440d] lg:pt-4 lg:pb-5 mt-6 shadow-[6px_0px_39.7681px_#0000000d] rounded-[15px] pt-2.5 pb-5"> */}
              <div className="lg:mt-6 lg:shadow lg:border-t lg:border-t-[#4444444d] lg:rounded-none lg:pt-4 lg:pb-5">
                <ul className="m-0 p-0 list-none">
                  {[
                    {
                      to: "",
                      label: "Tổng quan tài khoản",
                      icon: <NoteAddIcon />,
                    },
                    {
                      to: "/info",
                      label: "Thông tin cá nhân",
                      icon: <PersonIcon />,
                    },
                    {
                      to: "/address",
                      label: "Sổ địa chỉ",
                      icon: <LocationOnIcon />,
                    },
                    {
                      to: "/orders",
                      label: "Quản lý đơn hàng",
                      icon: <AssignmentIcon />,
                    },
                    {
                      to: "/points",
                      label: "Quản lý điểm thưởng",
                      icon: <CardGiftcardIcon />,
                    },
                    {
                      to: "/favorites",
                      label: "Danh sách yêu thích",
                      icon: <FavoriteBorderIcon />,
                    },
                    {
                      to: "/viewed",
                      label: "Sản phẩm đã xem",
                      icon: <VisibilityIcon />,
                    },
                    {
                      to: "/change-password",
                      label: "Đổi mật khẩu",
                      icon: <VpnKeyIcon />,
                    },
                    { to: "/logout", label: "Đăng xuất", icon: <LogoutIcon /> },
                  ].map(({ to, label, icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-[rgb(134,3,21)]" : "text-black"
                          } font-medium gap-[1rem] rounded-[.5rem] text-[clamp(1rem,1rem)] p-[0.625rem_1rem] flex relative items-center hover:bg-[#f4e6e7] w-full leading-[1.7] transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] box-border border-0`
                        }
                      >
                        <span className="flex justify-center items-center w-[20px] h-[20px] font-normal md:text-[clamp(1rem,1rem)] !ml-0">
                          {icon}
                        </span>
                        <span className="!ml-0">{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
           <div className="xl:w-3/4 lg:w-2/3 w-full px-[.78125rem] text-[clamp(14px,1rem,1rem)] box-border">
           <Outlet/>
        </div>
        </div>
      </div>
    </section>
  );
};
