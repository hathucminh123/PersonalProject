import React from "react";
import { createPortal } from "react-dom";
import { ProductCompare } from "./ProductCompare";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProductCompare } from "../Services/CompareService/GetProductCompare";
import { GetProductCompareProduct } from "../Services/CompareService/GetProductCompareProduct";
// import { queryClient } from "../Services/MainService";

interface CompareModalProps {
  // isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  onClose,
  userId,
}) => {
  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["Compare-Products", userId],
    queryFn: ({ signal }) =>
    GetProductCompare({ signal: signal, userId: userId }),
    enabled: !!userId,
    staleTime: 0,
  });

  const compareProducts = data?.Products;
  console.log("okchua7", compareProducts);

  const navigate = useNavigate();

  const { mutateAsync, isPending: loadingCompare } = useMutation({
    mutationFn: GetProductCompareProduct,
    onSuccess: (data) => {
      console.log("Get Product Compare successfully");
      // queryClient.invalidateQueries({
      //   queryKey: ["Compare-Products", userId],
      //   refetchType: "active",
      // });
      navigate("/CompareProduct", { replace: true, state: { data: data ,userId:userId } });
    },
    onError: (error) => {
      alert( error.name + ": " + error.message);
      console.error("Get Product Compare request failedokok:", error);
    },
  });

  const handlecompare = async () => {
    await mutateAsync({ userId: userId, signal: new AbortController().signal });
  };

  const modalRoot = document.getElementById("CompareModal");

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div className="bg-[rgba(24,24,27,0.98)] fixed inset-0 ltr flex flex-col box-border m-0 p-0 text-[#f8f8f8] overflow-visible outline-none origin-top-left overscroll-contain z-9999">
      <div
        className="fixed inset-0 -z-10 opacity-100 will-change-opacity"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>
      <div className="w-full h-full">
        <div className="flex h-full transform-none">
          <div
            className="pt-[40px] relative flex flex-col items-center w-full h-full p-1 overflow-auto overscroll-contain [transform:translate3d(0,0,0)] [backface-visibility:hidden] :before:content-[''] :before:absolute :before:inset-0 :before:z-[-1] :before:bg-[rgba(24,24,27,0.98)] :before:opacity-100  after:content-[''] after:border-0 after:border-solid after:border-[#e5e7eb]"
            style={{ backgroundColor: "rgba(24,24,27,0.98)" }}
          >
            <div className="max-w-[1272px] block bg-initial p-0 w-full self-center flex-col relative m-0 cursor-default rounded-none z-20 text-[var(--fancybox-content-color,#374151)] bg-[var(--fancybox-content-bg,#fff)]">
              <div className="w-full overflow-hidden p-10 bg-white lg:p-10 lg:rounded-[0.9375rem] shadow-[6px_0_39.7681px_#0000000d]">
                <div>
                  <div className="mb-[1.5rem]">
                    <h4 className="text-[rgb(68_68_68/1)]  leading-[1.3] font-[var(--font-style-secondary)] lg:text-[clamp(14px,2rem,2rem)]">
                      chỉ được so sánh 4 sản phẩm
                    </h4>
                  </div>
                  <div>
                    <div className="grid gap-2 md:grid-cols-5">
                      {isLoading ? (
                        <div className="col-span-5 flex justify-center items-center py-10">
                          <span className="text-gray-500">
                            Đang tải sản phẩm...
                          </span>
                          {/* Hoặc spinner nếu bạn có */}
                        </div>
                      ) : (
                        compareProducts?.map((product) => (
                          <ProductCompare
                          refetch={refetch}
                            key={product.id}
                            product={product}
                            userId={userId}
                          />
                        ))
                      )}
                    </div>
                    <div className="flex flex-wrap gap-[10px] justify-center mt-[1.25rem]">
                      <Link
                        to={"#"}
                        onClick={onClose}
                        className="flex items-center gap-2 transition-all duration-200 ease-in-out px-4 h-[36px] font-medium text-[12px] text-white bg-[rgb(68_68_68/1)] border border-[rgb(68_68_68/1)] rounded-full"
                      >
                        Đóng
                      </Link>
                      <Link
                        to={"#"}
                        onClick={handlecompare}
                        aria-disabled={loadingCompare}
                        className={`flex items-center gap-2 transition-all duration-200 ease-in-out px-4 h-[36px] font-medium text-[12px] text-white rounded-full 
    ${
      loadingCompare
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#860315e6] border-[#860315e6]"
    }
  `}
                      >
                        {loadingCompare ? "Đang so sánh..." : "So sánh"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="flex justify-center items-center p-0 w-[34px] h-[34px] rounded-[4px] bg-transparent text-white absolute top-[-38px] right-0 opacity-75 z-40 cursor-pointer transition"
                aria-label="Đóng"
                type="button"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[22px] h-[22px] stroke-[2] text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
