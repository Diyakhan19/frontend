"use client";
import React, { useEffect, useMemo, useState } from "react";
import destination from "@/assets/images/destination.png";
import { useParams, useRouter } from "next/navigation";
import {
  useAddRemoveFavDestMutation,
  useGetDestByIdQuery,
  useLikeUnlikeDestinationMutation,
  useSaveReviewMutation,
  useVisitedDestinationMutation,
} from "@/redux/services/destService";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFavorites,
  updateLikes,
  updateVisited,
} from "@/redux/reducers/authSlice";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { StarIcon } from "@heroicons/react/20/solid";
import moment from "moment";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const destId = +params.destId;

  // Get destination by Id
  const { data, refetch } = useGetDestByIdQuery(destId);

  const destination = data?.data;

  // Set first image as main image
  const [mainImg, setMainImg] = useState("");
  const [rating, setRating] = useState({
    stars: 0,
    review: "",
  });

  useEffect(() => {
    if (destination) {
      setMainImg(destination.images[0]);
    }
  }, [destination]);

  // Add remove favorite
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const favorites = user?.favorites;

  const isFavorite = favorites.find((item) => item.destinationId === destId);
  const isLiked = user?.likes?.includes(destId);
  const isVisited = user?.visited?.includes(destId);

  const [addRemoveFavDest] = useAddRemoveFavDestMutation();
  const [likeUnlikeDestination] = useLikeUnlikeDestinationMutation();
  const [visitedDestination] = useVisitedDestinationMutation();
  const [addReview] = useSaveReviewMutation();

  // Add/remove favorite
  const onClickFavIcon = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      const res = await addRemoveFavDest({ destinationId }).unwrap();
      dispatch(updateFavorites({ key: "destinations", data: res.data }));
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Like/unlike a destination
  const onClickLike = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      const res = await likeUnlikeDestination({
        destinationId: destId,
      }).unwrap();

      dispatch(updateLikes(res.data));

      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Save destination visited
  const onClickVisited = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      const res = await visitedDestination({ destinationId: destId }).unwrap();
      dispatch(updateVisited(res.data));
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Add a review
  const saveReview = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      if (rating.review === "") return toast.error("Please write a review");

      const res = await addReview({
        destinationId: destId,
        stars: rating.stars,
        review: rating.review,
      }).unwrap();

      toast.success(res.message);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const map = destination?.mapUrl.replace("600", "100%");

  const memoizedMap = useMemo(() => {
    return destination?.mapUrl ? (
      <div
        className="google-map-code rounded-lg"
        dangerouslySetInnerHTML={{ __html: map }}
      />
    ) : (
      <div className="h-[200px] flex items-center justify-center">
        No map information to show
      </div>
    );
  }, [destination?.mapUrl, map]);

  if (!destination) return;

  const {
    destinationId,
    title,
    location,
    district,
    description,
    images,
    reviews,
    likes,
    mapUrl,
  } = destination;

  const isReviewed = reviews.find((item) => item.userId === user.userId);

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-[60%]">
          <img
            src={`${BASE_URL}/${mainImg}`}
            alt="Destination Cover"
            className="w-full min-h-[400px] h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[40%]">
          <div className="grid grid-cols-12 gap-2">
            {images.map((img, indx) => {
              if (indx !== 0) {
                return (
                  <div className="grid col-span-6 gap-1">
                    <img
                      src={`${BASE_URL}/${img}`}
                      alt="Destination Cover"
                      className={`h-[250px] 2xl:h-[400px] w-full object-cover cursor-pointer rounded-none ${
                        indx === 1
                          ? "lg:rounded-b-lg"
                          : indx === 2
                          ? "lg:rounded-bl-lg"
                          : indx === 3
                          ? "lg:rounded-t-lg"
                          : "lg:rounded-tl-lg"
                      }`}
                      onClick={() => setMainImg(img)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="p-2 lg:p-6">
        <div className="border shadow rounded-lg p-5">
          <div className="flex flex-col gap-4 lg:flex-row justify-between">
            <div>
              <h1 className="font-bold text-2xl text-gray-800">{title}</h1>
              <h2 className="text-gray-700 font-semibold">{location}</h2>
            </div>

            <div className="flex flex-row gap-2">
              <div
                className="flex gap-1 shadow border items-center justify-center rounded-full  py-2 lg:py-0 px-2 w-full lg:w-[80px]"
                onClick={onClickFavIcon}
              >
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-5"
                    className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
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
                    className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </div>
              <div
                className="flex gap-1 shadow border items-center justify-center rounded-full px-2 py-2 lg:py-0 w-full min-w-[100px]"
                onClick={onClickLike}
              >
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#0068FF"
                    class="size-5"
                    className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
                  >
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                    className="h-[28px] w-[28px] mt-[1px] cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                )}
                {likes}
              </div>
            </div>
          </div>

          <hr className="mb-3 mt-6" />
          <h3 className="text-gray-500 my-3">{description}</h3>
        </div>

        <div id="map">
          <div className="p-5 shadow border rounded-lg my-4">
            <h1 className="text-gray-800 font-bold text-2xl mb-3">Location:</h1>

            {memoizedMap}
          </div>
        </div>

        <div id="map">
          <div className="p-5 shadow border rounded-lg my-4">
            <div className="flex gap-3 justify-between flex-col md:flex-row">
              <h1 className="text-gray-800 font-bold text-2xl mb-3">
                Have you visited this place?
              </h1>

              {isVisited ? (
                <div className="min-w-[50%]">
                  <div
                    className="bg-primary rounded-lg px-3 py-2 w-full text-white"
                    onClick={onClickVisited}
                  >
                    Awesome 😎, you've already explored this place
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className="bg-primary px-3 py-2 w-full text-white"
                    onClick={onClickVisited}
                  >
                    Yes, Already visited
                  </button>
                </div>
              )}
            </div>

            {isVisited && !isReviewed && (
              <div className="flex gap-3 justify-between flex-col md:flex-row my-2">
                <h1 className="text-gray-800 text-md mb-3">
                  Looks like you have visited this place and haven't reviewd.
                  Please leave a review.
                </h1>
                <div className="flex flex-col border rounded-lg p-5 min-w-[50%]">
                  <div className="flex justify-between">
                    <p className="font-bold my-2 text-gray-800">
                      Leave a review:
                    </p>
                    <button
                      className="bg-primary px-4 py-1 text-white"
                      onClick={saveReview}
                    >
                      Save
                    </button>
                  </div>
                  <div className="flex items-center gap-2 justify-start">
                    <p className="text-gray-700 text-md font-semibold mt-[3px]">
                      Rating:
                    </p>
                    <div>
                      <StarRatings
                        rating={rating.stars}
                        starRatedColor="#ffa534"
                        starHoverColor="#ffa534"
                        changeRating={(stars) =>
                          setRating({ ...rating, stars: stars })
                        }
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="2px"
                      />
                    </div>
                  </div>
                  <textarea
                    className="flex w-full border-borderCol my-2"
                    rows={4}
                    value={rating.review}
                    onChange={(e) =>
                      setRating({ ...rating, review: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            )}

            <hr className="mb-3 mt-6" />

            {reviews.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                No reviews available
              </div>
            ) : (
              reviews.map((review) => (
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex-none py-10">
                    <img
                      alt=""
                      src={`${BASE_URL}/${review.user.image}`}
                      className="h-10 w-10 rounded-full bg-gray-100 object-cover"
                      onError={(e) => (e.target.src = "/images/female.png")}
                    />
                  </div>
                  <div className="flex-1 py-10 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900">
                      {review.user.name}
                    </h3>
                    <p>{moment(review.createdAt).format("MMMM DD, YYYY")}</p>
                    <div className="mt-2 flex items-center">
                      <StarRatings
                        rating={review.stars}
                        starRatedColor="#ffa534"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: review.text }}
                      className="prose prose-sm mt-4 max-w-none text-gray-500"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
