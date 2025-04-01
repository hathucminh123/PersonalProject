type SelectBoxProps = {
    options: number[] |string [];
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    style?:boolean
  };
  
  export const SelectBox: React.FC<SelectBoxProps> = ({
    options,
    placeholder,
    value,
    onChange,
    style
  }) => {
    return (
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`appearance-none bg-none  ${style ? `pr-30`:`pr-10`}  min-w-max rounded-md pl-4 h-[2.75rem] flex-grow flex-shrink basis-0 border border-[#44444426] pt-1 pb-1 w-full text-[#444] font-normal text-[14px] leading-6`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
  
        {/* Mũi tên */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  };
  