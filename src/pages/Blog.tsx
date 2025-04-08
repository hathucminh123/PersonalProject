import React from "react";
import { NavLink, Outlet } from "react-router-dom"; // Import NavLink và Outlet

export const Blog: React.FC = () => {
  const tabs = [
    { name: "Tất cả", path: "/blog", count: 2993 },
    { name: "Cách Chăm Sóc Da", path: "/blog/skincare", count: 1572 },
    { name: "Góc Trang điểm", path: "/blog/makeup", count: 734 },
    { name: "Khỏe đẹp", path: "/blog/health", count: 607 },
    { name: "Góc Review", path: "/blog/review", count: 553 },
    { name: "Tin Tức", path: "/blog/news", count: 553 },
    { name: "Tin Tức", path: "/blog/news", count: 553 },
    { name: "Tin Tức", path: "/blog/news", count: 553 },
    { name: "Tin Tức", path: "/blog/news", count: 553 },
  ];

  return (
    <main>
      <nav className="pt-[8px] pb-[8px]">
        <div className="min-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <ol className="flex-wrap flex items-center m-0 p-0 overflow-visible">
            <li className="flex items-center w-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:bg-gray-700 after:rounded-full after:mx-[15px]">
              <NavLink to="/" className="block text-gray-700 font-normal leading-[1.5] whitespace-nowrap transition-all duration-200">
                <span>Trang chủ</span>
              </NavLink>
            </li>
          </ol>
        </div>
      </nav>

      <section className="pt-[2rem] pb-[3.75rem]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <nav className="overflow-hidden">
            <ul className="flex items-center border-b border-b-[#44444426] overflow-x-auto overflow-y-hidden xl:gap-[5rem]">
              {tabs.map((tab, index) => (
                <li key={index} className="w-max">
                  <NavLink
                    to={tab.path}
                    end // Đảm bảo route chính sẽ chỉ kích hoạt khi đúng đường dẫn chính
                    className={({ isActive }) => 
                      isActive 
                        ? "block relative pt-[14px] pr-[12px] pb-[14px] text-center whitespace-nowrap text-red-600 font-medium underline duration-[.2s] transition-all ease-[cubic-bezier(.4,0,.2,1)]" 
                        : "block relative pt-[14px] pr-[12px] pb-[14px] text-center whitespace-nowrap text-gray-500 duration-[.2s] transition-all ease-[cubic-bezier(.4,0,.2,1)]"
                    }
                  >
                    <div
                      className={`absolute bottom-[1px] left-1/2 transform -translate-x-1/2 z-10 w-0 h-[2px] pointer-events-none content-[''] 
                      ${tab.path === window.location.pathname ? "bg-red-600" : "bg-transparent"}`} // Chỉ hiển thị border khi active
                    ></div>
                    <span>{tab.name}</span>
                    <span
                      className={`opacity-100 text-[12px] absolute top-0 right-[10px] ${tab.path === window.location.pathname ? "text-red-600" : "text-gray-400"} font-semibold leading-[1.3]`}
                    >
                      {tab.count}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* <section className="pt-[2.5rem] pb-[2.5rem]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full"> */}
          {/* Đây là nơi nội dung của từng tab sẽ được hiển thị */}
          <Outlet />
        {/* </div>
      </section> */}
    </main>
  );
};
