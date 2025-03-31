import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
 
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation } from "swiper/modules";
import { Rating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ScrollDown from "../components/ScrollDown";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProductByIdService } from "../Services/ProductService/GetProductServiceById";
import { CompareModal } from "../components/CompareModal";
import { AddProductCompare } from "../Services/CompareService/AddProductCompare";
import { queryClient } from "../Services/MainService";
import { createCart } from "../Services/CartService/CreateCartService";

type OutletContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailPage: React.FC = () => {
  const useId = localStorage.getItem("userId");

  const { open, setOpen } = useOutletContext<OutletContextType>();
  console.log('open',open)

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const { id } = useParams();
  console.log("productid", id);

  const { data: Product } = useQuery({
    queryKey: ["Product-details", id],
    queryFn: ({ signal }) => GetProductByIdService({ id: id, signal: signal }),
    enabled: !!id,
  });
  const productdata = Product?.Product;

  console.log("productdetail", productdata);

  const { mutate, isPending } = useMutation({
    mutationFn: AddProductCompare,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Product-details", id],

        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Compare-Products", useId],

        refetchType: "active",
      });

      console.log("Add product compare success");
    },
    onError: () => {
      console.log("Add product compare error");
    },
  });

  const hanleAddProduct = () => {
    mutate({ userId: useId, productId: id });
    setShowModal(true);
  };

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = productdata ? productdata.finalPrice * quantity : null;
  const originalTotal = productdata
    ? productdata.originalPrice * quantity
    : null;
  const savedAmount = productdata
    ? productdata.discountAmount * quantity
    : null;
  // const save =productdata?.discountAmount ?  productdata?.originalPrice - productdata?.finalPrice : 0;

  const { mutate: addCart, isPending: isPendingCart } = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Cart"],
        refetchType: "active",
      });
      setOpen(true);
      alert("Add product to cart success");

      console.log("Add product to cart success");
    },
    onError: (error) => {
      console.log("Add product to cart error", error);
    },
  });

  const handleAddToCart = () => {
    if (!useId) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      navigate("/login");
      return;
    }
  
    if (!id) {
      alert("Không tìm thấy sản phẩm!");
      return;
    }
  
    // Trim và đảm bảo không có ký tự thừa
    const productId = id.trim();
    const userId = useId.trim();
  
    addCart({ data: { productId, userId, quantity } });
  };
  

  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [showScrollDown, setShowScrollDown] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;

    // Debugging
    console.log("Swiper instance:", swiperInstance);
    console.log("prevRef.current:", prevRef.current);
    console.log("nextRef.current:", nextRef.current);

    // Kiểm tra nếu navigation tồn tại và có kiểu NavigationOptions
    if (
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation !== "boolean"
    ) {
      const navigation = swiperInstance.params.navigation; // Ép kiểu về NavigationOptions
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      if (swiperInstance.navigation) {
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
        console.log("Navigation initialized and updated.");
      } else {
        console.warn("Swiper navigation is undefined!");
      }
    } else {
      console.warn("Swiper navigation params are not valid!");
    }
  }, [swiperInstance, prevRef, nextRef]);
  return (
    <>
      {showModal && <CompareModal userId={useId} onClose={handleClose} />}
      <nav className="pt-[8px] pb-[8px]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <ol className="flex-wrap  flex items-center m-0 p-0 overflow-visible">
            <li
              className="flex items-center w-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] 
           after:bg-gray-700 after:rounded-full after:mx-[15px]  "
            >
              <Link
                to="/"
                className="block text-gray-700 font-normal leading-[1.5] whitespace-nowrap transition-all duration-200 "
              >
                <span>Trang chủ</span>
              </Link>
            </li>
          </ol>
        </div>
      </nav>
      <section className="pb-[8.125rem]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <div className="bg-white p-8 rounded-md shadow-lg lg:shadow-[6px_0px_39.7681px_#0000000d]">
            <div className="flex flex-wrap mt-[-.1875rem] mr-[-.78125rem] ml-[-.78125rem]">
              <div className="w-[41.666667%] mt-[1.875rem] pr-[.78125rem] pl-[.78125rem]">
                <div className="w-full max-w-[30rem] relative">
                  <div className="pb-0 relative z-2">
                    <div className="rounded-[.9375rem] overflow-hidden touch-pan-y ml-auto mr-auto relative p-0 z-1 block">
                      <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        loop={true}
                        onSwiper={setSwiperInstance}
                        className="relative w-full h-full z-[1] flex transition-transform box-content"
                      >
                        <SwiperSlide className="flex-shrink-0 w-[428px] mr-[15px] h-full relative transition-transform block translate-z-0 [backface-visibility:hidden]">
                          <div>
                            <Link
                              to={"#"}
                              className="border border-[#0000] bg-white bg-gradient-to-b from-[#ffc6c6] via-[#fedace] via-35%  to-[#fee3d2] 
            block relative h-0 overflow-hidden lg:rounded-[0.9375rem] lg:pt-[100%] 
            transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
            before:w-full before:h-full before:bg-white before:pointer-events-none before:content-['']"
                            >
                              <img
                                // src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
                                // alt=""
                                src={productdata?.imageUrl}
                                alt={productdata?.name}
                                className="object-contain absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            rotate-[var(--tw-rotate)]
            skew-x-[var(--tw-skew-x)] 
            skew-y-[var(--tw-skew-y)]
            scale-x-[var(--tw-scale-x)]
            scale-y-[var(--tw-scale-y)] w-full h-full  transition-all duration-300 inline max-w-full align-middle "
                              />
                            </Link>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex-shrink-0 w-[428px] mr-[15px] h-full relative transition-transform block translate-z-0 [backface-visibility:hidden]">
                          <div>
                            <Link
                              to={"#"}
                              className="border border-[#0000] bg-white bg-gradient-to-b from-[#ffc6c6] via-[#fedace] via-35%  to-[#fee3d2] 
            block relative h-0 overflow-hidden lg:rounded-[0.9375rem] lg:pt-[100%] 
            transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
            before:w-full before:h-full before:bg-white before:pointer-events-none before:content-['']"
                            >
                              <img
                                // src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
                                // alt=""
                                src={productdata?.imageUrl}
                                alt={productdata?.name}
                                className="object-contain absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            rotate-[var(--tw-rotate)]
            skew-x-[var(--tw-skew-x)] 
            skew-y-[var(--tw-skew-y)]
            scale-x-[var(--tw-scale-x)]
            scale-y-[var(--tw-scale-y)] w-full h-full  transition-all duration-300 inline max-w-full align-middle "
                              />
                            </Link>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div className="block">
                      {" "}
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
                  <div className="mt-[1.125rem] overflow-hidden touch-pan-y ml-auto mr-auto relative p-0 z-1 block">
                    <Swiper className="flex transform translate-x-0 translate-y-0 translate-z-0 transition-none relative w-full !h-full ">
                      <SwiperSlide className="!w-[92.9975px] mr-[18.67px] flex-shrink-0 !h-[100%] relative transition-transform block">
                        <div>
                          <div
                            className="border border-[#0000] bg-white bg-gradient-to-b from-[#ffc6c6] via-[#fedace] via-35%  to-[#fee3d2] 
                           block relative h-0 overflow-hidden lg:rounded-[0.9375rem] lg:pt-[100%] 
                           transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                           before:w-full before:h-full before:bg-white before:pointer-events-none before:content-['']"
                          >
                            <img
                              // src="https://cdn.happyskin.vn/media/54/mat-na-duong-am-b5-25g.jpg"
                              // alt="hinh"
                              src={productdata?.imageUrl}
                              alt={productdata?.name}
                              className="object-contain absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            rotate-[var(--tw-rotate)]
            skew-x-[var(--tw-skew-x)] 
            skew-y-[var(--tw-skew-y)]
            scale-x-[var(--tw-scale-x)]
            scale-y-[var(--tw-scale-y)] w-full h-full  transition-all duration-300 inline max-w-full align-middle "
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="!w-[92.9975px] mr-[18.67px] flex-shrink-0 h-full relative transition-transform block">
                        <div>
                          <div
                            className="border border-[#0000] bg-white bg-gradient-to-b from-[#ffc6c6] via-[#fedace] via-35%  to-[#fee3d2] 
                            block relative h-0 overflow-hidden lg:rounded-[0.9375rem] lg:pt-[100%] 
                            transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                            before:w-full before:h-full before:bg-white before:pointer-events-none before:content-['']"
                          >
                            <img
                              // src="https://cdn.happyskin.vn/media/54/mat-na-duong-am-b5-25g.jpg"
                              // alt="hinh"
                              src={productdata?.imageUrl}
                              alt={productdata?.name}
                              className="object-contain absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            rotate-[var(--tw-rotate)]
            skew-x-[var(--tw-skew-x)] 
            skew-y-[var(--tw-skew-y)]
            scale-x-[var(--tw-scale-x)]
            scale-y-[var(--tw-scale-y)] w-full h-full  transition-all duration-300 inline max-w-full align-middle "
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="w-[50%] mt-[1.875rem] pr-[.78125rem] pl-[.78125rem]">
                <div>
                  <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#444] opacity-100 mb-1 leading-[1.5]">
                    {productdata?.name}
                  </h1>
                  <p className="flex flex-wrap items-center gap-2 text-[14px] md:text-[16px] font-extrabold text-[#FA5] uppercase leading-[1.5] mb-1.5">
                    <Link
                      to={"#"}
                      className="transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] text-inherit no-underline"
                    >
                      Emmié by HappySkin
                    </Link>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:mt-1">
                    <div className="gap-[8px] flex items-center">
                      <div>
                        <Rating
                          value={2} // Giá trị mặc định là 0 (tức là chưa chọn sao nào)
                          max={5} // Số lượng sao tối đa
                          icon={
                            <StarBorderIcon
                              style={{ color: "red" }}
                              fontSize="large"
                            />
                          }
                          emptyIcon={
                            <StarBorderIcon
                              style={{ color: "red" }}
                              fontSize="large"
                            />
                          }
                          readOnly // Đặt thành readOnly nếu chỉ muốn hiển thị
                        />
                      </div>
                      <div className="flex items-center gap-px relative text-[14px] md:text-[16px] text-[#828282]">
                        {"("}{" "}
                        <span className=" font-bold text-[#333] text-sm mr-1">
                          0
                        </span>
                        Đánh giá{")"}
                      </div>
                    </div>
                    <span className="font-medium text-[14px] md:text-[16px] xl:text-[16px] leading-[1.7] text-[#828282]">
                      |
                    </span>
                    <span className="text-[14px] font-medium text-[#828282] ">
                      <span className="font-bold text-[#333] text-sm mr-1">
                        0
                      </span>
                      Hỏi bán
                    </span>
                    <span className="font-medium text-[14px] md:text-[16px] xl:text-[16px] leading-[1.7] text-[#828282]">
                      |
                    </span>
                    <span className="text-[14px] font-medium text-[#828282] ">
                      <span className="font-bold text-[#333] text-sm mr-1">
                        0
                      </span>
                      Đã bán
                    </span>
                  </div>
                  <div className="md:mt-1 flex flex-col">
                    <span className="text-gray-700 text-[14px] font-medium leading-[1.5] md:text-[1rem]">
                      {"Gía gốc: "}
                      <span className="line-through"> {originalTotal} đ</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-[.25rem]">
                      <span className="text-[14px] md:text-[1.5rem] text-[rgb(134,3,21)] font-extrabold leading-[1.5]">
                        {/* {productdata?.finalPrice.toLocaleString()} đ */}
                        {totalPrice}đ
                      </span>
                      <span className="text-[14px] text-[rgb(130,130,130)] font-medium  leading-[1.5]">
                        (Đã bao gồm VAT)
                      </span>
                    </span>
                    <span className="flex flex-wrap items-center gap-[.25rem]">
                      <span className="text-[16px] font-medium leading-[1.6] text-[rgb(130,130,130)] lg:text-[1rem] lg:leading-[1.7]">
                        -
                      </span>
                      <span className="text-gray-700 font-medium leading-[1.5] text-[14px] md:text-[1rem]">
                        {"Tiết kiệm: "}
                        <span>{savedAmount}đ</span>
                      </span>
                      <span className="bg-[rgb(134,3,21)] text-white font-medium text-[12px] text-center px-1 rounded-[2px] md:text-[.75rem]">
                        {productdata?.discountPercentage}%
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-3 border border-dashed border-[#86031580] rounded px-3 py-2 bg-white text-gray-700 font-bold text-[14px] leading-[1.7] lg:gap-2 lg:w-max lg:max-w-full">
                    <h3 className="text-[rgb(134,3,21)] font-bold text-[14px] md:text-[1.25rem]">
                      Chương trình dành riêng cho bạn {"1"}
                    </h3>
                    {/* <div className="relative pl-6 text-[14px] md:text-[.875rem] before:absolute before:top-0 before:left-0 before:content-['\f058'] before:text-gray-700 before:font-bold before:text-[14px] md:before:text-[1rem] before:font-[FontAwesome]"> */}
                    <div className="relative pl-6 text-[14px] md:text-[.875rem] ">
                      <div className="absolute top-0 left-0  text-gray-700 font-bold text-[14px] md:text-[1rem] ">
                        {" "}
                        ✅{" "}
                      </div>
                      {"TẾT THẬT XINH - VALENTINE THẬT YÊU"}
                      <span className="text-[rgb(134,3,21)]">
                        - Giảm: 281.000 ₫
                      </span>
                      <div className="text-gray-700 font-medium">
                        {
                          "Mặt Nạ Dưỡng Ẩm Chuyên Sâu Emmié Complete Hydrating Tencel Mask 23g"
                        }
                      </div>
                    </div>
                    <p className="text-[rgb(134,3,21)]">Tổng giảm: 281.000 ₫</p>
                    <p className="text-[rgb(134,3,21)]">
                      Số lượng quà dành cho bạn: 1
                    </p>
                  </div>
                </div>
                <div>
                  <form action="" className="mt-[.75rem]">
                    <div className="lg:space-y-4 space-y-[10px] flex items-center text-[14px] md:text-[1rem]">
                      <p className="cursor-pointer hidden text-gray-500 font-medium text-[14px] leading-[1.6] md:block md:pr-2 lg:w-[7.75rem] lg:text-[1rem] lg:leading-[1.7] m-0">
                        Combo
                      </p>
                      <div className="flex flex-wrap items-center gap-2 font-normal text-[14px] md:text-[1rem]">
                        <Link
                          to=""
                          className="flex items-center justify-center rounded-full bg-gray-200 px-[30px] h-[30px] font-medium text-[14px] leading-[1.6] transition-all duration-200 ease-in-out hover:text-gray-700 lg:text-[1rem] lg:leading-[1.7]"
                        >
                          Combo 1 hộp
                        </Link>
                        <Link
                          to=""
                          className="flex items-center justify-center rounded-full bg-gray-200 px-[30px] h-[30px] font-medium text-[14px] leading-[1.6] transition-all duration-200 ease-in-out hover:text-gray-700 lg:text-[1rem] lg:leading-[1.7]"
                        >
                          Combo 2 hộp
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-[10px] lg:space-y-4 text-[14px] md:text-[1rem]"></div>
                    <div className="flex items-center mt-[10px] lg:mt-4 lg:mb-4 text-[14px] md:text-[1rem]">
                      <p className="cursor-pointer hidden text-gray-500 font-medium text-[14px] leading-[1.6] md:block md:pr-2 lg:w-[7.75rem] lg:text-[1rem] lg:leading-[1.7] m-0">
                        Số lượng
                      </p>
                      <div className="flex justify-between items-center rounded-full bg-gray-200 w-[126px] h-[43px] overflow-hidden text-center lg:w-[166px]">
                        <span
                          className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[42px] min-w-[42px] h-full text-gray-700 font-medium text-[16px] leading-[1.6] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:right-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none"
                          onClick={handleDecrease}
                        >
                          -
                        </span>
                        <input
                          className="w-full h-full border border-transparent px-[5px] text-gray-700 font-medium text-[16px] leading-[1.6] text-center lg:text-[1rem] lg:leading-[1.7]"
                          type="text"
                          value={quantity}
                          readOnly
                        />
                        <span
                          onClick={handleIncrease}
                          className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[42px] min-w-[42px] h-full text-gray-700 font-medium text-[16px] leading-[1.6] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:left-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none"
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-[10px] lg:mt-4 lg:mb-4 text-[14px] md:text-[1rem] gap-[.625rem] flex-wrap">
                      <button
                        onClick={handleAddToCart}
                        disabled={isPendingCart}
                        type="button"
                        className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.5l1.5 13.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5L19.5 6h-15"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 11.25h6M9 14.25h6M10.5 17.25h3"
                          />
                        </svg>
                        <span>Thêm vào giỏ hàng</span>
                      </button>
                      <Link
                        to="#"
                        className="flex items-center gap-2.5 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] px-4 py-2 h-9 font-medium text-sm border text-opacity-100 bg-transparent text-[rgb(134_3_21)] rounded-full border-[rgb(134_3_21)] hover:bg-[rgb(134_3_21)] hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          className="w-6 h-6 transition-all duration-300 hover:stroke-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12 4 12 4C12 4 12.76 3 14.5 3C17.58 3 20 5.42 20 8.5C20 13.5 12 21 12 21Z"
                          />
                        </svg>
                      </Link>
                      <Link
                        to="#"
                        onClick={hanleAddProduct}
                        className="flex items-center gap-2 px-4 h-[2.75rem] text-[clamp(14px,1rem,1rem)] font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] border  text-[rgb(134_3_21)] rounded-full border-[rgb(134_3_21)] hover:bg-[rgb(134_3_21)] hover:text-white "
                      >
                        {isPending ? "Đang thêm..." : "Thêm vào so sánh"}
                        {/* {"Thêm vào so sánh "} */}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M3 12v4a2 2 0 0 0 2 2h2v-6H5a2 2 0 0 0-2 2zM21 12v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2z" />
                          <path d="M12 2a10 10 0 0 0-10 10h2a8 8 0 0 1 16 0h2A10 10 0 0 0 12 2z" />
                          <rect x="9" y="16" width="6" height="4" rx="1" />
                          <circle cx="12" cy="18" r="1" />
                        </svg>
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center gap-2 px-[1.5rem] h-[2.75rem] text-[clamp(14px,1rem,1rem)] font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-700 bg-transparent text-gray-700 rounded-full  hover:bg-[rgb(134_3_21)] hover:text-white"
                      >
                        Tư vấn ngay
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showScrollDown && (
          <ScrollDown
            handleAddToCart={handleAddToCart}
            quantity={quantity}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            totalPrice={totalPrice}
            originalTotal={originalTotal}
            savedAmount={savedAmount}
            productdata={productdata}
            showScrollDown={showScrollDown}
          />
        )}
      </section>
    </>
  );
};

export default DetailPage;
