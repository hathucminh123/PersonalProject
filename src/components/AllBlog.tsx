import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { GetBlogCatgories } from "../Services/BlogCategories/GetBlogCatgories";

interface blogPosts {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  blogSubCategoryId: number;
  blogSubCategoryName: string;
}

interface subCategories {
  id: string;
  name: string;
  slug: string;
  blogCategoryId: number;
  blogCategoryName: string;
  blogPosts: blogPosts[];
}

interface BlogCategories {
  id: number;
  name: string;
  slug: string;
  subCategories: subCategories[];
}

const getBackgroundByIndex = (index: number) => {
  const backgrounds = [
    "bg-[rgb(255,255,255)]", // trắng
    "bg-[rgb(252,238,239)]", // hồng nhạt
    "bg-[rgb(231,246,255)]", // xanh nhạt
  ];
  return backgrounds[index % backgrounds.length];
};
export const AllBlog: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["BlogCategories"],
    queryFn: ({ signal }) => GetBlogCatgories({ signal }),
  });

  const categories = (data?.BlogCategories as BlogCategories[]) || [];

  return (
    <>
      {categories.map((category, index) => {
        const posts =
          category.subCategories?.flatMap((sub) => sub.blogPosts || []) || [];

        if (posts.length === 0) return null;

        const isReversed = index % 2 === 0;

        return (
          <section
            key={category.id}
            className={`${getBackgroundByIndex(
              index
            )} md:pt-[3.75rem] md:pb-[3.75rem] md:text-[clamp(14px,1rem,1rem)]`}
          >
            <div className="max-w-[90vw] pr-[.78125rem] pl-[.78125rem] mr-auto ml-auto w-full">
              <div
                className={`flex ${
                  isReversed ? "flex-row-reverse" : ""
                } mr-[-.78125rem] ml-[-.78125rem] flex-wrap mt-[-1.875rem]`}
              >
                <div className="w-[50%] pr-[.78125rem] pl-[.78125rem] mt-[1.875rem]">
                  <div className="bg-white md:h-full md:[box-shadow:6px_0px_39.7681px_#00000000] md:shadow-[var(--tw-ring-offset-shadow)_var(--tw-ring-shadow)_var(--tw-shadow)] md:rounded-[.9375rem] md:p-[1.5rem]">
                    {posts[0] && (
                      <>
                        <Link
                          to={`/blogdetail/${posts[0].id}`}
                          className="md:rounded-[.5rem] md:pt-[61.1111%] rounded-[.8rem] pt-[60.85627%] block relative h-0 overflow-hidden transition-all duration-[.2s] ease-[cubic-bezier(.4,0,.2,1)]"
                        >
                          <img
                            src={posts[0].imageUrl}
                            alt=""
                            className="absolute top-0 left-0 transition-all duration-[.3s] ease-[cubic-bezier(.4,0,.2,1)] w-full h-full object-cover inline max-w-full  align-middle hover:scale-[1.05]"
                          />
                        </Link>

                        <div className="mt-[1.5rem]">
                          <div className="mb-[.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[.1875rem_.5625rem] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                            <Link to="#" className="text-[rgb(20,170,62)]">
                              <span>{posts[0].blogSubCategoryName}</span>
                            </Link>
                          </div>
                          <h3 className="text-[clamp(14px,1.5rem,1.5rem)] text-[rgba(68,68,68,var(--tw-text-opacity))] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                            <Link to="#" className="">
                              {posts[0].title}
                            </Link>
                          </h3>
                          <div className="mt-[.5rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                            <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                              {new Date(posts[0].createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                            <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                            <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                              {Math.floor(Math.random() * 300) + 100}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Danh sách 3 bài bên phải */}
                <div className="w-[50%] pr-[.78125rem] pl-[.78125rem] mt-[1.875rem]">
                  <div className="max-w-[38.6875rem]">
                    <div className="block">
                      <div className="flex items-center mb-[1.5rem] justify-between">
                        <h2 className="text-center md:text-[clamp(14px,1.875rem,1.875rem)] text-[rgb(134,3,21)] font-bold text-[24px] leading-[1.3]">
                          <Link
                            to={`/blogdetail/${posts[0].id}`}
                            className="text-[rgb(134,3,21)]"
                          >
                            {category.name}
                          </Link>
                        </h2>
                        <div className="block">
                          <div className="flex flex-wrap gap-[.625rem]">
                            <Link
                              to={`/blog/${category.slug}`}
                              className="border-2 border-[rgb(68,68,68)] bg-[rgb(68,68,68)] text-[rgb(255,255,255)] px-6 h-11 text-sm text-center whitespace-nowrap rounded-full flex items-center font-medium gap-[.5rem]"
                            >
                              <span>Xem tất cả </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.3 8.3a.5.5 0 0 1 0 .4l-4 5a.5.5 0 0 1-.8-.6L9.2 8l-2.7-3.7a.5.5 0 1 1 .8-.6l4 5z"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M1.5 8a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5z"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Các bài nhỏ bên phải */}
                    {posts.slice(1, 4).map((post) => (
                      <div
                        key={post.id}
                        className="mt-[10px] h-full md:[filter:drop-shadow(6px_0px_39.7681px_rgba(0,0,0,0.05))] bg-white flex items-center rounded-[12px] p-[11px]"
                      >
                        <div className="w-[16.125rem] ">
                          <Link
                           to={`/blogdetail/${post.id}`}
                            className="rounded-[.5rem] pt-[56.97674%] block relative h-0 overflow-hidden transition-all duration-[.2s] ease-[cubic-bezier(.4,0,.2,1)]"
                          >
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="absolute top-0 left-0 transition-all duration-[.3s] ease-[cubic-bezier(.4,0,.2,1)] w-full h-full object-cover inline max-w-full  align-middle hover:scale-[1.05]"
                            />
                          </Link>
                        </div>
                        <div className="pl-[1rem] flex-1 mt-0">
                          <div className="mb-[.5625rem] flex items-center w-full max-w-max font-semibold text-[12px] leading-[1.5] rounded-[3px] p-[.1875rem_.5625rem] bg-[rgba(20,170,62,0.1)] text-[rgb(20,170,62)]">
                            <Link to={"#"} className="text-[rgb(20,170,62)]">
                              <span >{post.blogSubCategoryName}</span>
                            </Link>
                          </div>
                          <h3 className="text-[clamp(14px,1rem,1rem)] text-[rgba(68,68,68)] font-semibold leading-[1.55] overflow-hidden flex line-clamp-3 m-0">
                            <Link to={`/blogdetail/${post.id}`} className="">
                              {post.title}
                            </Link>
                          </h3>
                          <div className="mt-[1rem] gap-[0.5rem] flex items-center text-[clamp(14px,1rem,1rem)]">
                            <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                              {new Date(post.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                            <span className="block  bg-[rgba(217,217,217)] w-[6px] h-[6px] rounded-full"></span>
                            <p className="text-[14px] text-[rgba(68,68,68,0.6)] font-normal leading-[1.6] m-0">
                              {Math.floor(Math.random() * 300) + 50}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
