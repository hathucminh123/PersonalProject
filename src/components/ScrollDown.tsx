import React from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
  isBestSeller: boolean;
  stock: number;
  tags: string;
  imageUrl: string;
  createdAt: string;
  subCategoryId: string;
  subCategory: SubCategory;
  subCategoryName: string;
  skinEffect: string;
  activeIngredients: string;
  expShelfLife: number;
  paoShelfLife: number;
  skinType: string;
  benefits: string;
  ingredients: string;
  mainBenefits: string;
  skinConcerns: string;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  categoryId: string;
  categoryName: string | null;
  productCount: number;
  createdAt: string;
}

interface Props {
  showScrollDown: boolean;
  productdata: Product | undefined;
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
  // handleAddToCart:()=>void;
  totalPrice: number | null;
  originalTotal: number | null;
  savedAmount: number | null;
  handleAddToCart: () => void;
}

const ScrollDown: React.FC<Props> = ({
  showScrollDown,
  productdata,
  quantity,
  handleDecrease,
  handleIncrease,
  totalPrice,
  originalTotal,
  savedAmount,
  handleAddToCart,
}) => {
  return (
    // <div
    //   className={`fixed left-0 top-0 w-full bg-white shadow-md transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 pointer-events-none z-[1000] md:opacity-100 md:pointer-events-auto md:pt-[0.25rem] md:pb-[0.25rem] md:block hidden group-hover:opacity-100 group-hover:pointer-events-auto ${
    //     showScrollDown
    //       ? "translate-y-10 opacity-100"
    //       : "-translate-y-20 opacity-0"
    //   }`}
    //     style={{ transform: "translateZ(0)" }}
    // >

    <div
      className={`fixed left-0 top-0 w-full bg-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1000] md:pt-[0.25rem] md:pb-[0.25rem] md:block hidden 
    ${
      showScrollDown
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0"
    }`}
    >
      <div className="mx-auto w-full max-w-[95vw] sm:max-w-[400px] md:max-w-[576px] lg:max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1200px] px-[0.78125rem]">
        <div className="flex justify-between items-center gap-[1.25rem]">
          <div className="flex gap-[.5rem]">
            <div className="flex flex-row    relative gap-2.5 p-[5px] h-full overflow-hidden bg-white shadow-md rounded-[3px] md:rounded-[0.25rem] md:p-[10px]">
              <div className="w-[5rem] h-[5rem] relative">
                <div className="flex items-center relative h-0 overflow-hidden pt-[100%]">
                  <img
                    // src="https://cdn.happyskin.vn/media/54/may-rua-mat-emmie-premium-facial-cleansing-brush-sonic-extra-dat-chung-nhan-fda.jpg"
                    // alt="hinh"
                    src={productdata?.imageUrl}
                    alt={productdata?.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] max-w-[100%] max-h-[100%]"
                  />
                </div>
              </div>
              <div className="mt-0 w-[220px] flex flex-col justify-between h-full text-left">
                <h3 className="text-[12px] leading-[1.5] text-gray-700 font-normal overflow-hidden line-clamp-2 h-[36px] [-webkit-box-orient:vertical] flex [-webkit-line-clamp:2]">
                  {productdata?.name}
                </h3>
              </div>
            </div>
          </div>
          <form className="flex justify-end gap-[.5rem]">
            <div className="pr-[1rem] relative flex-col items-start gap-[.5rem] flex ">
              <div
                style={{
                  content: "''",
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translateY(-50%)",
                  width: "1px",
                  height: "36px",
                  backgroundColor: "#44444426",
                  pointerEvents: "none",
                }}
              />
              <p className="text-[12px] text-left w-[7.75rem] block pr-[.5rem] leading-[1.6] font-medium text-[rgb(130,130,130)] md:text-[clamp(14px,1rem,1rem)] md:leading-[1.7]">
                số lượng
              </p>
              <div className="flex flex-nowrap justify-between gap-0 w-[108px] h-[36px] items-center text-[clamp(14px,1rem,1rem)] font-normal overflow-hidden text-center bg-[rgb(246,246,246)] rounded-full">
                <span
                  className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[39px] min-w-[39px] h-[36px] text-gray-700 font-medium text-[16px] leading-[1.7] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:right-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none"
                  onClick={handleDecrease}
                >
                  -
                </span>
                <input
                  className="w-[30px] h-[36px] border border-transparent px-[5px] text-gray-700 font-medium text-[16px] leading-[1.7] text-center lg:text-[1rem] lg:leading-[1.7]"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <span
                  className="flex items-center justify-center  transition-all duration-200 ease-in-out cursor-pointer w-[39px] min-w-[39px] h-[36] text-gray-700 font-medium text-[16px] leading-[1.7] lg:text-[1rem] lg:leading-[1.7] relative before:absolute before:top-1/2  before:left-0 before:-translate-y-1/2 before:bg-[#5656561a] before:w-[1px] before:h-[11px] before:pointer-events-none"
                  onClick={handleIncrease}
                >
                  +
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[0.25rem] gap-y-0  m-0 mt-[1.25rem] text-[clamp(14px,1rem,1rem)]">
              <div className="flex text-center text-[clamp(14px,1rem,1rem)]">
                <span className="w-[75px] pr-[1rem] font-normal text-[12px] text-[rgb(68,68,68)]">
                  Tổng cộng
                </span>
                <span className="pr-[6px] text-[rgb(68,68,68)] font-extrabold text-[14px]">
                  {totalPrice?.toLocaleString()}đ
                </span>
                <span className="pr-[6px] text-[rgb(85,85,85)] font-medium text-[13px] line-through">
                  {originalTotal?.toLocaleString()}đ
                </span>
                <span className="rounded-[5px] bg-[#8603151a] px-[6px] h-[19px] text-[rgb(134,3,21)] font-medium text-[12px]">
                  {productdata?.discountPercentage}%
                </span>
              </div>
              <div className="col-start-1 row-start-2 flex items-center text-[clamp(14px,1rem,1rem)]">
                <span className="w-[75px] pr-[1rem] font-normal text-[12px] text-[rgb(68,68,68)]">
                  Tiết kiệm
                </span>
                <span className="pr-[6px] text-[rgb(85,85,85)] font-medium text-[14px]">
                  {savedAmount?.toLocaleString()}đ
                </span>
              </div>
              <div className="col-span-2 row-span-2 row-start-1 col-start-2 items-center flex flex-nowrap gap-[0.5rem] md:gap-[0.625rem] md:flex-wrap  text-[clamp(14px,1rem,1rem)]">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="cursor-pointer flex items-center gap-[0.5rem] px-[25px] h-[36px] text-[14px] whitespace-nowrap transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] border border-[#860315e6] bg-[#860315e6] text-white rounded-full font-inherit  leading-inherit tracking-inherit p-0 m-0"
                 
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ScrollDown;
