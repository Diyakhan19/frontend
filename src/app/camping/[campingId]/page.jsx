"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetCampingQuery } from "@/redux/services/campingService";
import { campings } from "@/components/common/constants";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const params = useParams();
  const campingId = params?.campingId;

  const { data } = useGetCampingQuery(campingId);

  const camping = data?.data;

  if (!camping) return;

  const {
    name,
    description,
    duration,
    price,
    type,
    city,
    phone,
    destination,
    facilities,
    images,
  } = camping;

  const {
    title,
    location,
    description: desDes,
    likes,
    destinationId,
  } = destination;

  const coverImg = `${BASE_URL}/${images[0]}`;

  const campingType = campings.find((item) => item.value === type);

  const onClickIcon = () => {
    router.push(`/destinations/${destinationId}`);
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="relative bg-cover bg-center h-[400px] rounded-lg">
        <img src={coverImg} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <h1 className="text-white text-4xl font-bold">{name}</h1>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-2">{description}</p>

          <div className="my-4 p-5 grid gap-3 grid-cols-1 md:grid-cols-3 border shadow rounded-md">
            <div className="text-gray-800 flex items-center flex-col border p-2 rounded">
              <p className="font-bold">Type</p>
              <div className="border w-[80%] my-1" />
              <div className="flex gap-1 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
                </svg>
                <p className="text-lg">{type}</p>
              </div>
            </div>
            <div className="text-gray-800 flex items-center flex-col border p-2 rounded">
              <p className="font-bold">Duration</p>
              <div className="border w-[80%] my-1" />
              <div className="flex gap-1 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="size-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg">{duration}</p>
              </div>
            </div>
            <div className="text-gray-800 flex items-center flex-col border p-2 rounded">
              <p className="font-bold">City</p>
              <div className="border w-[80%] my-1" />
              <div className="flex gap-1 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg">{city}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 border shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-blue-600">&#10003;</span>
                  <p className="text-gray-700 capitalize px-3 py-1 border bg-gray-200 rounded">
                    {facility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-2/5 bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900">
            Price: {price} PKR
          </h3>
          <div className="bg-primary text-white mt-4 w-full py-2 rounded-md transition flex items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fillRule="evenodd"
                d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            {phone}
          </div>

          <div className="p-2 my-4 relative">
            <p className="text-gray-600 mb-4">{campingType.info}</p>

            <div className="relative w-full h-[200px] xl:h-[230px]">
              <img
                src={campingType.image.src}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-start justify-start p-4 rounded-lg">
                <h1 className="text-white text-2xl font-bold">
                  {campingType.label}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(1).map((image, index) => (
            <img
              key={index}
              src={`${BASE_URL}/${image}`}
              alt={`Camping Image ${index + 1}`}
              className="h-40 w-full object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>
      </div>

      <div className="w-full mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Camping Destination
        </h3>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full shadow">
            <img
              src={`${BASE_URL}/${destination.images[0]}`}
              alt={`Camping Image`}
              className="h-full min-h-[400px] w-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-r-none shadow-sm"
            />
          </div>

          <div className="w-full border shadow p-5 rounded-r-lg">
            <div className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row justify-between">
                <div>
                  <h1 className="font-bold text-2xl text-gray-800">{title}</h1>
                  <h2 className="text-gray-700 font-semibold">{location}</h2>
                </div>

                <div className="flex flex-row gap-2">
                  <div
                    className="flex gap-1 shadow border items-center justify-center rounded-full  py-2 lg:py-0 px-2 w-full lg:w-[80px]"
                    onClick={onClickIcon}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>

                  <div
                    className="flex gap-1 shadow border items-center justify-center rounded-full px-2 py-2 lg:py-0 w-full min-w-[100px]"
                    onClick={onClickIcon}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>

                    {likes}
                  </div>
                </div>
              </div>

              <hr className="mb-3 mt-6" />
              <h3 className="text-gray-500 my-3">{desDes}</h3>
              <hr className="mb-3 mt-6" />
              <Link
                href={`/destinations/${destinationId}`}
                className="border py-2 block rounded-lg text-center bg-primary text-white"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
