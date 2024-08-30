import { updateFavorites } from "@/redux/reducers/authSlice";
import { useAddRemoveFavDestMutation } from "@/redux/services/destService";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Card = (props) => {
  const router = useRouter();

  if (!props.data) return;

  const { hotelId, name, address, description, images, rating, _count } =
    props.data;

  return (
    <div className="grid col-span-12 lg:col-span-6">
      <div className="w-full flex flex-col sm:flex-row border shadow rounded-lg h-auto md:h-[200px]">
        <img
          src={`${BASE_URL}/${images[0]}`}
          className="w-full sm:w-[200px] h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none cursor-pointer"
          onClick={() => router.push(`/hotels/${hotelId}`)}
        />

        <div className="p-3">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-gray-700">{name}</h1>
            <div className="flex gap-1 items-center justify-center">
              <StarRatings
                rating={rating}
                starRatedColor="#ffa534"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />

              <div className="bg-yellow-400 mt-1 p-[3px] text-sm font-bold rounded-md w-[30px] flex items-center justify-center">
                {rating}
              </div>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <h1 className="text-gray-600 text-sm flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              {address}
            </h1>
            <div className="flex gap-1 text-gray-600 text-sm font-bold">
              ({_count.reviews}) Reviews
            </div>
          </div>
          <p className="text-wrap line-clamp-4 text-gray-500 text-[13px] my-2 ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
