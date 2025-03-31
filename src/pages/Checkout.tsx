import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GetAllCartByUserId } from "../Services/CartService/GetAllCartByUserId";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../Services/MainService";
import { UpdateCart } from "../Services/CartService/UpdateCartService";
import { DeleteProductCart } from "../Services/CartService/DeleteProductCart";
import PaymentMethods from "../components/PaymentMethod";
import { CreateOrders } from "../Services/OrderService/CreateOrders";

const Checkout: React.FC = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
  console.log("nguoi dung", userId);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
    email: "",
    isDefault: true
  });
  const [discountCode, setDiscountCode] = useState<string>("");

  console.log("co du lieu ", formData.province);
  console.log("co du lieu ", formData.district);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 



  const { data, refetch } = useQuery({
    queryKey: ["Cart", userId],
    queryFn: ({ signal }) =>
      GetAllCartByUserId({ signal: signal, userId: userId }), // Fetch cart data by userId),

    enabled: !!userId, // Only run the query if userId is available
  });

  const cartData = data?.Carts || []; // Default to an empty array if data is undefined

  const { mutate: addCart } = useMutation({
    mutationFn: UpdateCart,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["Cart"],
        refetchType: "active",
      });

      console.log("Add product to cart success");
    },
    onError: (error) => {
      console.log("Add product to cart error", error);
    },
  });

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 1) {
      alert("Số lượng không được nhỏ hơn 1");
    } else {
      addCart({ data: { userId, productId, quantity } });
    }
  };
  

  const { mutate: DeleteCart } = useMutation({
    mutationFn: DeleteProductCart,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["Cart"],
        refetchType: "active",
      });

      console.log("delete product to cart success");
      alert("Xóa sản phẩm thành công");
    },
    onError: (error) => {
      console.log("Add product to cart error", error);
    },
  });


  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      DeleteCart({ userId, productId });
    }
  };

  const { mutate: createOrders } = useMutation({
    mutationFn: CreateOrders,
    onSuccess: async () => {
      console.log("✅ Đặt hàng thành công");
  
      // Đợi một chút để đảm bảo backend đã xoá cart
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["Cart"],
          refetchType: "all"
        });
      }, 300); // hoặc 500ms nếu vẫn fail
  
      // Reset UI nếu cần
      setFormData({
        fullName: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        streetAddress: "",
        email: "",
        isDefault: true
      });
      setPaymentMethod(null);
      setDiscountCode("");
      alert("Đặt hàng thành công");
      window.location.reload();
    },
    onError: (error) => {
      console.log("❌ Lỗi khi đặt hàng", error);
      alert("Đặt hàng thất bại!");
    }
  });
  
  
    const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("formData", formData);
      createOrders({data:{
        userId:userId,
        shippingAddressInput:formData,
        paymentMethod:paymentMethod,
        discountCode:discountCode,
  
      }})
      await refetch();
    };
  
  

  const tempTotal = cartData.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );

  const discountTotal = cartData.reduce(
    (total, item) =>
      total +
      (item.product.originalPrice - item.product.finalPrice) * item.quantity,
    0
  );

  const finalTotal = tempTotal - discountTotal;

  return (
    <>
      {" "}
      <nav className="pt-[8px] pb-[8px]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <ol className="flex-wrap  flex items-center m-0 p-0 overflow-visible">
            <li
              className="flex items-center w-max relative after:content-[''] after:block after:w-[6px] after:h-[6px] 
       after:bg-gray-700 after:rounded-full after:mx-[15px]  "
            >
              <Link
                to="#"
                className="block text-gray-700 font-normal leading-[1.5] whitespace-nowrap transition-all duration-200 "
              >
                <span>Trang chủ</span>
              </Link>
            </li>
            <li className="flex items-center w-max">
              <Link
                to={""}
                className="text-[rgb(134,3,21)] text-opacity-100 block font-normal text-[12px] leading-[1.5] whitespace-nowrap text-sm lg:text-[14px] transition-all duration-200 ease-[cubic-bezier(0.4,0.2,1)]"
              >
                Thanh toán
              </Link>
            </li>
          </ol>
        </div>
      </nav>
      <section className="pt-[1.25rem] pb-[3.75]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <form action="" onSubmit={handleSubmit} className="mb-[2.5rem]">
            <div className="flex flex-wrap ml-[10px] lg:-mr-[0.78125rem] lg:-ml-[0.78125rem] -mt-8 lg:text-[14px] lg:text-base">
              <div className="pr-[10px] pl-[10px] lg:pl-[0.78125rem] lg:pr-[3.75rem] lg:w-2/3 w-[66.666667%] mt-8 lg:text-[14px] lg:text-base">
                <div className="mb-[2.5rem]">
                  <div className="flex flex-wrap justify-between gap-[10px] border-b border-gray-500 pb-[1.25rem] mb-[1.25rem] lg:text-[14px] lg:text-base">
                    <h1 className="mb-0 lg:-mb-[0.9375rem] text-[clamp(14px,1.5rem,1.5rem)] text-[rgb(134,3,21)]  font-normal   m-0">
                      <span>
                        {"Giỏ hàng của bạn ( có"}
                        <strong> {cartData.length} </strong>
                        {"sản phẩm )"}
                      </span>
                    </h1>
                    <div className="mb-0 block text-[clamp(14px,1rem,1rem)]">
                      <div className="gap-[.625rem] flex flex-wrap text-[clamp(14px,1rem,1rem)]">
                        <Link
                          to=""
                          className="flex items-center gap-2 transition-all duration-200 ease-in-out 
               px-4 h-9 font-medium text-xs 
                border border-gray-700 bg-gray-700 text-white
                hover:bg-[#860315e6] hover:text-white hover:border-[#860315e6]
               rounded-full 
               md:px-[0.9375rem] md:h-[1.875rem] md:text-[clamp(14px,0.75rem,0.75rem)]
               cursor-pointer"
                        >
                          <span>Tiếp tục mua hàng</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l1.2 6h9.6l1.2-6m-12 0h12"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[clamp(14px,1rem,1rem)] w-full max-w-none text-gray-700 mb-5">
                      <div className="border border-dashed border-gray-600 rounded-lg px-2.5 py-2 font-bold md:text-[clamp(14px,1rem,1rem)]">
                        <p className="m-0">
                          <span className="text-[#000000]">
                            Đơn hàng từ 300k bất kỳ tặng 1 Mini Size Ceuticoz.
                            Đơn từ 500k tặng 1 Body Silicone Bath Brush 177k.
                            Đơn từ 1 triệu tặng 1 áo thun BST VN Coolmate trị
                            giá 350k
                          </span>
                        </p>
                      </div>
                    </div>
                    {cartData.map((item) => {
                      const totalOriginal =
                        item.product.originalPrice * item.quantity;
                      const totalFinal =
                        item.product.finalPrice * item.quantity;
                      const discount = totalOriginal - totalFinal;
                      // const discountPercentage =
                      //   (discount / totalOriginal) * 100;
                      return (
                        <div
                          key={item.product.id}
                          className="pt-[1.25rem] pb-[1.25rem] flex relative items-start gap-4 border-b border-gray-600/15 lg:gap-3.5 md:text-[clamp(14px,1rem,1rem)]"
                        >
                          <div className="w-[6.25rem] flex justify-center">
                            <Link
                              to="#"
                              className="transition-all duration-200 ease-in-out"
                            >
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full max-w-full h-full max-h-full object-contain inline align-middle"
                              />
                            </Link>
                          </div>

                          <div
                            className="flex flex-row flex-wrap justify-between gap-[1.25rem]"
                            style={{ flex: "1 1 0%" }}
                          >
                            <div
                              style={{ flex: "1 1 0%" }}
                              className="w-[66.666667%]"
                            >
                              <h2 className="text-[clamp(14px,1rem,1.5rem)] leading-[1.7] text-gray-700 font-bold m-0">
                                <Link
                                  to="#"
                                  className="transition-all duration-200 ease-in-out"
                                >
                                  {item.product.name}
                                </Link>
                              </h2>
                              <div className="text-[clamp(14px,.875rem,.875rem)] flex items-center gap-[10px] mt-[5px]">
                                <p className="m-0">Số lượng:</p>
                                <div className="flex flex-nowrap justify-between gap-0 w-[7.5rem] h-[1.875rem] items-center text-[clamp(14px,1rem,1rem)] font-normal overflow-hidden text-center bg-[rgb(246,246,246)] rounded-full">
                                  <span
                                    className="cursor-pointer w-[1.875rem] text-center"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </span>
                                  <input
                                    className="w-[30px] h-[36px] border border-transparent px-[5px] text-center"
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <span
                                    className="cursor-pointer w-[1.875rem] text-center"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-[1_1_0%] w-1/3 xl:text-[clamp(14px,1rem,1rem)]">
                              <div className="flex flex-col gap-0 m-w-max text-[clamp(14px,.875rem,.875rem)] flex-wrap justify-end items-end text-right lg:flex lg:gap-2.5 overflow-hidden mt-[0.375rem] text-[rgb(130,130,130)] font-normal leading-[1.6]">
                                <p className="text-[rgb(134,3,21)] font-medium m-0">
                                  {item.product.originalPrice.toLocaleString()}đ
                                </p>
                                {discount > 0 && (
                                  <p className="flex items-center gap-[3px] m-0">
                                    {"Tiết kiệm: "}
                                    <span className="text-[#000000] font-medium">
                                      {discount.toLocaleString()}đ
                                    </span>
                                    <span className="ml-1 rounded-sm bg-[rgb(254,45,5)] px-1 text-white text-[12px]">
                                      -{item.product.discountPercentage}%
                                    </span>
                                  </p>
                                )}
                                <p className="m-0">
                                  {"Tổng: "}
                                  <span className="text-[rgb(134,3,21)] font-bold">
                                    {totalFinal.toLocaleString()}đ
                                  </span>
                                </p>
                                <p className="m-0">(Giá đã bao gồm VAT)</p>
                              </div>
                            </div>

                            {/* Quà tặng (placeholder tĩnh - có thể custom thành item.freeGifts nếu cần) */}
                            <div className="mt-[0.625rem] rounded-md p-[0.9375rem] w-3/4 border border-[#86031580] text-[clamp(14px,.75rem,.75rem)]">
                              <label className="flex items-center gap-[5px] mb-[5px] text-[rgb(134,3,21)] text-[clamp(14px,.875rem,.875rem)]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 12v10H4V12"></path>
                                  <path d="M2 7h20v5H2z"></path>
                                  <path d="M12 22V7"></path>
                                  <path d="M12 7a4 4 0 1 0-4-4"></path>
                                  <path d="M12 7a4 4 0 0 1 4-4"></path>
                                </svg>
                                <span>Quà tặng</span>
                              </label>
                              <p className="relative pl-[1rem] m-0 before:absolute before:top-[10px] before:left-0 before:w-[0.25rem] before:h-[0.25rem] before:rounded-full before:bg-[rgb(134,3,21)] before:content-[''] before:pointer-events-none">
                                Kem Dưỡng Trắng Emmié Face & Body Emulsion 230g
                                x1
                              </p>
                            </div>

                            <Link
                              to="#"
                              onClick={() =>
                                handleDeleteProduct(item.product.id)
                              }
                              className="absolute top-0 right-0 z-10 rounded-full text-[rgb(254,45,5)] text-[15px] transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] no-underline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18"></path>
                                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
                                <path d="M10 11v6"></path>
                                <path d="M14 11v6"></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="pt-[1.25rem] pb-[1.25rem] flex relative items-start gap-4 border-b border-gray-600/15  lg:gap-3.5 md:text-[clamp(14px,1rem,1rem)]">
                      <div className="w-[6.25rem] flex justify-center">
                        <Link
                          to="#"
                          className="transition-all duration-200 ease-in-out"
                        >
                          <img
                            src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
                            alt=""
                            className="w-full max-w-full h-full max-h-full object-contain inline align-middle"
                          />
                        </Link>
                      </div>
                      <div
                        className="flex flex-row flex-wrap justify-between gap-[1.25rem] "
                        style={{ flex: "1 1 0%" }}
                      >
                        <div
                          style={{ flex: "1 1 0%" }}
                          className="w-[66.666667%]"
                        >
                          <h2 className="text-[clamp(14px,1rem,1.5rem)] leading-[1.7] text-gray-700 font-bold m-0">
                            <Link
                              to="#"
                              className="transition-all duration-200 ease-in-out"
                            >
                              Máy Triệt Lông IPL MAX POWER Therapy Device For
                              Hair Removal EM505
                            </Link>
                          </h2>
                          <div className="text-[clamp(14px,.875rem,.875rem)] flex items-center gap-[10px] mt-[5px]">
                            <p className="m-0">Số lượng:</p>
                            <div className="flex flex-nowrap justify-between gap-0 w-[7.5rem] h-[1.875rem] items-center text-[clamp(14px,1rem,1rem)] font-normal overflow-hidden text-center bg-[rgb(246,246,246)] rounded-full">
                              <span className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[1.875rem] min-w-[1.875rem] h-full text-gray-700 font-medium text-[16px] leading-[1.7] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:right-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none">
                                -
                              </span>
                              <input
                                className="w-[30px] h-[36px] border border-transparent px-[5px] text-gray-700 font-medium text-[16px] leading-[1.7] text-center lg:text-[1rem] lg:leading-[1.7]"
                                type="text"
                                value={1}
                              />
                              <span className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[1.875rem] min-w-[1.875rem] h-full text-gray-700 font-medium text-[16px] leading-[1.7] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:left-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none">
                                +
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-[1_1_0%] w-1/3 xl:text-[clamp(14px,1rem,1rem)]">
                          <div
                            className="flex flex-col gap-0 m-w-max text-[clamp(14px,.875rem,.875rem)]
                flex-wrap justify-end items-end text-right
                lg:flex lg:gap-2.5
                overflow-hidden mt-[0.375rem] text-[rgb(130,130,130)] font-normal leading-[1.6]"
                          >
                            <p className="text-[rgb(134,3,21)] font-medium m-0">
                              4990000đ
                            </p>
                            <p className="flex items-center gap-[3px] m-0">
                              {"Tiết kiệm: "}
                              <span className="text-[#000000] font-medium">
                                500.000đ
                              </span>
                              <span className="ml-1 rounded-sm bg-[rgb(254,45,5)] px-1 text-white text-[12px]">
                                -26%
                              </span>
                            </p>
                            <p className="m-0">
                              {"Tổng: "}
                              <span className="text-[rgb(134,3,21)] font-bold">
                                3 690 000đ
                              </span>
                            </p>
                            <p className="m-0">{"(Giá đã bao gồm VAT)"}</p>
                          </div>
                        </div>
                        <div className="mt-[0.625rem] rounded-md p-[0.9375rem] w-3/4 border border-[#86031580] text-[clamp(14px,.75rem,.75rem)]">
                          <label
                            htmlFor=""
                            className="flex items-center gap-[5px] mb-[5px] text-[rgb(134,3,21)] text-[clamp(14px,.875rem,.875rem)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 12v10H4V12"></path>
                              <path d="M2 7h20v5H2z"></path>
                              <path d="M12 22V7"></path>
                              <path d="M12 7a4 4 0 1 0-4-4"></path>
                              <path d="M12 7a4 4 0 0 1 4-4"></path>
                            </svg>
                            <span> Qùa tặng</span>
                          </label>
                          <p
                            className="relative pl-[1rem] m-0 before:absolute before:top-[10px] before:left-0 before:w-[0.25rem] 
              before:h-[0.25rem] before:rounded-full before:bg-[rgb(134,3,21)] 
              before:content-[''] before:pointer-events-none"
                          >
                            {" "}
                            Kem Dưỡng Trắng Emmié Face & Body Emulsion 10%
                            Niacinamide 230g - One Love (tím)x1
                          </p>
                          <p
                            className="relative pl-[1rem] m-0 before:absolute before:top-[10px] before:left-0 before:w-[0.25rem] 
              before:h-[0.25rem] before:rounded-full before:bg-[rgb(134,3,21)] 
              before:content-[''] before:pointer-events-none"
                          >
                            {" "}
                            Kem Dưỡng Trắng Emmié Face & Body Emulsion 10%
                            Niacinamide 230g - One Love (tím)x1
                          </p>
                          <p
                            className="relative pl-[1rem] m-0 before:absolute before:top-[10px] before:left-0 before:w-[0.25rem] 
              before:h-[0.25rem] before:rounded-full before:bg-[rgb(134,3,21)] 
              before:content-[''] before:pointer-events-none"
                          >
                            {" "}
                            Kem Dưỡng Trắng Emmié Face & Body Emulsion 10%
                            Niacinamide 230g - One Love (tím)x1
                          </p>
                        </div>
                        <Link
                          to="#"
                          className="absolute top-0 right-0 z-10 rounded-full text-[rgb(254,45,5)] text-[15px] 
              transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] 
             no-underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                          </svg>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  <div className="mt-[2rem]">
                    <div className="mr-[-.78125rem] ml-[-.78125rem] flex flex-wrap mt-[-2rem]">
                      <div className="w-full pr-[.78125rem] pl-[.78125rem] ">
                        <div className="mb-[1.25rem]">
                          <div>
                            <div className="relative">
                              <input
                                type="text"
                                name="discountCode"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}

                                className="pr-[7.5rem] h-[40px] font-medium relative border border-gray-500 rounded-md bg-transparent p-1.5 w-full  text-gray-700 text-base"
                                placeholder="nhập mã giảm giá"
                              />
                              <button className="absolute top-[.1875rem] right-[.1875rem] bg-[#860315e6] text-white font-medium uppercase text-xs text-center w-[6.25rem] h-[calc(100%-0.375rem)] px-4 py-1 rounded transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                Áp dụng mã
                              </button>
                            </div>
                          </div>
                          <div></div>
                          <div className="mt-[.25rem] text-gray-700 italic font-normal text-xs">
                            <p className="m-0">
                              {
                                "- Sau khi áp dụng, Mã giảm giá có thể không dùng được trong vòng 15 phút."
                              }
                              <br />
                              {
                                "- Mã giảm giá chỉ áp dụng cho đơn hàng từ 500.000đ trở lên."
                              }
                            </p>
                            <div className="gap-[.625rem] flex flex-wrap mt-[1.25rem]">
                              <Link
                                to={"#"}
                                className="flex items-center gap-2
  px-4 py-2 h-[36px] text-[12px] font-medium
  border border-[rgb(134,3,21)] rounded-full
  transition-all duration-200 ease-[cubic-bezier(0.4,0.2,1)]
  bg-transparent text-[rgb(134,3,21)]
  hover:border-[rgb(134,3,21)]
  not-italic"
                              >
                                123456
                              </Link>
                              <Link
                                to={""}
                                className="flex items-center gap-[0.5rem]
  px-4 py-2 pr-4 pl-4 h-[36px] text-[12px]
  border border-[#86031566] rounded-full
  transition-all duration-200 ease-[cubic-bezier(0.4,0.2,1)]
  bg-[#86031566] text-white
  md:w-[3.125rem] md:h-[3.125rem] md:border-0 md:p-0"
                              >
                                <img
                                  src="https://www.happyskin.vn/themes/HappySkin/img/zalo.png"
                                  alt=""
                                  className="w-full h-full inline max-w-full"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[0.5rem] p-[0.5rem] border border-dashed border-[#86031580] rounded-[0.25rem] text-[clamp(14px,0.875rem,0.875rem)]">
                          <p className="m-0">
                            {"Đơn hàng này thành công bạn sẽ tích lũy được "}
                            <strong className="text-red font-bold">79</strong>
                            {"Điểm. "}
                            <br />
                            <Link
                              to="#"
                              className=" text-[rgb(134,3,21)]
  transition-all duration-200 ease-[cubic-bezier(0.4,0.2,1)]"
                            >
                              Đăng nhập
                            </Link>
                            {" để sử dụng tính năng tích lũy điểm. "}
                            <br />
                            <Link
                              to="#"
                              className=" text-[rgb(134,3,21)]
  transition-all duration-200 ease-[cubic-bezier(0.4,0.2,1)]"
                            >
                              Xem quy định điểm tích lũy
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="w-full pr-[.78125rem] pl-[.78125rem] mt-[2rem]">
                        <div>
                          <div className="flex justify-between items-center mb-[10px]">
                            <p className="text-[#000] font-medium text-[14px] m-0">
                              Tạm tính
                            </p>
                            <p className=" text-[rgb(68,68,68)] text-[14px] font-bold m-0">
                              {tempTotal.toLocaleString()} ₫
                            </p>
                          </div>
                          <div className="flex justify-between items-center mb-[10px]">
                            <p className="text-[#000] font-medium text-[14px] m-0">
                              Giảm giá
                            </p>
                            <p className=" text-[rgb(68,68,68)] text-[14px] font-bold m-0">
                              -{discountTotal.toLocaleString()} ₫
                            </p>
                          </div>
                          <div className="flex justify-between items-center mb-[10px]">
                            <p className="text-[#000] font-medium text-[14px] m-0">
                              Số điểm tích luỹ
                            </p>
                            <p className=" text-[rgb(68,68,68)] text-[14px] font-bold m-0">
                              -0 ₫
                            </p>
                          </div>
                          <div className="flex justify-between items-center mb-[10px]">
                            <p className="text-[#000] font-medium text-[14px] m-0">
                              Phí vận chuyển
                            </p>
                            <p className=" text-[rgb(68,68,68)] text-[14px] font-bold m-0">
                              -0 ₫
                            </p>
                          </div>
                          <div
                            className=" flex justify-between items-center mb-[10px]
  border-t border-dotted border-[#f1f1f1] pt-[10px]
  md:text-[clamp(14px,1rem,1rem)]"
                          >
                            <p className="font-bold text-[#000] text-[14px] m-0">
                              Tổng giá trị đơn hàng
                            </p>
                            <p className="text-[16px] text-[rgb(134,3,21)] font-bold">
                              {finalTotal.toLocaleString()} ₫
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="mb-[2.5rem]">
                  <div className="mb-[1.25rem] pb-[1.25rem] flex flex-wrap justify-between gap-[10px] border-b border-[rgb(130,130,130)]  md:text-[clamp(14px,1rem,1rem)]">
                    <h2 className="mb-0 text-[rgb(134,3,21)] font-normal text-[18px]  md:text-[clamp(14px,1.5rem,1.5rem)]">
                      Phương thức vận chuyển
                    </h2>
                  </div>
                  <div>
                    <label htmlFor="" className="block relative pl-[2rem]">
                      <input
                        type="radio"
                        className="absolute left-0 appearance-none w-5 h-5 border-2 border-[#7b0013] rounded-full 
checked:bg-[#7b0013] checked:ring-2 checked:ring-white flex-shrink-0 inline-block align-middle select-none"
                      />

                      <strong className="mb-[.5rem]">Free (0 ₫)</strong>
                    </label>
                  </div>
                </div>
                <div className="mb-[2.5rem]">
                  <div className="mb-[2.5rem]">
                    <div className="mb-[1.25rem] pb-[1.25rem] flex flex-wrap justify-between gap-[10px] border-b border-[rgb(130,130,130)]">
                      <h2 className="mb-0 text-[rgb(134,3,21)] font-normal text-[18px]  md:text-[clamp(14px,1.5rem,1.5rem)]">
                        Phương thức thanh toán
                      </h2>
                    </div>
                    <div>
                      <div>
                        {/* <div className="flex rounded-[.5rem] bg-[rgb(204,204,204)] overflow-hidden ">
                          <label htmlFor="" className="flex-1 basis-0">
                            <span className="flex flex-col justify-center items-center gap-5 cursor-pointer rounded-md py-3 px-5 bg-[#CCCCCC] active:bg-[#444444]">
                              <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
                                <img
                                  src="https://cdn.happyskin.vn/media/38/thanh-toan-khi-nhan-hang.png"
                                  alt=""
                                  className="max-h-full inline max-w-full h-auto align-middle"
                                />
                              </span>
                              <span className="flex-1 basis-0 text-[#444444] font-normal text-sm text-left active:text-white">
                                Thanh toán khi nhận hàng
                              </span>
                            </span>
                          </label>
                          <label htmlFor="" className="flex-1 basis-0">
                            <span className="flex flex-col justify-center items-center gap-5 cursor-pointer rounded-md py-3 px-5 bg-[rgb(204,204,204)] active:bg-[rgb(204,204,204)]">
                              <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
                                <img
                                  src="https://cdn.happyskin.vn/media/53/2747-thanh-toan-the-tin-dung.png"
                                  alt=""
                                  className="max-h-full inline max-w-full h-auto align-middle"
                                />
                              </span>
                              <span className="flex-1 basis-0 text-[rgb(68,68,68)] font-normal text-sm text-left active:text-white">
                                Thanh toán thẻ tín dụng
                              </span>
                            </span>
                          </label>
                          <label htmlFor="" className="flex-1 basis-0">
                            <span className="flex flex-col justify-center items-center gap-5 cursor-pointer rounded-md py-3 px-5 bg-[rgb(204,204,204)] active:bg-[rgb(204,204,204)]">
                              <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
                                <img
                                  src="https://cdn.happyskin.vn/media/53/chuyen-khoan-truc-tiep.png"
                                  alt=""
                                  className="max-h-full inline max-w-full h-auto align-middle"
                                />
                              </span>
                              <span className="flex-1 basis-0 text-[rgb(68,68,68)] font-normal text-sm text-left active:text-white">
                                Chuyển khoản trực tiếp
                              </span>
                            </span>
                          </label>
                        </div> */}
                        <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
                      </div>
                    </div>
                    <div className="mt-5 flex text-[#0A0A0A] font-normal text-sm md:text-base">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-gray-400 rounded appearance-none checked:bg-[#860315] checked:border-[#860315] cursor-pointer"
                        />

                        <span className="text-[#444444] text-sm">
                          Tôi đã đọc và đồng ý với{" "}
                          <Link to="#" className="text-[#860315] font-medium">
                            điều kiện giao dịch chung
                          </Link>
                          {" của website"}
                        </span>
                      </label>
                    </div>
                    <div
                      className="flex justify-center static mt-[40px] shadow-none bg-none p-0 items-center  w-full
            "
                    >
                      <div className="gap-[.625rem] flex flex-wrap justify-center ">
                        <button className="flex justify-center items-center rounded-[3px] bg-[#860315] py-[10px] px-[15px] text-white font-bold text-sm uppercase text-center cursor-pointer transition-all duration-200">
                          {"Thanh toán "}
                          <span className="ml-1 capitalize"> {finalTotal.toLocaleString()}đ</span>

                          <span className="ml-1 capitalize mr-2">
                            {"(COD)"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-[.78125] pl-[.78125] w-[33.333333%] mt-[2rem]">
                <div className="mb-[2.5rem]">
                  <div className="mb-[1.25rem] pb-[1.25rem] flex flex-wrap justify-between gap-[10px] border-b-[1px] border-[rgb(130,130,130)] text-[clamp(14px,1rem,1rem)]">
                    <h2 className="mb-0 text-[clamp(14px,1.5rem,1.5rem)] font-normal font-secondary  my-1">
                      <span>Thông tin nhận hàng </span>
                    </h2>
                  </div>
                  <div className="">
                    <div>
                      <label htmlFor="" className="block relative pl-[2rem]">
                        <input
                          type="radio"
                          name=""
                          id=""
                          className="absolute top-[0.25rem] left-0 text-[clamp(14px,1rem,1rem)] border-transparent bg-current bg-no-repeat bg-[length:100%_100%] bg-center text-[rgb(134,3,21)] rounded-full inline-block shrink-0 align-middle appearance-none border  p-0 w-4 h-4 select-none m-0  font-inherit leading-inherit "
                        />
                        <strong className=" mb-[.5rem] font-bold">
                          Ha Thuc Minh
                        </strong>
                        <br />
                        <span>213/98 tổ 12 Khu Phố 3 Phường Tân Thới Hiệp</span>
                        <br />
                        <span>Hồ Chí Minh</span>
                        <br />
                        <span>0918016281</span>
                        <br />
                        <span>hathucminh456@gmail.com</span>
                      </label>
                    </div>
                    <div className="mt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
                      <label htmlFor="" className="block relative pl-[2rem]">
                        <input
                          type="radio"
                          name=""
                          id=""
                          className="absolute top-[0.25rem] left-0 text-[clamp(14px,1rem,1rem)] border-transparent bg-current bg-no-repeat bg-[length:100%_100%] bg-center text-[rgb(134,3,21)] rounded-full inline-block shrink-0 align-middle appearance-none border  p-0 w-4 h-4 select-none m-0  font-inherit leading-inherit "
                        />
                        <strong className=" mb-[.5rem] font-bold">
                          Ha Thuc Minh
                        </strong>
                        <br />
                        <span>213/98 tổ 12 Khu Phố 3 Phường Tân Thới Hiệp</span>
                        <br />
                        <span>Hồ Chí Minh</span>
                        <br />
                        <span>0918016281</span>
                        <br />
                        <span>hathucminh456@gmail.com</span>
                      </label>
                    </div>
                    <div className="mt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
                      <label htmlFor="" className="block relative pl-[2rem]">
                        <input
                          type="radio"
                          name=""
                          id=""
                          className="absolute top-[0.25rem] left-0 text-[clamp(14px,1rem,1rem)] border-transparent bg-current bg-no-repeat bg-[length:100%_100%] bg-center text-[rgb(134,3,21)] rounded-full inline-block shrink-0 align-middle appearance-none border  p-0 w-4 h-4 select-none m-0  font-inherit leading-inherit "
                        />
                        {"Them dia chi moi"}
                      </label>
                    </div>
                  </div>
                  <div className="mt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
                    <div className="border border-[#44444426] rounded-md p-5 lg:text-[clamp(14px,1rem,1rem)]">
                      <div className="">
                        <input
                          type="checkbox"
                          className="text-[clamp(14px,1rem,1rem)]  bg-no-repeat bg-[length:100%_100%] bg-center  rounded-none text-[rgb(134,3,21)] shadow-none print:color-adjust-exact select-none inline-block shrink-0 align-middle appearance-none border border-gray-500 bg-transparent w-4 h-4  m-0 p-0  font-inherit leading-inherit"
                        />
                        <label className="text-[clamp(14px,1rem,1rem)] lg:pl-[1.625rem] lg:text-[clamp(14px,.875rem,.875rem)] inline-block relative cursor-pointer bg-none pl-6 h-auto text-[rgb(68,68,68)] font-normal  leading-[1.5]">
                          Thông tin người mua hàng giống như trên
                        </label>
                      </div>
                      <div className="mt-[.75rem] border-t-[1px] border-t-[#44444426] pt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
                        <div className="mt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
                          <label
                            htmlFor=""
                            className="block relative pl-[2rem]"
                          >
                            <input
                              type="radio"
                              name=""
                              id=""
                              className="absolute top-[0.25rem] left-0 text-[clamp(14px,1rem,1rem)] border-transparent bg-current bg-no-repeat bg-[length:100%_100%] bg-center text-[rgb(134,3,21)] rounded-full inline-block shrink-0 align-middle appearance-none border  p-0 w-4 h-4 select-none m-0  font-inherit leading-inherit "
                            />
                            {"Them dia chi moi"}
                          </label>
                        </div>
                        <div className="mt-[.75rem]">
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Họ và tên ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                name="fullName"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                                placeholder="Nhập họ và tên"
                              />
                            </div>
                          </div>
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Điện thoại ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <input
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                                placeholder="Nhập số điện thoại"
                              />
                            </div>
                          </div>
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Tỉnh/Thành Phố ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <select
                                value={formData.province}
                                onChange={handleChange}
                                name="province"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                              >
                                <option value="">Chọn tỉnh/thành phố</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                <option value="Hà Nội">Hà Nội</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Quận/Huyện ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <select
                                value={formData.district}
                                onChange={handleChange}
                                name="district"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                              >
                                <option value="">Chọn Quận/Huyện</option>
                                <option value="Hồ Chí Minh">Quận 12</option>
                                <option value="Hà Nội">Quận Gò Vấp</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Địa chỉ ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <input
                                value={formData.streetAddress}
                              
                                onChange={handleChange}
                                type="text"
                                name="streetAddress"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                                placeholder="VD: Đường số 1, Phường 1, Quận 1"
                              />
                            </div>
                          </div>
                          <div className="flex mb-[1.25rem] ">
                            <label
                              htmlFor=""
                              className="p-[8px_10px_8px_0] w-[130px] block  text-[rgb(68,68,68)] font-normal text-[clamp(14px,1rem,1rem)] leading-[1.5]"
                            >
                              {"Email ("}
                              <span className="text-[rgb(245,45,5)]">*</span>
                              {")"}
                            </label>
                            <div className="w-full max-w-[calc(100%-130px)] xl:text-[clamp(14px,1rem,1rem)]">
                              <input
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                type="text"
                                className="h-[2.75rem] text-[clamp(14px,1rem,1rem)] relative border border-solid border-[rgb(68,68,68)] rounded-md bg-inherit p-[0.25rem_2.5rem_0.25rem_1rem] w-full  font-normal appearance-none text-base leading-[1.5rem] m-0  text-inherit font-inherit  leading-inherit"
                                placeholder="VD: hathucminh456@gmail"
                              />
                              <div className="text-[clamp(14px,.75rem,.75rem)] text-[rgb(68,68,68)] italic font-normal ">
                                {
                                  "(Để nhận thông tin về hóa đơn điện tử cũng như theo dõi về lịch trình giao hàng.)"
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
