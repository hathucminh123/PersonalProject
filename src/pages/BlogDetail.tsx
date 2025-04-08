import React from "react";
import { Link, NavLink } from "react-router-dom";

export const BlogDetail: React.FC = () => {
  return (
    <main>
      <nav className="pt-[8px] pb-[8px]">
        <div className="min-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <ol className="flex-wrap flex items-center m-0 p-0 overflow-visible">
            <li className="flex items-center w-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:bg-gray-700 after:rounded-full after:mx-[15px]">
              <NavLink
                to="/"
                className="block text-gray-700 font-normal leading-[1.5] whitespace-nowrap transition-all duration-200"
              >
                <span>Trang chủ</span>
              </NavLink>
            </li>
          </ol>
        </div>
      </nav>
      <section className="pt-[1.25rem] pb-[5rem]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <div className="flex mr-[-.78125rem] ml-[-.78125rem] flex-wrap mt-[-3.125rem]">
            <div className="w-[75%] pr-[.78125rem] pl-[.78125rem] mt-[3.125rem]">
              <h1 className="mb-[1rem] text-[clamp(14px,1.875rem,1.875rem)] text-[rgb(134,3,21)] font-bold leading-[1.3] m-0">
                Livestream HappySkin Tất cả sản phẩm, sale cực sốc
              </h1>
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-[.5rem]">
                  <p className="text-[clamp(14px,1rem,1rem)] text-[#4449] font-normal leading-[1.6] m-0">
                    19/02/2025 10:14:07 CH
                  </p>
                  <span className="rounded-full bg-[rgb(217,217,217)] w-[6px] h-[6px]"></span>
                  <p className="text-[clamp(14px,1rem,1rem)] text-[#4449] font-normal leading-[1.6] m-0">
                    13
                  </p>
                </div>
                <ul className="ml-[3.75rem] relative gap-[1rem] flex items-center m-0 p-0 ">
                  <div className="absolute top-1/2 left-[-1.875rem] transform translate-x-[-50%] translate-y-[-50%] rotate-[var(--tw-rotate)] skew-x-[var(--tw-skew-x)] skew-y-[var(--tw-skew-y)] scale-x-[var(--tw-scale-x)] scale-y-[var(--tw-scale-y)] z-10 bg-[#8883] w-[1px] h-[12px]"></div>
                  <li>
                    <Link to="" className="flex justify-center items-center">
                      <svg
                        width={"16px"}
                        height={"16px"}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity={0.8}>
                          <path
                            d="M9.56994 16H5.50731V10.3439H3.78125V6.59375H5.50731V4.078C5.50731 1.82938 7.33669 0 9.58522 0H12.2337V4.06275H10.2234C9.86316 4.06275 9.56994 4.35584 9.56994 4.71606V6.59363H11.296V10.3439H9.56994V16ZM6.44481 15.0625H8.63244V9.40637H10.3585V7.53125H8.63244V4.71619C8.63244 3.83888 9.34619 3.12525 10.2234 3.12525H11.2962V0.9375H9.58522C7.85366 0.9375 6.44481 2.34631 6.44481 4.07788V7.53113H4.71875V9.40637H6.44481V15.0625Z"
                            fill="#444444"
                          ></path>
                        </g>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-[1.5rem] pt-[2.5rem] border-t-[1px] border-top-[#44444426]">
                <div>
                  <img
                    src="https://cdn.happyskin.vn/media/54/livestream-happyskin-tat-ca-san-pham-sale-cuc-soc.png"
                    alt=""
                    className="w-full h-full object-contain inline max-w-full align-middle"
                  />
                </div>
                <div className="mt-[1.5rem] w-full text-[clamp(14px,1rem,1rem)] max-w-none text-[rgb(68,68,68)]">
                  <p className="mt-[1.25rem] mb-[1.25rem] m-0">
                    <Link to="">
                      <img
                        src="https://cdn.happyskin.vn/media/54/livestream-happyskin-cung-ha-linh.png"
                        alt=""
                        className="mt-[2em] mb-[2em] inline max-w-full align-middle"
                      />
                    </Link>
                  </p>
                  <p className="mt-[1.25em] mb-[1.25em]">dasdasdasd</p>
                </div>
                <div className="mt-[2.5rem] text-[rgb(134,3,21)] font-normal text-[14px] rounded-[.9375rem] p-[1.5rem] border border-dashed border-[rgb(134,3,21)] bg-[rgb(255,255,255)]">
                  <p className="mb-[1rem] text-[clamp(14px,1.5rem,1.5rem)] text-[rgb(134,3,21)] font-bold m-0">
                    Xem thêm các bài tin tức liên quan
                  </p>
                  <ul className="pl-5 list-disc m-0 p-0 ">
                    <li className="marker:text-[#d9d9d9] marker:text-normal marker:indent-0 marker:text-start">
                      <Link
                        to=""
                        className="relative duration-2000 ease-[cubic-bezier(0.4,_0,_0.2,_1)] text-inherit decoration-inherit"
                      >
                        HappySkin sinh nhật tặng deal hot
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-[25%] pr-[.78125rem] pl-[.78125rem] mt-[3.125rem]">
              <div className="sticky top-[6.25rem]">
                <div className="shadow-lg rounded-[.9375rem] p-[35px] px-[18px] bg-white">
                  <h3 className="mb-[1.5rem] text-[clamp(14px,1.625rem,1.625rem)] leading-[1.3] font-normal text-[rgb(134,3,21)]">
                    Bài viết mới nhất
                  </h3>
                  <div>
                    <div className="flex items-center gap-[10px] ">
                      <div className="rounded-[8px] w-[71px] h-[67px]">
                        <Link to="" className="pt-[94.3662%] block relative h-0 overflow-hidden">
                        <img src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png" alt="" className="absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,_0,_0.2,_1)] w-full h-full object-cover inline max-w-full align-middle" />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h3 className="news-related-item title overflow-hidden font-normal text-[clamp(14px,.875rem,.875rem)] leading-6 text-[rgb(68,68,68)]" >
                          <Link to="">HappySkin sinh nhật tặng deal hot</Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-[10px] mt-[.5rem] pt-[.5rem] border-t-[1px] border-t-[#44444426] ">
                      <div className="rounded-[8px] w-[71px] h-[67px]">
                        <Link to="" className="pt-[94.3662%] block relative h-0 overflow-hidden">
                        <img src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png" alt="" className="absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,_0,_0.2,_1)] w-full h-full object-cover inline max-w-full align-middle" />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h3 className="news-related-item title overflow-hidden font-normal text-[clamp(14px,.875rem,.875rem)] leading-6 text-[rgb(68,68,68)]" >
                          <Link to="">HappySkin sinh nhật tặng deal hot</Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
