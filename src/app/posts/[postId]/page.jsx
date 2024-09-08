"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useAddRemoveFavPostMutation,
  useGetPostQuery,
} from "@/redux/services/postService";
import moment from "moment";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "@/redux/reducers/authSlice";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useParams();
  const postId = +params?.postId;
  const dispatch = useDispatch();

  const { data, refetch } = useGetPostQuery(postId);

  const [addRemoveFavPost] = useAddRemoveFavPostMutation();

  const { user } = useSelector((state) => state.auth);

  const post = data?.data;

  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (post) {
      setMainImg(post.images[0]);
    }
  }, [post]);

  if (!post) return;

  const {
    userId,
    title,
    address,
    price,
    city,
    description,
    features,
    createdAt,
  } = post;

  const isFavorite = user.favorites.find((item) => item.postId === postId);

  const onClickFavIcon = async () => {
    try {
      const res = await addRemoveFavPost({ postId }).unwrap();
      refetch();
      dispatch(
        updateFavorites({
          key: "post",
          data: res.data,
        })
      );
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="py-8">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:flex-1 border min-h-[40vh] sm:min-h-[85vh]  shadow rounded-lg w-full sm:w-[50%]">
            <div className="h-[260px] sm:h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-cover rounded-t-lg"
                src={`${BASE_URL}/${mainImg}`}
                alt="Product Image"
              />
            </div>
            <div className="p-2 gap-2 grid grid-cols-12">
              {post.images.map((item, indx) => {
                if (indx !== 0) {
                  return (
                    <img
                      src={`${BASE_URL}/${item}`}
                      className="w-full h-full col-span-6 lg:col-span-3 max-h-[120px] sm:max-h-[200px] cursor-pointer rounded-md"
                      onClick={() => setMainImg(item)}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="md:flex-1 px-4 border shadow rounded-lg p-5 w-full sm:w-[50%]">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-full border-[2px] shadow px-4 hover:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="text-gray-600 font-bold text-sm">Chat</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">{address}</p>
            <div className="flex mb-2">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600"> {price} Rs.</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <div>
                  <span className="font-bold text-gray-700">City:</span>
                  <span className="text-gray-600"> {city}</span>
                </div>

                <div>
                  <span className="font-bold text-gray-700">Posted:</span>
                  <span className="text-gray-600">
                    {" "}
                    {moment(createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>

            <hr className="mt-2" />

            <div className="my-4">
              <div>
                <span className="font-bold text-gray-700">Posted By:</span>
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="my-1 p-2 border-[2px] shadow rounded-full hover:border-primary w-full sm:w-[200px]">
                    <Link
                      href={`/profile?userId=${post.user.userId}`}
                      className="group"
                    >
                      <div className="flex items-center">
                        <div>
                          <img
                            alt=""
                            src={`${BASE_URL}/${post.user?.image}`}
                            className="inline-block h-9 w-9 rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {post.user.name}
                          </p>
                          <p className="text-xs font-medium text-gray-500 truncate">
                            {post.user.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="group flex items-center justify-center my-1 p-2 border-[2px] shadow rounded-full w-full sm:w-[160px]">
                    <div onClick={onClickFavIcon} className="cursor-pointer">
                      {isFavorite ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                          className="h-[30px] w-[30px]"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="size-6"
                          className="h-[30px] w-[30px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-md font-medium text-gray-700 truncate">
                        Favorites: <span>{post._count.favorites}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-2" />

              <div className="my-3">
                <span className="font-bold text-gray-700">Features:</span>
                <div className="flex gap-2 items-center mt-2 flex-wrap">
                  {features.map((item) => (
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <hr className="mt-2" />
            <div className="my-4">
              <div>
                <span className="font-bold text-gray-700">Description:</span>
                <p className="text-gray-600 text-sm mt-2">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
