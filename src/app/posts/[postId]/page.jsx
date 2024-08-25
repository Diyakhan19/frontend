"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetPostQuery } from "@/redux/services/postService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useParams();
  const postId = +params?.postId;

  const { data } = useGetPostQuery(postId);

  const post = data?.data;

  if (!post) return;

  const { title, address, price, city, category, description, features } = post;

  return (
    <div className="py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:flex-1 border shadow rounded-lg">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-cover rounded-t-lg"
                src={`${BASE_URL}/${post.images[0]}`}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4 px-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4 border shadow rounded-lg p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm mb-4">{address}</p>
            <div className="flex mb-2">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600"> {price} Rs.</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">City:</span>
              <span className="text-gray-600"> {city}</span>
            </div>
            {/* <div className="mb-4">
              <span className="font-bold text-gray-700">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div> */}
            <div className="my-4">
              <span className="font-bold text-gray-700">Features</span>
              <div className="flex items-center mt-2">
                {features.map((item) => (
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">Description:</span>
              <p className="text-gray-600 text-sm mt-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
