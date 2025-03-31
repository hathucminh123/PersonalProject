import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
// import SkinCard from "../components/SkinCard";
import SkinCardSlider from "../components/SkinCardSlider";
import SkinCardButton from "../components/SkinCardButton";
import { useQuery } from "@tanstack/react-query";
import { GetProductsService } from "../Services/ProductService/GetProductService";

const HomePage: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("prevRef:", prevRef.current);
    console.log("nextRef:", nextRef.current);
  }, []);


  const { data: Products } = useQuery({
    queryKey: ["Products"],
    queryFn: ({ signal }) => GetProductsService({ signal: signal }),
  });

  const productsdata = Products?.Products;
  console.log("fetch duoc",productsdata);

  if (productsdata === undefined) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <section className="pt-0 ">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto">
          <div className="container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-[400px]"
            >
              <SwiperSlide>
                <img
                  src="https://cdn.happyskin.vn/media/42/new-launching-4-device-emmie-by-happyskin.jpg"
                  alt="Banner 1"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://cdn.happyskin.vn/media/54/rang-ngoi-yeu-thuong-dep-tung-khoanh-khac.jpg"
                  alt="Banner 2"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section className="pt-[3rem] pb-[3rem]">
        <div className="container max-w-[90vw] pr-[.78125] pl-[.78125] mr-auto ml-auto w-full">
          <div className="mr-0 ml-0 rounded p-5  shadow-[6px_0px_39.7681px_rgba(0,0,0,0.3)] bg-white">
            <ul className="flex items-center gap-3 pb-2 overflow-x-auto lg:mb-8">
              <li className="w-max">
                <h2 className="font-bold">
                  <NavLink
                    to={"#"}
                    className="bg-[#860315] text-white px-4 h-9 text-sm text-center whitespace-nowrap border-2 border-[#860315] rounded-full flex items-center font-medium gap-[.5rem]"
                  >
                    <span className="text-[14px] text-center whitespace-nowrap font-medium">
                      Sản phẩm mới
                    </span>
                  </NavLink>
                </h2>
              </li>
              <li className="w-max">
                <h2 className="font-bold">
                  <NavLink
                    to={"#"}
                    // href="#"
                    className="bg-white text-[#860315] px-4 h-9 text-sm text-center whitespace-nowrap border-2 border-[#860315] rounded-full flex items-center font-medium gap-[.5rem]"
                  >
                    <span className="text-[14px] text-center whitespace-nowrap font-medium">
                      Bán chạy
                    </span>
                  </NavLink>
                </h2>
              </li>
            </ul>
            <div className="mt-[2.5rem]">
              <div className="pb-[1.875rem] relative z-2">
                <div className="mx-auto relative overflow-hidden list-none p-0 z-[1] block touch-pan-y">
                  <div className="flex transform-3d relative w-[100%] h-[100%] z-1 transition-transform box-border">
                    {/* <div className="w-[205.4px] mr-[15px] h-auto flex-shrink-0  relative transition-transform block">
                      <div
                        className="h-[100%] flex flex-col justify-between relative 
            shadow-[6px_8px_39.7681px_#0000000d] 
            bg-white  gap-2 rounded-md p-[10px]"
                      >
                        <div className="relative">
                          <Link
                            to={""}
                            className="relative flex justify-center items-center aspect-[259/250]  h-auto rounded-[10px] 
             overflow-hidden transition-all duration-200 ease-in-out"
                          >
                            <img
                              src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
                              alt="máy rửa mặt"
                              className="static w-full h-full object-contain 
              top-0 left-0 
             transition-all duration-300 ease-in-out inline"
                            />
                          </Link>
                          <ul className="m-0 p-0 list-none">
                            <li className="flex ">
                              <span className="bg-[#ff0000] text-white left-[0.25rem] top-[0.25rem] text-[12px] absolute z-5 pl-[8px] pr-[8px] font-medium rounded-full transition-all duration-200 ease-in-ou">
                                ️🎉 Sản phẩm mới
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="flex flex-col justify-between h-full text-left">
                          <div>
                            <ul className="flex static flex-wrap items-center mt-1 gap-1 m-0 p-0 list-none">
                              <li className="flex">
                                <span className="bg-[#3c3c3c] text-[#ffffff] static text-[11px] z-5  transition-all duration-200 ease-in-out pr-[8px] pl-[8px] font-normal rounded-full">
                                  BEAUTY DEVICES OF THE YEAR
                                </span>
                              </li>
                            </ul>
                            <h3 className="h-[2.625rem] text-[14px] text-gray-700  leading-[1.5] line-clamp-2 hover:text-[#860315] font-bold">
                              <Link
                                to={""}
                                className="relative  transition-[background-size] duration-[350ms] "
                              >
                                Máy rửa mặt Emmie Premium Facial Cleansing Brush
                                Sonic Extra
                              </Link>
                            </h3>
                            <div className="flex justify-between mt-[10px] mb-[10px] gap-[0.5rem]">
                              <div className="mt-[0px] flex flex-col flex-wrap gap-x-1 flex-[1_1_0%]">
                                <span className="text-[14px] text-[#860315] font-extrabold leading-[1.5]">
                                  690.000 đ
                                </span>
                                <span className="text-gray-500 font-medium leading-[1.5] line-through lg:text-xs">
                                  1.200.000 đ
                                </span>
                              </div>
                              <div
                                className="flex justify-center items-center bg-[#860315] px-[6px] h-[17px] 
             text-white font-medium text-xs rounded-[2px]"
                              >
                                <span>-42%</span>
                              </div>
                            </div>
                            <div className="mt-[0.5rem] text-[14px] text-gray-600 font-medium leading-[1.6] overflow-hidden line-clamp-2">
                              <p>
                                Máy rửa mặt Emmie Premium Facial Cleansing Brush
                                Sonic Extra - Đạt chuẩn FDA
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between h-full text-[14px]">
                            <div className="mt-1 bg-[rgba(68,68,68,0.1)] h-full text-gray-600 text-left border border-[rgba(68,68,68,0.2)] rounded px-1 py-[2px] lg:text-xs">
                              <p className="bg-[#468fff] text-[#ffffff] m-0">
                                🏝 Thiết Kế Độc Quyền
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <SkinCardSlider productsdata={productsdata} prevRef={prevRef} nextRef={nextRef} />
                  </div>
                </div>
                <div className="block">
                
                  <button
                    type="button"
                    ref={prevRef}
                    className="custom-prev"
                  ></button>
                  <button
                    type="button"
                    ref={nextRef}
                    className="custom-next"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative pt-0 pb-[14px]">
        <div className="container max-w-[90vw] pr-[.78125] pl-[.78125] mr-auto ml-auto w-full">
          <div className="shadow-lg shadow-black/10 bg-white bg-opacity-100 rounded-lg p-4">
            <div className="mb-[2.5rem] block ">
              <p className="text-[rgb(134,3,21)] text-opacity-100 font-extrabold leading-[1.5] tracking-[0.05em] uppercase text-[clamp(14px,1rem,1rem)] md:text-lg">
                Trai nghiem mua hàng
              </p>
              <h2 className="text-[rgb(134,3,21)] text-opacity-100 font-bold leading-[1.3] text-[clamp(14px,1.875rem,1.875rem)]">
                Tiêu đề trang
              </h2>
            </div>
            <div className="block">
              <div>
                <div className="lg:-ml-[15px] md:-ml-[12px] !mr-0 lg:-mx-[.78125rem] flex flex-wrap -mt-[1.875rem]">
                  {productsdata.map((product) => (
                    <div
                      className="lg:pl-[15px] md:pl-[12px] pr-0 pl-[10px] lg:px-[.78125rem] px-[10px] mt-[1.875rem] md:w-1/5 lg:w-1/5 xl:w-1/5 lg:text-[clamp(14px,1rem,1rem)]"
                      key={product.id}
                    >
                      <SkinCardButton product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
