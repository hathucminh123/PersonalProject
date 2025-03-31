import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { GetAllCartByUserId } from "../Services/CartService/GetAllCartByUserId";





const RootPage: React.FC = () => {
  const userId = localStorage.getItem("userId") || "0";
  console.log("nguoi dung", userId);  

  const [open, setOpen] = useState<boolean>(false);


 const {data }= useQuery({
    queryKey: ["Cart",userId],
    queryFn: ({signal}) => GetAllCartByUserId({signal:signal , userId:userId}), // Fetch cart data by userId),
   
      
    enabled: !!userId, // Only run the query if userId is available
    },
  );

const cartData = data?.Carts || []; // Default to an empty array if data is undefined 





  return (
    <>
      <HeaderComponent open={open} setOpen={setOpen} data={cartData}  />
      <main className="pt-[90px] block">
        <Outlet 
        context={{ open, setOpen }} // Pass the state and setter function to the Outlet
        />
      </main>
    </>
  );
};

export default RootPage;
