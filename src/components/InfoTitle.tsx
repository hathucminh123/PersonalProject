import React from "react";
import { Link } from "react-router-dom";

interface props {
  title: string;
  appear?: boolean;
  children?: React.ReactNode;
}

export const InfoTitle: React.FC<props> = ({ title, appear, children }) => {
  return (
    <div className="flex justify-between gap-6 lg:flex-row lg:items-end lg:mb-[2.75rem]">
      <div className="flex items-center gap-[16px] box-border">
        <h1 className="text-[rgb(68,68,68)] font-normal leading-[1.3]  lg:text-[clamp(14px,2.375rem,2.375rem)]">
          {title}
        </h1>
      </div>
      {children}
      {appear && (
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[10px]">
            <Link
              to={"create"}
              className="flex items-center gap-2 pl-4 pr-4 h-9 text-white font-medium text-[12px] hover:bg-[#860315e6] bg-[rgb(68,68,68)] border-[rgb(68,68,68)] border hover:border-[#860315e6] rounded-full ease-in-out"
            >
              Thêm địa chỉ mới
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
