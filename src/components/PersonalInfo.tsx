import React, { useState } from "react";
import { InfoTitle } from "./InfoTitle";
import { SelectBox } from "./SelectBox ";
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const PersonalInfo: React.FC = () => {
  const [gender, setGender] = useState<string>("");

  const handleSelect = (value: string) => {
    setGender((prev) => (prev == value ? "" : value));
  };

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const style = true;

  return (
    <section>
      <InfoTitle title="Thông tin cá nhân" />
      <div>
        <div className="mb-[1.5rem] bg-white shadow lg:rounded-[.9375rem] lg:pt-7 lg:pb-7 lg:px-6">
          <div>
            <form action="">
              <div className="flex gap-[3rem] relative mt-[1.25rem] box-border">
                <div className="flex flex-grow flex-shrink basis-0 flex-wrap gap-[2.5rem] flex-col">
                  <div className="flex-grow flex-shrink basis-0 w-[50%] flex items-center gap-[12px] box-border">
                    <label
                      htmlFor=""
                      className="w-[6.25rem] min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap block  font-normal  box-border"
                    >
                      Họ tên
                    </label>
                    <input
                      type="text"
                      className="rounded-md pr-[1rem] pl-4 h-[2.75rem] flex-grow flex-shrink basis-0 border border-[#44444426] relative border-solid  pt-[0.25rem]  pb-[0.25rem]  w-full  text-[#444] font-normal text-[14px] leading-6 box-border "
                    />
                  </div>
                  <div className="flex-grow flex-shrink basis-0 w-[50%] flex items-center gap-[12px] box-border">
                    <label
                      htmlFor=""
                      className="w-[6.25rem] min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap block  font-normal  box-border"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="rounded-md pr-[1rem] pl-4 h-[2.75rem] flex-grow flex-shrink basis-0 border border-[#44444426] relative border-solid  pt-[0.25rem]  pb-[0.25rem]  w-full  text-[#444] font-normal text-[14px] leading-6 box-border "
                    />
                  </div>
                  <div className="flex-grow flex-shrink basis-0 w-[50%] flex items-center gap-[12px] box-border">
                    <label
                      htmlFor=""
                      className="w-[6.25rem] min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap block  font-normal  box-border"
                    >
                      Giới tính
                    </label>
                    <ul className="gap-[1.875rem] flex items-center m-0 p-0 list-none box-border">
                      <li>
                        <input
                          type="radio"
                          id="gender-male"
                          name="gender"
                          hidden
                          value="Nam"
                          checked={gender === "Nam"}
                          onChange={() => handleSelect("Nam")}
                          className="peer"
                        />
                        <label
                          htmlFor="gender-male"
                          className="min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap relative pl-[30px]
      before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:z-[1] before:content-[''] before:rounded-full before:w-[14px] before:h-[14px] before:border before:border-[#444]
      after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:z-[1] after:opacity-0 after:content-[''] after:rounded-full after:w-[10px] after:h-[10px] after:bg-[#860315]
      peer-checked:after:opacity-100"
                        >
                          Nam
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="gender-female"
                          name="gender"
                          hidden
                          value="Nữ"
                          checked={gender === "Nữ"}
                          onChange={() => handleSelect("Nữ")}
                          className="peer"
                        />
                        <label
                          htmlFor="gender-female"
                          className="min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap relative pl-[30px]
      before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:z-[1] before:content-[''] before:rounded-full before:w-[14px] before:h-[14px] before:border before:border-[#444]
      after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:z-[1] after:opacity-0 after:content-[''] after:rounded-full after:w-[10px] after:h-[10px] after:bg-[#860315]
      peer-checked:after:opacity-100"
                        >
                          Nữ
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-grow flex-shrink basis-0 w-[50%] flex items-center gap-[12px] box-border">
                    <label
                      htmlFor=""
                      className="w-[6.25rem] min-w-[6.25rem] text-[clamp(14px,1rem,1rem)] leading-[1.7] text-black whitespace-nowrap block  font-normal  box-border"
                    >
                      Ngày sinh
                    </label>
                    <div className="flex gap-[.5rem] ">
                      <SelectBox
                        options={days}
                        placeholder="Ngày"
                        value={day}
                        onChange={setDay}
                      />
                      <SelectBox
                        options={months}
                        placeholder="Tháng"
                        value={month}
                        onChange={setMonth}
                        style={style}
                      />
                      <SelectBox
                        options={years}
                        placeholder="Năm"
                        value={year}
                        onChange={setYear}
                      />
                    </div>
                  </div>
                  <div className=" mt-0 flex-grow flex-shrink basis-0 w-[50%] flex items-center gap-[12px] box-border">
                    <div>
                      <button
                        type="submit"
                        className="pr-9 pl-9 h-[3.25rem] rounded-full cursor-pointer bg-[#444] text-white text-[12px] transition-all duration-200 ease-in-out font-medium text-center block"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
