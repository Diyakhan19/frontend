import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DeletePost from "@/components/modals/DeletePost";
import { useDispatch, useSelector } from "react-redux";
import { useAddRemoveFavPostMutation } from "@/redux/services/postService";
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

  const { transportId, title, status, city, pricing, make, model, capacity } =
    transport;

  const isSaved = bookmarks.includes(transportId);

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
      <DeletePost modal={modal} setModal={setModal} />

      <div className="border shadow rounded-lg w-full h-auto min-h-[250px] p-2 relative">
        <img
          src={`${BASE_URL}/${transport.images[0]}`}
          className="rounded-lg object-cover w-full h-[180px] cursor-pointer"
          onClick={() => router.push(`/transports/${transportId}`)}
        />

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
