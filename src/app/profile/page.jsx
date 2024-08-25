"use client";
import { useGetUserByIdQuery } from "../../redux/services/userService";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import Posts from "@/components/posts/Posts";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useSearchParams();
  const userId = params.get("userId");

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data } = useGetUserByIdQuery(userId);

  const [tab, setTab] = useState("posts");

  const user = data?.data;

  if (!user) return;

  return (
    <>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-col sm:flex-row flex-wrap items-center p-4 md:py-8 rounded-lg shadow border my-2">
            <div className="w-full sm:w-[80%] flex flex-col sm:flex-row gap-2">
              <div className="md:w-3/12 md:ml-16 flex items-center justify-center">
                <img
                  className="w-40 h-40 object-cover rounded-full
               border-2 border-primary p-1"
                  src={
                    user?.image
                      ? `${BASE_URL}/${user?.image}`
                      : "/images/female.png"
                  }
                  alt="profile"
                />
              </div>
              <div className="w-8/12 md:w-7/12 ml-4">
                <div className="md:flex md:flex-wrap md:items-center mb-4">
                  <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {user?.name}
                  </h2>
                  <span
                    className="inline-block fas fa-certificate fa-lg text-blue-500 
                         relative mr-6 text-xl transform -translate-y-2"
                    aria-hidden="true"
                  >
                    <i
                      className="fas fa-check text-white text-xs absolute inset-x-0
                         ml-1 mt-px"
                    />
                  </span>
                  <span
                    className={`inline-flex items-center gap-x-1.5 capitalize rounded-full px-1.5 py-0.5 text-xs font-medium ${
                      user?.status === "approved"
                        ? "text-green-700 bg-green-100"
                        : user?.status === "rejected"
                        ? "text-red-500 bg-red-100"
                        : "text-yellow-700 bg-yellow-200"
                    }`}
                  >
                    <svg
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 ${
                        user?.status === "approved"
                          ? "fill-green-500"
                          : user?.status === "rejected"
                          ? "fill-red-500"
                          : "fill-yellow-600"
                      }`}
                    >
                      <circle r={3} cx={3} cy={3} />
                    </svg>
                    {user?.status}
                  </span>
                </div>
                <ul className="hidden md:flex space-x-8 mb-4">
                  <li>
                    <span className="font-semibold mr-1">
                      {user?.posts?.length}
                    </span>
                    Posts
                  </li>
                  <li>
                    <span className="font-semibold mr-1">
                      {user?.hotels?.length}
                    </span>
                    Hotels
                  </li>
                </ul>
                <div className="hidden md:block">
                  <h1 className="font-semibold">{user?.email}</h1>
                  <p className="text-sm mt-2">{user?.about}</p>
                </div>
              </div>
              <div className="md:hidden text-sm my-2">
                <h1 className="font-semibold">{user?.email}</h1>
                <p>{user?.about}</p>
              </div>
            </div>

            {isAuthenticated && (
              <div className="flex flex-col gap-2 items-center justify-center w-full sm:w-[20%]">
                <div className="min-w-[180px] hover:bg-gray-200 cursor-pointer py-1 px-3 gap-2 flex shadow border items-center justify-between rounded-full">
                  <Link className="text-gray-700" href="/posts/new">
                    Post a listing
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {user?.roles?.includes("vendor") && (
                  <>
                    <div className="min-w-[180px] hover:bg-gray-200 cursor-pointer py-1 px-3 gap-2 flex border shadow items-center justify-between rounded-full">
                      <Link className="text-gray-700" href="/hotels/new">
                        Post a hotel
                      </Link>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div className="min-w-[180px] hover:bg-gray-200 cursor-pointer py-1 px-3 gap-2 flex shadow border items-center justify-between rounded-full">
                      <Link className="text-gray-700" href="/transports/new">
                        Post a transport
                      </Link>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            )}
          </header>
          <div className="px-px md:px-3">
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">302</span>
                following
              </li>
            </ul>

            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
              uppercase tracking-widest font-semibold text-xs text-gray-600 border-t"
            >
              <li
                className={`md:border-t md:-mt-px md:text-gray-700 cursor-pointer ${
                  tab === "posts" && "md:border-gray-700"
                }`}
                onClick={() => setTab("posts")}
              >
                <div className="p-3 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="hidden md:inline">posts</span>
                </div>
              </li>
              <li
                className={`cursor-pointer md:border-t ${
                  tab === "hotels" && "md:border-gray-700"
                }`}
                onClick={() => setTab("hotels")}
              >
                <div className="p-3 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                    <path
                      fill-rule="evenodd"
                      d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="hidden md:inline">hotels</span>
                </div>
              </li>
              <li
                className={`cursor-pointer md:border-t ${
                  tab === "favorites" && "md:border-gray-700"
                }`}
                onClick={() => setTab("favorites")}
              >
                <div className="p-3 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>

                  <span className="hidden md:inline">favorites</span>
                </div>
              </li>
            </ul>

            <hr className="mb-3" />

            <div className="border shadow rounded-lg p-5 min-h-[600px]">
              {tab === "posts" ? (
                user?.posts.length === 0 ? (
                  "No posts found"
                ) : (
                  <Posts posts={user?.posts} />
                )
              ) : tab === "hotels" ? (
                user?.hotels.length === 0 ? (
                  "No hotels found"
                ) : (
                  "Hotels"
                )
              ) : user?.favorites.length === 0 ? (
                "No favorites found"
              ) : (
                <div>
                  {user?.favorites?.length !== 0 && (
                    <div>
                      <h1 className="my-2 font-bold ">Favorite Posts</h1>
                      <Posts
                        posts={user?.favorites?.map((item) => item.post)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
