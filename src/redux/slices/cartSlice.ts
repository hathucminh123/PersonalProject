// redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// ─── Type Definitions ────────────────────────────────────────────────
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

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// ─── Initial State ───────────────────────────────────────────────────
const initialState: CartState = {
  items: [],
};

// ─── Slice Definition ────────────────────────────────────────────────
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    // Tăng số lượng
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // Giảm số lượng (xóa nếu về 0)
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload
          );
        }
      }
    },

    // Xóa sản phẩm khỏi giỏ
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// ─── Selectors ───────────────────────────────────────────────────────
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.finalPrice * item.quantity,
    0
  );

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectCartDiscount = (state: RootState) =>
  state.cart.items.reduce(
    (discount, item) =>
      discount + item.product.discountAmount * item.quantity,
    0
  );

export const selectCartOriginalTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );

// ─── Exports ─────────────────────────────────────────────────────────
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
