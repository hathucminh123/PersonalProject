import React, { useState } from "react";
import { InfoTitle } from "./InfoTitle";
import { SelectBox } from "./SelectBox ";


const provinces = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];
const districts = ["Quận 1", "Quận 2", "Quận 3"];
const wards = ["Phường 1", "Phường 2", "Phường 3"];

export const CreateAddress: React.FC = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section>
      <InfoTitle title="Thêm địa chỉ" />
      <div>
        <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
          <form>
            <div className="flex flex-wrap -mr-7 -ml-7 -mt-7.5 text-sm box-border">
              {/* Tỉnh/Thành phố */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Tỉnh/Thành phố
                  </label>
                  <SelectBox
                    options={provinces}
                    placeholder="Chọn tỉnh/thành"
                    value={province}
                    onChange={setProvince}
                  />
                </div>
              </div>

              {/* Quận/Huyện */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Quận/Huyện
                  </label>
                  <SelectBox
                    options={districts}
                    placeholder="Chọn quận/huyện"
                    value={district}
                    onChange={setDistrict}
                  />
                </div>
              </div>

              {/* Phường/Xã */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Phường/Xã
                  </label>
                  <SelectBox
                    options={wards}
                    placeholder="Chọn phường/xã"
                    value={ward}
                    onChange={setWard}
                  />
                </div>
              </div>

              {/* Địa chỉ */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    placeholder="Số nhà, tên đường..."
                  />
                </div>
              </div>

              {/* Họ tên */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    placeholder="Nhập họ tên"
                  />
                </div>
              </div>

              {/* Điện thoại */}
              <div className="pr-7 pl-7 lg:w-1/2 w-full mt-7.5 text-sm box-border">
                <div className="flex items-center gap-[12px]">
                  <label className="w-[6.25rem] min-w-[6.25rem] text-sm leading-[1.7] whitespace-nowrap block font-normal">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              {/* Nút lưu */}
              <div className="pr-7 pl-7 w-full mt-7.5 text-sm">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gray-800 text-white"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
