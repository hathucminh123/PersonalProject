import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const MenuItem = ({
  label,
  children,
}: {
  // open: boolean;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  children?: React.ReactNode;
}) => (
  <li className=" group h-full">
    <a
      href="#"
      className="hover:text-[#D95D59] transition-colors duration-300 py-4 block"
    >
      {label}
    </a>
    {children && (
      <div className="absolute left-0 top-full w-screen bg-white shadow-lg rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 transform translate-y-2">
        {children}
      </div>
    )}
  </li>
);

const IconButton = ({
  icon,
  badge,
}: {
  icon: React.ReactNode;
  badge?: number;
}) => {
  // const [open, setOpen] = useState(false);

  // const togglePopup = () => setOpen((prev) => !prev);

  return (
    // <div className="relative">
    <div className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
      {icon}
      {badge && (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>

    // </div>
  );
};

const SearchBar = () => (
  <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#D95D59] transition w-48">
    <SearchIcon className="text-gray-400" />
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm"
      className="bg-transparent outline-none pl-2 text-sm text-gray-700 placeholder-gray-400 w-full"
    />
  </div>
);

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

interface Cart {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product; // Include the Product type here
}

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Cart[]; // Replace 'any' with the actual type of your cart data
}
const HeaderComponent: React.FC<props> = ({ open, setOpen, data }) => {
  const location = useLocation();

  const handleSavePath = () => {
    localStorage.setItem("redirectPath", location.pathname);
  };

  const togglePopup = () => setOpen((prev) => !prev);

  const originalTotalPrice = data.reduce(
    (acc, item) => acc + item.quantity * item.product.originalPrice,
    0
  );
  const finalTotalPrice = data.reduce(
    (acc, item) => acc + item.quantity * item.product.finalPrice,
    0
  );
  const discountTotal = originalTotalPrice - finalTotalPrice;

const navigate =useNavigate()

  const handleNavigate = () => {  
    navigate("/checkout")
    setOpen(false)
  };

  return (
    <header className="flex justify-between items-stretch px-6 bg-white border-b shadow-md fixed top-0 w-full z-[1000] font-[Poppins]">
      <Link
        to={"/"}
        className="flex items-center space-x-1 text-5xl font-extrabold tracking-wide pt-2 pb-2 cursor-pointer"
      >
        <span className="text-gray-700">happy</span>
        <span className="text-[#D95D59]">Skin</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8">
          <MenuItem label="SkinStore">
            <div>
              <div className="flex items-center space-x-3 mb-3 border-b pb-3">
                <img
                  src="https://cdn.shopify.com/s/files/1/0454/4568/7866/files/1_180x180.jpg?v=1618948843"
                  alt="SkinCare"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">SkinCare</h3>
                  <p className="text-sm text-gray-500">Chăm sóc da</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Dưỡng da", "Chống nắng", "Tẩy tế bào chết", "Mặt nạ", "Mắt", "Môi"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-600 hover:text-[#D95D59] transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </MenuItem>
          {["Blog làm đẹp", "Từ điển về da", "Testimonial", "Deal Hời"].map((item) => (
            <MenuItem key={item} label={item} />
          ))}
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div onClick={togglePopup}>
            <IconButton icon={<MailOutlineIcon className="text-gray-700 text-[24px]" />} badge={data.length} />
          </div>

          <div
            className={`
              absolute top-[calc(100%+1.66667rem)] mt-2 right-0 z-[997] bottom-auto left-auto
              rounded-[.9375rem] bg-white pt-[.5rem] p-5 w-max max-w-[32rem] h-max 
              transition-all duration-300 ease-in-out border border-[#e5e7eb] 
              text-base box-border shadow-lg
              ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
            `}
          >
            <div className="pb-2 flex justify-end">
              <div className="cursor-pointer" onClick={togglePopup}>
                <CloseIcon />
              </div>
            </div>
            <div className="min-h-[44px]">
              <ul className="max-h-[30vh] pr-[.7rem] overflow-x-hidden overflow-y-auto m-0 p-0 list-none">
                <p className="mb-2 border border-dashed border-red-700 rounded p-2">
                  Đơn hàng từ 300k bất kỳ tặng 1 Mini Size Ceuticoz. Đơn từ 500k tặng 1 Body Silicone Bath Brush 177k. Đơn từ 1 triệu tặng 1 áo thun BST VN Coolmate trị giá 350k
                </p>

                {data.length === 0 ? (
                  <>
                    <p>Không có sản phẩm trong giỏ hàng</p>
                  </>
                ) : (
                  data.map((item) => {
                    const originalTotal = item.quantity * item.product.originalPrice;
                    const finalTotal = item.quantity * item.product.finalPrice;
                    const discount = originalTotal - finalTotal;

                    return (
                      <li key={item.product.id} className="gap-[1.25rem] flex items-center box-border">
                        <Link
                          to={"#"}
                          className="flex items-center justify-center border border-[rgb(215,82,82)] rounded-full w-[20px] h-[20px] text-[rgb(215,82,82)] transition-all duration-200 ease-in-out"
                        >
                          <CloseIcon />
                        </Link>
                        <div className="flex justify-center items-center border border-[#860315] rounded-[5px] bg-white w-[75px] h-[75px]">
                          <Link to={""} className="flex justify-center items-center w-full h-full transition-all duration-200 ease-in-out">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-contain inline max-w-full"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-2 overflow-hidden text-[rgb(68,68,68)] font-semibold text-[14px] leading-[1.5]">
                            <Link to="" className="transition-all duration-200 ease-in-out">
                              {item.product.name}
                            </Link>
                          </p>
                          <p className="flex gap-x-[0.5rem] gap-y-[0.25rem] flex-wrap justify-between items-center">
                            <span>
                              {item.quantity} x{" "}
                              <span className="text-[rgb(68,68,68)] font-semibold">
                                {item.product.originalPrice.toLocaleString()} ₫
                              </span>
                            </span>
                            <span className="text-[rgb(134,3,21)] font-semibold">
                              {finalTotal.toLocaleString()} ₫
                            </span>
                          </p>
                          {discount > 0 && (
                            <p className="flex justify-end mt-[4px] text-[rgb(130,130,130)] text-[12px] m-0">
                              <span>-{discount.toLocaleString()} đ</span>
                              <span className="inline-flex justify-center items-center ml-[4px] rounded-[.25rem] bg-[rgb(134,3,21)] pr-[.25rem] pl-[.25rem] h-[19px] text-white font-medium text-[12px]">
                                {item.product.discountPercentage}%
                              </span>
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              {data.length > 0 && (
                <div className="pt-[.9375rem] mt-[15px] border-t border-dashed border-[rgb(130,130,130)]">
                  <p className="text-[clamp(14px,.875rem,.875rem)] text-right m-0">
                    <span className="text-[rgb(68,68,68)] font-semibold">Tổng cộng: </span>
                    <span className="inline-block min-w-[120px] text-[rgb(68,68,68)] font-semibold">
                      {originalTotalPrice.toLocaleString()} ₫
                    </span>
                  </p>
                  <p className="text-[clamp(14px,.875rem,.875rem)] text-right m-0">
                    <span className="text-[rgb(68,68,68)] font-semibold">Giảm giá: </span>
                    <span className="inline-block min-w-[120px] text-[rgb(68,68,68)] font-semibold">
                      -{discountTotal.toLocaleString()} ₫
                    </span>
                  </p>
                  <p className="text-[clamp(14px,.875rem,.875rem)] text-right m-0">
                    <span className="text-[rgb(68,68,68)] font-semibold">Tổng giá trị: </span>
                    <span className="inline-block min-w-[120px] text-[rgb(134,3,21)] font-semibold">
                      {finalTotalPrice.toLocaleString()} ₫
                    </span>
                  </p>
                  <div className="flex-row justify-center pt-[.9375rem] items-center mt-[15px] border-t border-dashed border-[rgb(130,130,130)] flex flex-wrap gap-[.625rem]">
                    <Link
                      onClick={handleNavigate}
                      to={""}
                      className="border border-[rgb(68,68,68)] bg-[rgb(68,68,68)] text-white rounded-full flex items-center gap-2 justify-center px-[1.5rem] h-[2.75rem] text-[1rem] transition-all duration-200 ease-in-out font-medium w-max text-center"
                    >
                      <span>Xem giỏ hàng và thanh toán</span>
                    </Link>
                    <Link
                      to={""}
                      className="hover:text-[rgb(134,3,21)] gap-[1rem] text-[1rem] flex justify-center items-center font-medium leading-[1.5] transition-all duration-200 ease-in-out box-border border-0 border-solid border-[#e5e7eb] w-max text-center"
                    >
                      Tiếp tục mua hàng
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <SearchBar />
        <div className="group relative">
          <IconButton icon={<AccountCircleIcon className="text-gray-700 text-[24px]" />} />
          <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 transform translate-y-2">
            <div className="flex flex-col">
              <Link
                to={"/login"}
                className="hover:bg-pink-50 transition-colors duration-300 py-4 block cursor-pointer rounded-xl pl-1"
                onClick={handleSavePath}
              >
                Đăng nhập
              </Link>
              <Link
                to={"/register"}
                className="hover:bg-pink-50 transition-colors duration-300 py-4 block cursor-pointer rounded-xl pl-1"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;