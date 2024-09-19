import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteCamping from "../modals/DeleteCamping";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CampingCard = (props) => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  if (!props.data) return;

  const {
    campingId,
    type,
    duration,
    name,
    price,
    city,
    userId,
    images,
    destination,
  } = props.data;

  const destImg = destination?.images[0];

  const isOwner = user?.userId === userId;
  const isProfilePage = window.location.pathname === "/profile";

  return (
    <div className="grid col-span-12 lg:col-span-6">
      <DeleteCamping modal={modal} setModal={setModal} />

      <div className="w-full flex flex-col sm:flex-row border shadow rounded-lg h-auto md:h-[200px] relative">
        <img
          src={`${BASE_URL}/${images[0]}`}
          className="w-full min-w-[160px] lg:w-[160px] xl:w-[300px] h-full max-h-[220px] object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none cursor-pointer"
          onClick={() => router.push(`/camping/${campingId}`)}
        />

        {isOwner && isProfilePage && (
          <>
            <div className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-2 left-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                className="h-[22px] w-[22px] mt-[1px]"
                onClick={() => setModal({ isOpen: true, data: props.data })}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>

            <div className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-2 left-[42px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[20px] w-[20px] mt-[1px]"
                onClick={() =>
                  router.push(`/camping/new?campingId=${campingId}`)
                }
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </div>
          </>
        )}

        <div className="p-3 w-full">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-gray-700">{name}</h1>
            <div className="flex gap-1 text-gray-700 text-md font-semibold">
              {price} PKR
            </div>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-600">Generals:</p>

              <div className="flex justify-center flex-col mt-3">
                <div className="text-gray-600 text-sm flex gap-1 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{city}</span>
                </div>

                <div className="text-gray-600 text-sm flex gap-1 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                      clipRule="evenodd"
                    />
                    <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
                  </svg>

                  <span className="truncate">{type}</span>
                </div>

                <div className="text-gray-600 text-sm flex gap-1 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="size-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>{duration}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">
                Destination:
              </p>
              <div className="border rounded-[4px] cursor-pointer bg-gray-200">
                <p className="px-2 py-1 text-sm font-medium">
                  {destination?.title}
                </p>
                <img
                  src={`${BASE_URL}/${destImg}`}
                  className="w-[150px] xl:w-[170px] 2xl:w-[200px] h-[80px] rounded-b-[4px] opacity-80"
                  onClick={() =>
                    router.push(`/destinations/${destination?.destinationId}`)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampingCard;
