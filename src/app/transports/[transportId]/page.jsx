"use client";

import BookTransport from "@/components/modals/BookTransport";
import {
  useGetTransportQuery,
  useUpdateStatusMutation,
} from "@/redux/services/transportService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { statuses } from "@/components/common/constants";
import Select from "@/components/common/Select";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useParams();
  const router = useRouter();
  const transportId = params?.transportId;

  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const [status, setStatus] = useState("");

  const { isAuthenticated, user: currentUser } = useSelector(
    (state) => state.auth
  );

  const { data } = useGetTransportQuery(transportId);
  const transport = data?.data;
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  useEffect(() => {
    if (transport) {
      setStatus(transport.status);
    }
  }, [transport]);

  if (!transport) return;

  const {
    title,
    make,
    model,
    capacity,
    type,
    city,
    phone,
    description,
    images,
    user,
  } = transport;

  const onClickSelect = (key) => {
    if (!isAuthenticated) return router.push("/login");

    setModal({
      isOpen: true,
      data: key,
    });
  };

  const onClickUpdateStatus = async () => {
    try {
      const body = {
        transportId: transport.transportId,
        status: status.toLowerCase(),
      };
      const res = await updateStatus(body).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const isMe = currentUser?.userId === user.userId;

  return (
    <div className="px-5 sm:px-20 mx-auto p-6 my-5">
      <BookTransport modal={modal} setModal={setModal} />

      {isMe && (
        <div className="flex gap-3 items-end justify-end rounded-lg mb-5 border shadow px-5 py-2">
          <div className="w-full lg:w-[40%]">
            <Select
              label={status && status[0].toUpperCase() + status.slice(1)}
              values={statuses}
              onChange={(val) => setStatus(val)}
            />
          </div>
          <button
            className="bg-primary text-white text-sm font-semibold px-3 py-2 rounded-md flex items-center justify-center"
            onClick={onClickUpdateStatus}
          >
            Update Status
          </button>
        </div>
      )}

      <div>
        <div className="flex flex-col sm:flex-row gap-2 text-center">
          <div className="w-full flex items-center rounded">
            <img
              src={`${BASE_URL}/${images[0]}`}
              alt="Product"
              className="w-full max-h-full object-cover sm:h-[400px]"
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />
          </div>

          <div className="flex flex-col gap-2">
            {images.map((img, indx) => {
              if ([1, 2].includes(indx)) {
                return (
                  <img
                    src={`${BASE_URL}/${img}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                );
              }
            })}
          </div>

          <div className="flex flex-col gap-2">
            {images.map((img, indx) => {
              if ([3, 4].includes(indx)) {
                return (
                  <img
                    src={`${BASE_URL}/${img}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 border rounded-md">
        <div className="flex gap-2 flex-col sm:flex-row justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-3 text-gray-800 border px-4 py-1 rounded-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                  clipRule="evenodd"
                />
              </svg>
              {city}
            </div>

            <div className="flex gap-3 text-gray-800 border px-4 py-2 rounded-full items-center justify-center">
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

            <div className="p-2 border rounded-full hover:border-primary w-full sm:w-[200px]">
              <Link href={`/profile?userId=${user.userId}`} className="group">
                <div className="flex items-center">
                  <div>
                    <img
                      alt=""
                      src={`${BASE_URL}/${user?.image}`}
                      className="inline-block h-9 w-9 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 border rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <hr className="my-4" />
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 p-5 border rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Details</h2>
        <hr className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="flex gap-2 w-full min-w-[200px] font-bold text-lg items-center bg-gray-500 rounded px-4 py-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            {type}
          </div>

          <div className="flex gap-2 w-full min-w-[200px] font-bold text-lg items-center bg-gray-500 rounded px-4 py-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-7"
            >
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
              <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
              <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
            {make}
          </div>

          <div className="flex gap-2 w-full min-w-[200px] font-bold text-lg items-center bg-gray-500 rounded px-4 py-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            {model}
          </div>

          <div className="flex gap-2 w-full min-w-[200px] font-bold text-lg items-center bg-gray-500 rounded px-4 py-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                clipRule="evenodd"
              />
            </svg>
            {capacity} Seater
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 border rounded-md">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Pricing</h2>
        <div clas></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(transport.pricing).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-medium text-gray-800 capitalize mb-2">
                  Per {key}
                </h3>
                {!isMe && (
                  <button
                    className="bg-gray-500 text-white px-3"
                    onClick={() => onClickSelect(key)}
                  >
                    Select
                  </button>
                )}
              </div>
              <p className="text-gray-700">
                <strong>Price:</strong> {value.price} Rs.
              </p>
              <p className="text-gray-700">
                <strong>Max Distance:</strong> {value.maxDistance} km
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
