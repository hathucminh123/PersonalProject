import React, { useState } from "react";
import { InfoTitle } from "./InfoTitle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const ChangePassword: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section>
      <InfoTitle title="Đổi mật khẩu" />
      <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
        <form className="flex flex-col gap-[1.25rem]">
          {/* OLD PASSWORD */}
          <div className="flex flex-col items-start gap-[.5rem]">
            <label className="w-full min-w-[6.25rem] text-[clamp(1rem,1rem)] leading-[1.7] block whitespace-nowrap text-[rgb(0,0,0)]">
              Mật khẩu cũ
            </label>
            <div className="w-full max-w-[400px] relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className="appearance-none border text-gray-800 bg-white rounded-md px-3 py-2 h-[2.75rem] text-[clamp(14px,_1rem,_1rem)] leading-6 lg:rounded lg:pl-4 lg:pr-4 lg:h-[2.75rem] w-full"
              />
              <span
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute top-1/2 translate-y-[-50%] right-[1.125rem] z-[1] cursor-pointer m-0 text-[rgb(134_3_21_/_var(--tw-text-opacity))] text-[clamp(14px,_1.25rem,_1.25rem)] leading-[1]"
              >
                {showOldPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </span>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className="flex flex-col items-start gap-[.5rem]">
            <label className="w-full min-w-[6.25rem] text-[clamp(1rem,1rem)] leading-[1.7] block whitespace-nowrap text-[rgb(0,0,0)]">
              Mật khẩu mới
            </label>
            <div className="w-full max-w-[400px] relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="appearance-none border text-gray-800 bg-white rounded-md px-3 py-2 h-[2.75rem] text-[clamp(14px,_1rem,_1rem)] leading-6 lg:rounded lg:pl-4 lg:pr-4 lg:h-[2.75rem] w-full"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 translate-y-[-50%] right-[1.125rem] z-[1] cursor-pointer m-0 text-[rgb(134_3_21_/_var(--tw-text-opacity))] text-[clamp(14px,_1.25rem,_1.25rem)] leading-[1]"
              >
                {showNewPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col items-start gap-[.5rem]">
            <label className="w-full min-w-[6.25rem] text-[clamp(1rem,1rem)] leading-[1.7] block whitespace-nowrap text-[rgb(0,0,0)]">
              Nhập lại mật khẩu mới
            </label>
            <div className="w-full max-w-[400px] relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="appearance-none border text-gray-800 bg-white rounded-md px-3 py-2 h-[2.75rem] text-[clamp(14px,_1rem,_1rem)] leading-6 lg:rounded lg:pl-4 lg:pr-4 lg:h-[2.75rem] w-full"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 translate-y-[-50%] right-[1.125rem] z-[1] cursor-pointer m-0 text-[rgb(134_3_21_/_var(--tw-text-opacity))] text-[clamp(14px,_1.25rem,_1.25rem)] leading-[1]"
              >
                {showConfirmPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </span>
            </div>
          </div>
         
          {/* SUBMIT BUTTON */}
          <div className="flex flex-col gap-[.5rem] w-full">
            <div className="w-full">
              <button
                type="submit"
                className="mt-4 bg-[rgb(134,3,21)] text-white font-semibold px-6 py-2 rounded hover:bg-red-800 transition"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
