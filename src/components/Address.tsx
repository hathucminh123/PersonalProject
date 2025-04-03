import React from "react";
import { InfoTitle } from "./InfoTitle";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAdressByUserId } from "../Services/AddressService/GetAdressByUserId";
import { DeleteAddressByuser } from "../Services/AddressService/DeleteAddressByuser";
import { queryClient } from "../Services/MainService";

export const Address: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const { data } = useQuery({
    queryKey: ["Address-userId", userId],
    queryFn: ({ signal }) => GetAdressByUserId({ id: userId, signal: signal }),
    enabled: !!userId,
  });

  console.log("userdata", data);

  const addressesData = data?.Address;

  const { mutate } = useMutation({
    mutationFn: DeleteAddressByuser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Address-userId", userId],

        refetchType: "active",
      });
    },
    onError: (error) => {
      console.log("Delete Address failed", error);
    },
  });

  const handleDelete = (id: string) => {
    mutate({AddressId:id  ,userId:userId})

  };

  return (
    <section>
      <InfoTitle title="Sổ địa chỉ" appear={true} />
      <div>
        <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
          <h2 className="text-black font-medium leading-[1.7] lg:mb-5 lg:text-[clamp(14px,1.125rem,1.125rem)]">
            Địa chỉ của tôi
          </h2>
          <div>
            {addressesData?.length &&
              addressesData.map((item) => {
                return (
                  <div className="flex lg:flex-row lg:justify-between lg:gap-5 pb-5">
                    <div>
                      <h2 className="flex items-center text-[#444] font-normal lg:text-[clamp(14px,1rem,1rem)] lg:leading-[1.7]">
                        <span>{item.fullName}</span>
                        {", "}
                        <span>{item.phone}</span>
                      </h2>
                      <p className="text-[#444] font-normal lg:mt-2 lg:text-[clamp(14px,1rem,1rem)] lg:leading-[1.7]">
                        {item.streetAddress}
                      </p>
                      <div className="flex flex-wrap items-center gap-[1rem] mt-[.5rem]">
                        <Link
                          to="#"
                          className="rounded-none bg-none p-0 text-[#444] font-normal underline lg:text-[clamp(14px,0.875rem,0.875rem)] lg:leading-[1.7] transition-all duration-200 ease-in-out"
                        >
                          Chỉnh sửa
                        </Link>
                        <form onSubmit={()=>handleDelete(item.id)} action="" className="inline">
                          <button
                            type="submit"
                            className="cursor-pointer rounded-none bg-none p-0 text-[#444] font-normal underline lg:text-[clamp(14px,0.875rem,0.875rem)] lg:leading-[1.7] transition-all duration-200 ease-in-out"
                            // onClick={() => handleDelete(item.id)}
                          >
                            Xóa
                          </button>
                        </form>
                      </div>
                    </div>
                    <form action="" className="inline">
                      <div className="flex">
                        <button
                          type="button"
                          className=" flex items-center gap-2 pl-3 pr-3 py-3 h-10 text-[clamp(14px,0.875rem,0.875rem)] text-white font-medium bg-[#860315e6] border border-[#860315e6] rounded-full cursor-pointer transition-all duration-200 ease-in-out"
                        >
                          Đặt làm đỉa chỉ mặc định
                        </button>
                      </div>
                    </form>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
