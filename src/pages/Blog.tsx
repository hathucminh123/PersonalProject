import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GetBlogCatgories } from "../Services/BlogCategories/GetBlogCatgories";
interface blogPosts{
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string; // ISO date string
  blogSubCategoryId: number;
  blogSubCategoryName: string;
}

interface subCategories{
  id:string,
  name:string,
  slug:string,
  blogCategoryId:number,
  blogCategoryName:string,
  blogPosts:blogPosts[]
}

interface BlogCategories {
    id:number,
    name:string,
    slug:string,
    subCategories:subCategories[]
}

export const Blog: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["BlogCategories"],
    queryFn: ({ signal }) => GetBlogCatgories({ signal }),
  });

  const categories = data?.BlogCategories as BlogCategories[] || [];

  const tabs = [
    {
      name: "Tất cả",
      path: "/blog",
      count: categories.reduce((total: number, category) =>
        total + category.subCategories?.reduce((sum: number, sub) => sum + (sub.blogPosts?.length || 0), 0), 0
      ),
    },
    ...categories.map((category) => ({
      name: category.name,
      path: `/blog/${category.slug}/${category.id}`, // cần router khớp
      count: category.subCategories?.reduce(
        (sum: number, sub) => sum + (sub.blogPosts?.length || 0),
        0
      ),
    })),
  ];

  return (
    <main>
      <section className="pt-[2rem] pb-[3.75rem]">
        <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
          <nav className="overflow-hidden">
            <ul className="flex items-center border-b border-b-[#44444426] overflow-x-auto overflow-y-hidden xl:gap-[5rem]">
              {tabs.map((tab, index) => (
                <li key={index} className="w-max">
                  <NavLink
                    to={tab.path}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "block relative pt-[14px] pr-[12px] pb-[14px] text-center whitespace-nowrap text-red-600 font-medium underline"
                        : "block relative pt-[14px] pr-[12px] pb-[14px] text-center whitespace-nowrap text-gray-500"
                    }
                  >
                    <div
                      className={`absolute bottom-[1px] left-1/2 transform -translate-x-1/2 z-10 w-0 h-[2px] pointer-events-none 
                      ${tab.path === window.location.pathname ? "bg-red-600" : "bg-transparent"}`}
                    ></div>
                    <span>{tab.name}</span>
                    <span
                      className={`text-[12px] absolute top-0 right-[10px] font-semibold 
                      ${tab.path === window.location.pathname ? "text-red-600" : "text-gray-400"}`}
                    >
                      {tab.count}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <Outlet />
    </main>
  );
};
