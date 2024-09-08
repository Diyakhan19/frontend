import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import DeleteHotel from "../modals/DeleteHotel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Card = (props) => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const hotel = props.data;

  if (!hotel) return;

  const {
    userId,
    hotelId,
    name,
    address,
    description,
    images,
    rating,
    _count,
  } = hotel;

  const isOwner = user?.userId === userId;
  const isProfilePage = window.location.pathname === "/profile";

  return (
    <div className="grid col-span-12 lg:col-span-6">
      <DeleteHotel modal={modal} setModal={setModal} />

      <div className="w-full flex flex-col sm:flex-row border shadow rounded-lg h-auto md:h-[200px]">
        <img
          src={`${BASE_URL}/${images[0]}`}
          className="w-full sm:min-w-[200px] sm:w-[200px] h-[300px] sm:h-auto object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none cursor-pointer"
          onClick={() => router.push(`/hotels/${hotelId}`)}
        />

        <div className="p-3">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-gray-700">{name}</h1>

            <div className="flex flex-col md:flex-row gap-3">
              {isOwner && isProfilePage && (
                <div className="flex gap-1 justify-end">
                  <div className="bg-white rounded-full border flex items-center justify-center p-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="red"
                      className="h-[22px] w-[22px] mt-[1px]"
                      onClick={() => setModal({ isOpen: true, data: hotel })}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                  <div className="bg-white rounded-full border flex items-center justify-center p-1 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-[22px] w-[22px] mt-[1px]"
                      onClick={() =>
                        router.push(`/hotels/new?hotelId=${hotelId}`)
                      }
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </div>
                </div>
              )}

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
