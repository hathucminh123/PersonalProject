import { useQuery } from "@tanstack/react-query";
import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { GetProductByIdService } from "../Services/ProductService/GetProductServiceById";
import { GetFavoriteProducts } from "../Services/FavoriteProductsService/GetFavoriteProducts";

interface FavoriteModalProps {
  handleclose: () => void;
  productId: string | null | undefined;
}

export const FavoriteModal: React.FC<FavoriteModalProps> = ({
  handleclose,
  productId,
}) => {
  const modalRoot = document.getElementById("FavoriteModal");
  const useId = localStorage.getItem("userId") || null;
  const { data: favoriteProducts } = useQuery({
    queryKey: ["FavoriteProducts", useId],
    queryFn: ({ signal }) => GetFavoriteProducts({ userId: useId, signal }),
    enabled: !!useId,
  });
  const favoriteProductsdata = favoriteProducts?.Products || [];

  const isProductInFavorites = favoriteProductsdata.some(
    (product) => product.id === productId
  );
  const { data: Product } = useQuery({
    queryKey: ["Product-details", productId],
    queryFn: ({ signal }) =>
      GetProductByIdService({ id: productId, signal: signal }),
    enabled: !!productId,
  });
  const productdata = Product?.Product;

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div className="gap-[10px] fixed top-0 left-0 bottom-0 right-0 direction-ltr flex flex-col m-0 p-0 text-[#f8f8f8] overflow-visible z-[1050] origin-top-left text-[100%] overscroll-y-contain bg-[rgba(24,24,27,0.98)]  box-border flex-1 min-h-0  overflow-y-visible overflow-x-clip">
      <div className="relative box-border flex-1 min-h-0 z-10 overflow-y-visible overflow-x-clip">
        <div className="w-full h-full">
          <div className="transform [transform:matrix(1,0,0,1,0,0)] flex mx-auto h-full">
            <div className=" pt-[40px] flex-none relative flex flex-col items-center w-full h-full p-[4px] overflow-auto overscroll-contain transform translate-3d backface-hidden before:translate-x-0 before:translate-y-0 before:translate-z-0 after:translate-x-0 after:translate-y-0 after:translate-z-0 after:backface-hidden after:opacity-100 after:scale-[1] before:backface-hidden before:opacity-100 before:scale-[1] transition-transform duration-[400ms] ease-in-out">
              <div className="block max-w-[1272px] p-0 w-full self-center relative m-0 text-[#374151] bg-[#fff] cursor-default border-0 z-[20] "></div>
              <div className="p-[1.25rem] bg-[rgb(255,255,255)] w-full overflow-hidden">
                <div>
                  <div className="mb-[16]">
                    <h4 className="opacity-100 text-[rgb(68,68,68)] font-normal text-[24px] leading-[1.3]">
                      {isProductInFavorites ? (
                        <span className="text-[rgb(0,0,0)] font-bold text-[24px] leading-[1.3]">
                          Sản phẩm đã có trong danh sách yêu thích
                        </span>
                      ) : (
                        <span className="text-[rgb(0,0,0)] font-bold text-[24px] leading-[1.3]">
                          Sản phẩm đã được thêm vào danh sách yêu thích
                        </span>
                      )}
                    </h4>
                    <div>
                      <div className="flex flex-wrap mr-[-10px] mf-[-10px]">
                        <div className="w-[33.333333%] pl-[-10px] pr-[-10px]">
                          <img
                            className="inline max-w-full h-auto align-middle"
                            src={productdata?.imageUrl}
                            alt={productdata?.name}
                            width="100%"
                          />
                        </div>
                        <div className="w-[66.666667%] pl-[10px] pr-[10px]">
                          <h4 className="text-black text-[clamp(1.125rem, 2vw, 1.5rem)] font-bold m-0">
                            {productdata?.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link
                        to="/CompareProduct"
                        className="text-[rgb(0,0,0)] text-[16px] font-normal leading-[1.5] cursor-pointer hover:text-[rgb(0,0,0)]"
                      >
                        Xem tất cả sản phẩm yêu thích
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="cursor-pointer text-white absolute top-[0px] z-[40] right-0 opacity-75 w-[34px] h-[34px] rounded-[4px] border-0 bg-transparent hover:bg-transparent active:bg-transparent pointer-events-auto"
                onClick={handleclose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[22px] h-[22px]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
