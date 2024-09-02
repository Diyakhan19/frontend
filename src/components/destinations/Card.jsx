import { updateFavorites } from "@/redux/reducers/authSlice";
import { useAddRemoveFavDestMutation } from "@/redux/services/destService";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Card = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (!props.data) return;

  const { destinationId, title, district, description, images, _count } =
    props.data;

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const favorites = user?.favorites;

  const isFavorite = favorites.find(
    (item) => item.destinationId === destinationId
  );

  const [addRemoveFavDest] = useAddRemoveFavDestMutation();

  const onClickFavIcon = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      const res = await addRemoveFavDest({ destinationId }).unwrap();
      dispatch(updateFavorites({ key: "destinations", data: res.data }));
      if (props.refetch) {
        props.refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid col-span-12 lg:col-span-6">
      <div className="w-full flex flex-col sm:flex-row border shadow rounded-lg h-auto md:h-[200px]">
        <img
          src={`${BASE_URL}/${images[0]}`}
          className="w-full sm:w-[200px] h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none cursor-pointer"
          onClick={() => router.push(`/destinations/${destinationId}`)}
        />

        <div className="p-3">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-gray-700">{title}</h1>
            <div
              className="flex gap-1 shadow border items-center justify-center rounded-full px-2"
              onClick={onClickFavIcon}
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-5"
                  className="h-[22px] w-[22px] mt-[1px] cursor-pointer"
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
                  class="size-5"
                  className="h-[22px] w-[22px] mt-[1px] cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
              <p>{_count.favorites}</p>
            </div>
          </div>
          <h1 className="text-gray-600 text-sm">{district}</h1>
          <p className="text-wrap line-clamp-4 text-gray-500 text-[13px] my-2 ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
