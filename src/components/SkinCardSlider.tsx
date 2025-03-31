import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SkinCard from "./SkinCard";
import type { Swiper as SwiperInstance } from "swiper";
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
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement |null >;
  productsdata:Product[];

}

const SkinCardSlider: React.FC<Props> = ({ prevRef, nextRef,productsdata }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;

    // Debugging
    console.log("Swiper instance:", swiperInstance);
    console.log("prevRef.current:", prevRef.current);
    console.log("nextRef.current:", nextRef.current);

    // Kiểm tra nếu navigation tồn tại và có kiểu NavigationOptions
    if (swiperInstance.params.navigation && typeof swiperInstance.params.navigation !== "boolean") {
      const navigation = swiperInstance.params.navigation ; // Ép kiểu về NavigationOptions
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      if (swiperInstance.navigation) {
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
        console.log("Navigation initialized and updated.");
      } else {
        console.warn("Swiper navigation is undefined!");
      }
    } else {
      console.warn("Swiper navigation params are not valid!");
    }
  }, [swiperInstance, prevRef, nextRef]);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={5}
        loop={false}
        rewind={true}
        centeredSlides={false}
        onSwiper={setSwiperInstance} // Lưu Swiper instance
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        navigation={false} // Không truyền prevEl và nextEl trực tiếp
      >
        {productsdata.map((product) => (
          <SwiperSlide key={product.id}>
            <SkinCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkinCardSlider;
