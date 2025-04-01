import React from "react";
import { InfoTitle } from "./InfoTitle";
import { Link } from "react-router-dom";

export const FavoriteProducts: React.FC = () => {
  return (
    <section>
      {" "}
      <InfoTitle title="Sản phẩm yêu thích" />
      <div>
        <div>
          <div className="shadow rounded-[.9375rem] pb-[3.125rem] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#8603151a]">
                <tr>
                  <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                    Tên sản phẩm
                  </th>
                  <th className="py-[1.375rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-semibold text-[clamp(14px,_1rem,_1rem)] leading-[1.55] text-left">
                    Giá tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[rgb(255,255,255)]">
                <tr className="border-b border-b-[#44444426]">
                  <td className="align-top py-[1.5rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-normal text-[clamp(14px,_1rem,_1rem)] leading-[1.55]">
                    <div className="max-w-[21.875rem] flex gap-[.875rem]">
                      <div className="flex justify-center w-[3.125rem]">
                        <Link
                          to=""
                          className="transition duration-200 ease-in-out text-inherit decoration-inherit"
                        >
                          <img
                            src="https://cdn.happyskin.vn/media/54/1575-mat-na-duong-am-lam-diu-b5-peptides-biomecare-repair-bio-cellulose-emmie-mask-25g.jpg"
                            alt=""
                            className="w-full max-w-full h-full max-h-full object-contain inline align-middle"
                          />
                        </Link>
                      </div>
                      <div className="lg:flex-1">
                        <h2 className="text-[clamp(1rem,_1rem,_1rem)] leading-[1.5] text-[rgb(68,68,68)] font-extrabold m-0 hover:text-[rgb(134,3,21)]">
                          <Link
                            to="#"
                            className="transition duration-200 ease-in-out text-inherit decoration-inherit"
                          >
                            Mặt Nạ Dưỡng Ẩm Làm Dịu B5 + Peptides Biomecare &
                            Repair Bio-Cellulose Emmié Mask 25g
                          </Link>
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="align-top py-[1.5rem] px-[1.25rem] text-[rgb(68_68_68_/_var(--tw-text-opacity))] font-normal text-[clamp(14px,_1rem,_1rem)] leading-[1.55]">
                    <div>
                      <span className="mr-[.5rem] text-[rgb(134,3,21)] font-bold">
                        249.000đ
                      </span>
                      <span className="text-[clamp(14px,_0.875rem,_0.875rem)] line-through">
                        590000đ
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
