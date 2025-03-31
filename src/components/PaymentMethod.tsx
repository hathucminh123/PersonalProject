// import { useState } from "react";


interface PaymentMethodProps {
    setPaymentMethod: (value: number) => void;
    paymentMethod: number | null;
}

const PaymentMethods:React.FC<PaymentMethodProps> = ({paymentMethod,setPaymentMethod}:PaymentMethodProps) => {
//   const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setPaymentMethod(value);
  };

  return (
    <div className="flex rounded-[.5rem] bg-[rgb(204,204,204)] overflow-hidden">
      {/* Thanh toán khi nhận hàng (COD) */}
      <label className="flex-1 basis-0 cursor-pointer">
        <input
          type="radio"
          name="paymentMethod"
          value={5}
          checked={paymentMethod === 5}
          onChange={() => handleSelect(5)}
          className="hidden"
        />
        <span
          className={`flex flex-col justify-center items-center gap-5 rounded-md py-3 px-5 ${
            paymentMethod === 5 ? "bg-[#444444] text-white" : "bg-[#CCCCCC]"
          }`}
        >
          <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
            <img
              src="https://cdn.happyskin.vn/media/38/thanh-toan-khi-nhan-hang.png"
              alt=""
              className="max-h-full inline max-w-full h-auto align-middle"
            />
          </span>
          <span className="text-sm font-normal">Thanh toán khi nhận hàng</span>
        </span>
      </label>
     
      {/* Thẻ tín dụng */}
      <label className="flex-1 basis-0 cursor-pointer">
        <input
          type="radio"
          name="paymentMethod"
          value={0}
          checked={paymentMethod === 0}
          onChange={() => handleSelect(0)}
          className="hidden"
        />
        <span
          className={`flex flex-col justify-center items-center gap-5 rounded-md py-3 px-5 ${
            paymentMethod === 0 ? "bg-[#444444] text-white" : "bg-[#CCCCCC]"
          }`}
        >
          <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
            <img
              src="https://cdn.happyskin.vn/media/53/2747-thanh-toan-the-tin-dung.png"
              alt=""
              className="max-h-full inline max-w-full h-auto align-middle"
            />
          </span>
          <span className="text-sm font-normal">Thanh toán thẻ tín dụng</span>
        </span>
      </label>

      {/* Chuyển khoản */}
      <label className="flex-1 basis-0 cursor-pointer">
        <input
          type="radio"
          name="paymentMethod"
          value={4}
          checked={paymentMethod === 4}
          onChange={() => handleSelect(4)}
          className="hidden"
        />
        <span
          className={`flex flex-col justify-center items-center gap-5 rounded-md py-3 px-5 ${
            paymentMethod === 4 ? "bg-[#444444] text-white" : "bg-[#CCCCCC]"
          }`}
        >
          <span className="flex justify-center items-center w-[2.5rem] h-[2.5rem]">
            <img
              src="https://cdn.happyskin.vn/media/53/chuyen-khoan-truc-tiep.png"
              alt=""
              className="max-h-full inline max-w-full h-auto align-middle"
            />
          </span>
          <span className="text-sm font-normal">Chuyển khoản trực tiếp</span>
        </span>
      </label>
    </div>
  );
};

export default PaymentMethods;
