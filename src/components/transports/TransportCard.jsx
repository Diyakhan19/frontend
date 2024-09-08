import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteTransport from "@/components/modals/DeleteTransport";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateBookmarks } from "@/redux/reducers/authSlice";
import { useBookmarkTransportMutation } from "@/redux/services/transportService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const TranportCard = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const bookmarks = user?.bookmarks;
  const transport = props?.transport;

  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  if (!transport) return;

  const {
    userId,
    transportId,
    title,
    status,
    city,
    pricing,
    make,
    model,
    capacity,
  } = transport;

  const isSaved = bookmarks.includes(transportId);

  const isOwner = user?.userId === userId;
  const isProfilePage = window.location.pathname === "/profile";

  const [bookmarkTransport] = useBookmarkTransportMutation();

  const onClickBookmark = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      const res = await bookmarkTransport({ transportId }).unwrap();
      dispatch(updateBookmarks(res.data.bookmarks));
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <DeleteTransport modal={modal} setModal={setModal} />

      <div className="border shadow rounded-lg w-full h-auto min-h-[250px] p-2 relative">
        <img
          src={`${BASE_URL}/${transport.images[0]}`}
          className="rounded-lg object-cover w-full h-[180px] cursor-pointer"
          onClick={() => router.push(`/transports/${transportId}`)}
        />

        {isOwner && isProfilePage ? (
          <>
            <div className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-4 right-[50px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                className="h-[22px] w-[22px] mt-[1px]"
                onClick={() => setModal({ isOpen: true, data: transport })}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>

            <div className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-4 right-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[20px] w-[20px] mt-[1px]"
                onClick={() =>
                  router.push(`/transports/new?transportId=${transportId}`)
                }
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </div>
          </>
        ) : (
          <div
            className="bg-white rounded-full border flex items-center justify-center p-1 absolute top-4 right-4 cursor-pointer"
            onClick={onClickBookmark}
          >
            {isSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            )}
          </div>
        )}

        <div className="my-2 flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="font-semibold text-md">{title}</h3>
            <p
              className={`font-semibold text-sm capitalize rounded-full px-2 flex items-center justify-center ${
                status === "available"
                  ? "bg-green-300"
                  : status === "in maintenance"
                  ? "bg-yellow-400"
                  : status === "rented"
                  ? "bg-blue-300"
                  : "bg-red-300"
              }`}
            >
              {status}
            </p>
          </div>
          <h4 className="text-xs">{city}</h4>
          <div className="my-2 flex justify-between">
            <div className="px-1">
              <p className="text-[12px] font-bold">
                Rs. {pricing.hour.price} / hr
              </p>
              <p className="text-[12px] font-bold">
                {pricing.hour.maxDistance} Kms.
              </p>
            </div>

            {pricing?.day?.price && pricing?.day?.maxDistance && (
              <div className="px-2 lg:px-[6px] border-x">
                <p className="text-[12px] font-bold">
                  Rs. {pricing.day.price} / day
                </p>
                <p className="text-[12px] font-bold">
                  {pricing.day.maxDistance} Kms.
                </p>
              </div>
            )}

            {pricing?.month?.price && pricing?.month?.maxDistance && (
              <div className="px-1">
                <p className="text-[12px] font-bold">
                  Rs. {pricing.month.price} / mo.
                </p>
                <p className="text-[12px] font-bold">
                  {pricing.month.maxDistance} Kms.
                </p>
              </div>
            )}
          </div>
          <h4 className="text-xs text-gray-500 capitalize">
            {make} | {model} | {capacity} seater
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TranportCard;
