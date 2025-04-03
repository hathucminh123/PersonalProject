import { QueryClient } from "@tanstack/react-query";

const baseUrl = "https://localhost:7224/api";

export const queryClient = new QueryClient();

export const apiLinks = {
  Auth: {
    Loginwithgoogle: `${baseUrl}/Auth/signin-google`,
    login: `${baseUrl}/Auth/login`,
    register: `${baseUrl}/Auth/register`,
    confirmEmail: `${baseUrl}/Auth/confirmation`,
  },

  Product: {
    GetProducts: `${baseUrl}/Products`,
    CreateProducts: `${baseUrl}/Products`,
    UpdateProducts: `${baseUrl}/Products`,
    DeleteProducts: `${baseUrl}/Products`,
  },
  Compare: {
    GetCompareList: `${baseUrl}/Compare`,
    GetCompareProduct: `${baseUrl}/Compare/compareProduct`,
    CreateCompare: `${baseUrl}/Compare/add`,
    UpdateCompare: `${baseUrl}/Compare`,
    DeleteCompare: `${baseUrl}/Compare/remove`,
  },
  Cart: {
    GetAllCart: `${baseUrl}/Cart`,
    GetCartbyId: `${baseUrl}/Cart`,
    CreateCart: `${baseUrl}/Cart/add`,
    UpdateCart: `${baseUrl}/Cart`,
    DeleteCart: `${baseUrl}/Cart`,
    DeleteAllCart: `${baseUrl}/Cart`,
  },
  Orders: {
    GetOrder: `${baseUrl}/Orders`,
    CreateOrder: `${baseUrl}/Orders/`,
    GetOrderbyUserId: `${baseUrl}/Orders`,
  },

  Address: {
    POST: `${baseUrl}/Address`,
    PUT: `${baseUrl}/Address`,
    DELETEByUser: `${baseUrl}/Address`,
    GETById: `${baseUrl}/Address`,
    DELETEByAdmin: `${baseUrl}/Address/Admin`,
  },

  User: {
    GETUserById: `${baseUrl}/Users`,
    PUT: `${baseUrl}/Users`,
  },
  Payment: {
    PostPayment: `${baseUrl}/Payment/vnpay/create`,
    

  }
};
