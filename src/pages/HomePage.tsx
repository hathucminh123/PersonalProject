import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link, NavLink, useOutletContext } from "react-router-dom";
// import SkinCard from "../components/SkinCard";
import SkinCardSlider from "../components/SkinCardSlider";
import SkinCardButton from "../components/SkinCardButton";
import { useQuery } from "@tanstack/react-query";
import { GetProductsService } from "../Services/ProductService/GetProductService";
import { GetFavoriteProducts } from "../Services/FavoriteProductsService/GetFavoriteProducts";

type OutletContextType = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProductId: React.Dispatch<React.SetStateAction<string | null>>;
};

const HomePage: React.FC = () => {
  const useId = localStorage.getItem("userId");
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
  console.log("fetch duoc", productsdata);

  const { setOpenModal, setProductId } = useOutletContext<OutletContextType>();

  const { data: favoriteProducts } = useQuery({
    queryKey: ["FavoriteProducts", useId],
    queryFn: ({ signal }) => GetFavoriteProducts({ userId: useId, signal }),
    enabled: !!useId,
  });
  const favoriteProductsdata = favoriteProducts?.Products || [];

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

                    <SkinCardSlider
                      productsdata={productsdata}
                      prevRef={prevRef}
                      nextRef={nextRef}
                    />
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
        {/* <div className="container max-w-[90vw] pr-[.78125] pl-[.78125] mr-auto ml-auto w-full"> */}
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
                  {productsdata.map((product) => {
                    const isFavorite = favoriteProductsdata.some(
                      (favoriteProduct) => favoriteProduct.id === product.id
                    );
                    return (
                      <div
                        className="lg:pl-[15px] md:pl-[12px] pr-0 pl-[10px] lg:px-[.78125rem] px-[10px] mt-[1.875rem] md:w-1/5 lg:w-1/5 xl:w-1/5 lg:text-[clamp(14px,1rem,1rem)]"
                        key={product.id}
                      >
                        <SkinCardButton
                          product={product}
                          isFavorite={isFavorite}
                          setProductId={setProductId}
                          setOpenModal={setOpenModal}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[3rem] pb-[3rem] ">
        {/* <div className="container max-w-[1297px] pr-[.78125] pl-[.78125] mr-auto ml-auto w-full"> */}
        <div className="container max-w-[90vw] pr-[.78125] pl-[.78125] mr-auto ml-auto w-full">
          <div className="xl:gap-10 xl:justify-between xl:items-end xl:flex ">
            <div>
              <p className="text-[rgb(134,3,21)] text-opacity-100 font-extrabold leading-[1.5] tracking-[0.05em] uppercase text-[clamp(14px,1rem,1rem)] md:text-lg">
                Cập nhật thông tin mới nhất
              </p>
              <h2 className="text-[rgb(134,3,21)] text-opacity-100 font-bold leading-[1.3] text-[clamp(14px,1.875rem,1.875rem)]">
                Tin tức mới nhất
              </h2>
            </div>
            <div className="block">
              <div className="flex flex-wrap gap-[.625rem]">
                <Link
                  to={"#"}
                  className="border-2 border-[rgb(68,68,68)] bg-[rgb(68,68,68)] text-[rgb(255,255,255)] px-6 h-11 text-sm text-center whitespace-nowrap rounded-full flex items-center font-medium gap-[.5rem]"
                >
                  <span>Khám phá </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 8.3a.5.5 0 0 1 0 .4l-4 5a.5.5 0 0 1-.8-.6L9.2 8l-2.7-3.7a.5.5 0 1 1 .8-.6l4 5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.5 8a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-[4.75rem]">
            <div className="mr-[-.75rem] ml-[-.75rem] flex flex-wrap mt-[-1.875rem]">
              <div className="order-1 w-[32.56173%] pr-[.75rem] pl-[.75rem] mt-[1.875rem]">
                <div className="mb-0 ml-0 max-w-[21.375rem] relative pr-auto before:top-6 before:left-6 before:h-[107%] before:absolute before:bg-contain before:bg-[url('https://www.happyskin.vn/themes/happyskin/img/line-double-star-square.png')] before:bg-no-repeat before:w-[105%] before:pointer-events-none before:content-['']  bg-no-repeat  before:bg-[position:50%_center]">
                  <div className="pt-[178.21%] rounded-[10px] block relative h-0 overflow-hidden font-[clamp(44px,1rem,1rem)]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      // poster="/fallback-thumbnail.jpg"
                      src="https://happyskin.vn/media/general/tiktok.mp4"
                      className="absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full object-cover"
                    >
                      <track kind="captions"></track>
                    </video>
                  </div>
                  {/* <img
                    src="https://www.happyskin.vn/themes/happyskin/img/line-double-star-square.png"
                    alt=""
                  /> */}
                  <div className="flex top-[-2.75rem]  justify-center items-center  absolute  right-[-3.75rem] flex-col bg-[url('https://www.happyskin.vn/themes/happyskin/img/bg/bg-tiktok-discover.png')] bg-contain bg-no-repeat w-[7rem] h-[7rem] text-[rgba(68,68,68,var(--tw-text-opacity))] font-medium text-[clamp(14px,0.875rem,0.875rem)] leading-[1.3] text-center rounded-full bg-center">
                    <p className="m-0">Khám phá</p>
                    <p className="text-[rgb(134,3,21)] font-medium text-[clamp(14px,0.9375rem,0.9375rem)] leading-[1.3]">
                      <Link to={"#"}>TikTok</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" order-2 w-[40.2778%] pr-[0.75rem] pl-[0.75rem] mt-[1.875rem]">
                <div>
                  <div className=" mb-5 filter drop-shadow-[rgba(0,0,0,0.05)_6px_6px_39.7681px] rounded-[0.9375rem] p-4 flex items-center  bg-[rgba(255,255,255,var(--tw-bg-opacity))] shadow-[6px_0px_39.7681px_rgba(0,0,0,0.05)] box-shadow-[var(--tw-ring-offset-shadow),_0_0_0_0_#0000]">
                    <div className="w-[16.125rem]">
                      <Link
                        to={"#"}
                        className="pt-[59.7826%] rounded-[0.5rem] block relative h-0 overflow-hidden font-[clamp(44px,1rem,1rem)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] "
                      >
                        <img
                          src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png"
                          alt=""
                          className="hover:scale-120 absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full object-cover inline max-w-full align-middle"
                        />
                      </Link>
                    </div>
                    <div className="pl-[1rem] mt-0 flex-1">
                      <div className="mb-[0.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[2px_7px] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                        <Link to={"#"} className="text-[rgb(20,170,62)]">
                          <span className="text-[rgb(20,170,62)]">
                            Tin tức - deal hot
                          </span>
                        </Link>
                      </div>
                      <h3 className="text-[clamp(14px,1rem,1rem)] text-[rgba(68,68,68,var(--tw-text-opacity))] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                        <Link to={"#"} className="">
                          HappySkin sinh nhật tặng deal hot
                        </Link>
                      </h3>
                      <div className="mt-[0.5625rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          6/4/2025
                        </p>
                        <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          60
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" mb-5 filter drop-shadow-[rgba(0,0,0,0.05)_6px_6px_39.7681px] rounded-[0.9375rem] p-4 flex items-center  bg-[rgba(255,255,255,var(--tw-bg-opacity))] shadow-[6px_0px_39.7681px_rgba(0,0,0,0.05)] box-shadow-[var(--tw-ring-offset-shadow),_0_0_0_0_#0000]">
                    <div className="w-[16.125rem]">
                      <Link
                        to={"#"}
                        className="pt-[59.7826%] rounded-[0.5rem] block relative h-0 overflow-hidden font-[clamp(44px,1rem,1rem)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] "
                      >
                        <img
                          src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png"
                          alt=""
                          className="hover:scale-120 absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full object-cover inline max-w-full align-middle"
                        />
                      </Link>
                    </div>
                    <div className="pl-[1rem] mt-0 flex-1">
                      <div className="mb-[0.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[2px_7px] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                        <Link to={"#"} className="text-[rgb(20,170,62)]">
                          <span className="text-[rgb(20,170,62)]">
                            Tin tức - deal hot
                          </span>
                        </Link>
                      </div>
                      <h3 className="text-[clamp(14px,1rem,1rem)] text-[rgba(68,68,68,var(--tw-text-opacity))] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                        <Link to={"#"} className="">
                          HappySkin sinh nhật tặng deal hot
                        </Link>
                      </h3>
                      <div className="mt-[0.5625rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          6/4/2025
                        </p>
                        <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          60
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" mb-5 filter drop-shadow-[rgba(0,0,0,0.05)_6px_6px_39.7681px] rounded-[0.9375rem] p-4 flex items-center  bg-[rgba(255,255,255,var(--tw-bg-opacity))] shadow-[6px_0px_39.7681px_rgba(0,0,0,0.05)] box-shadow-[var(--tw-ring-offset-shadow),_0_0_0_0_#0000]">
                    <div className="w-[16.125rem]">
                      <Link
                        to={"#"}
                        className="pt-[59.7826%] rounded-[0.5rem] block relative h-0 overflow-hidden font-[clamp(44px,1rem,1rem)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] "
                      >
                        <img
                          src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png"
                          alt=""
                          className="hover:scale-120 absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full object-cover inline max-w-full align-middle"
                        />
                      </Link>
                    </div>
                    <div className="pl-[1rem] mt-0 flex-1">
                      <div className="mb-[0.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[2px_7px] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                        <Link to={"#"} className="text-[rgb(20,170,62)]">
                          <span className="text-[rgb(20,170,62)]">
                            Tin tức - deal hot
                          </span>
                        </Link>
                      </div>
                      <h3 className="text-[clamp(14px,1rem,1rem)] text-[rgba(68,68,68,var(--tw-text-opacity))] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                        <Link to={"#"} className="">
                          HappySkin sinh nhật tặng deal hot
                        </Link>
                      </h3>
                      <div className="mt-[0.5625rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          6/4/2025
                        </p>
                        <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                        <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                          60
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" order-3 w-[27.1605%] pr-[0.75rem] pl-[0.75rem] mt-[1.875rem]">
                <div className="relative">
                  <div className="top-4 left-[-0.375rem] text-[clamp(14px,0.875rem,0.875rem)] p-[0.25rem_1rem] absolute  z-20 bg-[rgb(134,3,21)] pointer-events-none text-[rgb(255,255,255)] font-semibold  leading-[1.5] text-center rounded-tl-[9999px] rounded-tr-[9999px] rounded-bl-[9999px] rounded-br-none before:absolute before:top-[100%] before:right-0 before:z-10 before:pointer-events-none before:leading-none  before:bg-[url('https://www.happyskin.vn/themes/happyskin/img/line-for-you.png')]">
                    Tin dành cho bạn
                  </div>
                  <div className="overflow-hidden ml-auto mr-auto relative list-none p-0 z-10 block text-[clamp(14px,1rem,1rem)]">
                    <div className="flex transform translate-x-0 translate-y-0 relative w-full h-full z-10 box-border">
                      <div className="flex-shrink-0 w-full h-full relative transition-transform block">
                        <div className="pb-[3.125rem] rounded-[0.9375rem] p-[1rem_1.125rem] shadow-[6px_0px_39.7681px_rgba(0,0,0,0.05)] bg-[rgb(255,255,255)] ">
                          <div>
                            <Link
                              to={"#"}
                              className="pt-[61.1684%] rounded-[0.5rem] block relative h-0 overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] text-inherit decoration-inherit"
                            >
                              <img
                                src="https://cdn.happyskin.vn/media/54/happyskin-sinh-nhat-tang-deal-hot.png"
                                alt=""
                                className="hover:scale-120 absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full object-cover inline max-w-full align-middle"
                              />
                            </Link>
                          </div>
                          <div className="mt-[1.1875rem]">
                            <div className="mb-[0.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[2px_7px] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                              <Link to={"#"} className="text-[rgb(20,170,62)]">
                                <span className="text-[rgb(20,170,62)]">
                                  Tin tức - deal hot
                                </span>
                              </Link>
                            </div>
                            <h3 className="text-[clamp(14px,1rem,1rem)] text-[rgba(68,68,68,var(--tw-text-opacity))] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                              <Link to={"#"} className="">
                                HappySkin sinh nhật tặng deal hot
                              </Link>
                            </h3>
                            <div className="mt-[0.5625rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                              <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                                6/4/2025
                              </p>
                              <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                              <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                                60
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-[1.5rem] m-0 p-0 list-none">
                  <li className="rounded-[0.9375rem] p-[1.0625rem] bg-[rgba(255,255,255,var(--tw-bg-opacity))] shadow-[6px_0px_39.7681px_rgba(0,0,0,0.05)] flex ">
                    <div className="w-[3rem] min-w-[3rem] h-[3rem] text-[clamp(14px,1.625rem,1.625rem)] rounded-[0.625rem] justify-center items-center bg-[linear-gradient(0deg,_rgb(255,_232,_229),_rgb(255,_255,_255))]">
                      <i className="fa fa-instagram text-[20px] text-[#9b3d3d]"></i>
                    </div>
                    <div className="pl-2 text-[clamp(14px,0.625rem,0.625rem)] text-[rgb(136,136,136,var(--tw-text-opacity))] font-medium  leading-[1.5] flex-1">
                      <p className="text-[clamp(14px,1.125rem,1.125rem)] text-[rgb(134,3,21)] font-bold ">
                        10k
                      </p>
                      <p className="m-0">followers</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
