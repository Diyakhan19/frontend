"use client";
import AddRoom from "@/components/modals/AddRoom";
import BookingModal from "@/components/modals/BookingModal";
import { useGetHotelQuery } from "@/redux/services/hotelService";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import FslightboxReact from "fslightbox-react";
import moment from "moment";
import { useSaveReviewMutation } from "@/redux/services/destService";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const params = useParams();
  const hotelId = +params?.hotelId;

  const [roomModal, setRoomModal] = useState({
    isOpen: false,
    data: null,
  });

  const [rating, setRating] = useState({
    stars: 0,
    review: "",
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    data: null,
  });

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { data, refetch } = useGetHotelQuery(hotelId);
  const [addReview] = useSaveReviewMutation();

  const hotel = data?.data;

  // Full screen images. FS Lightbox
  const [imgUrls, setImgUrls] = useState([]);

  const [toggler, setToggler] = useState({
    toggler: false,
    slide: 1,
  });

  if (!hotel) return;

  const {
    userId,
    name,
    address,
    description,
    mapUrl,
    facilities,
    images,
    rooms,
    reviews,
    rating: stars,
    _count,
  } = hotel;

  const map = mapUrl.replace("600", "100%");

  const isOwner = user?.userId === userId;

  const imgClicked = async () => {
    const x = [];
    if (images.length !== 0) {
      for (var i = 0; i < images.length; i++) {
        x.push(`${BASE_URL}/${images[i]}`);
      }
    }
    setImgUrls(x);
    openLightboxOnSlide(1);
  };

  function openLightboxOnSlide(number) {
    setToggler({
      toggler: !toggler.toggler,
      slide: number,
    });
  }

  const onClickBookNow = (room) => {
    if (!isAuthenticated) return router.push("/login");
    setBookingModal({ isOpen: true, data: room });
  };

  // Add a review
  const saveReview = async () => {
    if (!isAuthenticated) return router.push("/login");

    try {
      if (rating.review === "") return toast.error("Please write a review");

      const res = await addReview({
        hotelId: hotelId,
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

  const onClickChat = () => {
    router.push(`/chat?receiverId=${userId}&hotelId=${hotelId}`);
  };

  const userDidBooking = hotel.rooms.some((item) =>
    item.bookings.map((booking) => booking.userId).includes(user?.userId)
  );

  const alreadyReviewed = reviews.find((item) => item.userId === user?.userId);

  return (
    <div className="container mx-auto p-6">
      <FslightboxReact
        toggler={toggler.toggler}
        sources={imgUrls}
        slide={toggler.slide}
        type="image"
      />

      <AddRoom modal={roomModal} setModal={setRoomModal} refetch={refetch} />

      <BookingModal
        modal={bookingModal}
        setModal={setBookingModal}
        refetch={refetch}
      />

      <div className="font-sans mb-5 tracking-wide mx-auto">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600 mt-2">{address}</p>
          </div>

          {isOwner && (
            <div>
              <button
                type="button"
                className="w-full px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                onClick={() => setRoomModal({ isOpen: true, data: hotel })}
              >
                Add Room
              </button>
            </div>
          )}
        </div>

        <div className="grid items-start grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
          <div className="col-span-12 lg:col-span-9">
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
                <div className="flex items-center rounded ">
                  <img
                    src={`${BASE_URL}/${images[1]}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                  />
                </div>

                <div className="flex items-center rounded">
                  <img
                    src={`${BASE_URL}/${images[2]}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 sm:grid-cols-5 justify-between gap-2 items-center">
              {images.map((image, indx) => {
                if (indx > 2) {
                  return (
                    <img
                      src={`${BASE_URL}/${image}`}
                      alt="Product"
                      className="object-cover w-full h-full lg:h-[120px] xl:h-[177px]"
                    />
                  );
                }
              })}
            </div>
          </div>

          <div className="col-span-12 border shadow h-full px-5 lg:col-span-3">
            <div className="flex flex-col items-center gap-4 mt-4">
              <StarRatings
                rating={stars}
                starRatedColor="#ffa534"
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="2px"
              />
              <div
                type="button"
                className="w-full p-3 bg-gray-100 text-xs text-gray-800 rounded flex items-center justify-center"
              >
                <svg
                  className="w-4 mr-4 fill-gray-800"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <span className="font-bold">{_count.reviews} Reviews</span>
              </div>
            </div>

            <hr className="my-8" />

            <div>
              <h3 className="text-lg font-bold text-gray-800">Rooms</h3>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center font-semibold justify-center bg-gray-300 rounded h-[40px] w-full">
                  Total Rooms: {rooms.length}
                </div>
                <a
                  href="#rooms"
                  type="button"
                  className="w-full text-center min-w-[200px] px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded"
                >
                  Check Rooms
                </a>
              </div>
            </div>

            <hr className="my-8" />

            <div className="flex items-center justify-center flex-wrap gap-4">
              <a
                href="#reviews"
                type="button"
                className="w-full flex items-center justify-center gap-1 text-center min-w-[200px] px-4 py-2.5 bg-gray-200 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                <div className="w-[160px] gap-1 flex items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>See Reviews</span>
                </div>
              </a>
              <a
                href="#map"
                type="button"
                className="w-full flex items-center justify-center gap-1 text-center min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                <div className="w-[160px] gap-1 flex items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>See Map Location</span>
                </div>
              </a>
              {!isOwner && (
                <div
                  className="w-full min-w-[200px] cursor-pointer flex items-center justify-center gap-1 px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                  onClick={onClickChat}
                >
                  <div className="w-[160px] gap-1 flex items-center justify-start">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Chat with owner</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-5 border rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <hr className="my-4" />
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="mb-6 p-5 border rounded-md overflow-y-hidden" id="rooms">
        <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
        <hr className="my-4" />

        <div className="w-full min-w-[1200px] overflow-x-auto">
          <div className="bg-gray-700 text-white grid grid-cols-6 divide-x-[1px] divide-gray-300 w-full">
            <div className="py-3.5 w-full pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
              Image
            </div>
            <div className="px-3 py-3.5 w-full text-left text-sm font-semibold">
              Room Name
            </div>
            <div className="px-3 py-3.5 w-full text-left text-sm font-semibold">
              Room Type
            </div>
            <div className="px-3 py-3.5 w-full text-left text-sm font-semibold">
              Capacity
            </div>
            <div className="px-3 py-3.5 w-full text-left text-sm font-semibold">
              Price Per Night
            </div>
            <div className="px-3 py-3.5 w-full text-left text-sm font-semibold">
              Booking
            </div>
          </div>
          <div className="h-[500px] overflow-auto min-w-full w-full">
            <div className="text-white flex flex-col w-full justify-between">
              {rooms.length === 0 ? (
                <div className="flex items-center justify-center text-lg text-gray-800 h-[500px]">
                  This is newly added hotel. Rooms will be added soon.
                </div>
              ) : (
                rooms.map((room, idx) => {
                  const {
                    name,
                    size,
                    bedType,
                    capacity,
                    pricePerNight,
                    view,
                    images,
                    checkin,
                    checkout,
                  } = room;

                  const firstImg =
                    Array.isArray(images) && images.length !== 0 && images[0];

                  const isBooked =
                    checkout && moment(checkout).isAfter(moment());

                  return (
                    <div key={idx} className="grid grid-cols-6">
                      <div className="w-full px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        <img
                          src={`${BASE_URL}/${firstImg}`}
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.jpg")
                          }
                          alt="Image"
                          className="w-[200px] h-[180px] object-cover rounded-lg cursor-pointer"
                          onClick={imgClicked}
                        />
                      </div>
                      <div className="w-full font-semibold px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        {name}
                      </div>
                      <div className="w-full px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        <p className="text-md font-semibold mb-2">{bedType}</p>
                        <p>{size}</p>
                        <p>{view}</p>
                      </div>
                      <div className="w-full font-semibold px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        {capacity}
                      </div>
                      <div className="w-full font-semibold px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        {pricePerNight} Rs.
                        <hr className="my-2" />
                        <p className="my-2 text-sm font-normal">
                          Everything included
                        </p>
                        <p className="my-2 text-sm font-normal">No surcharge</p>
                      </div>
                      <div className="w-full font-semibold px-3 py-4 text-sm text-gray-500 border border-gray-300">
                        {isOwner ? (
                          <button
                            className="bg-gray-600 px-3 w-full py-2 rounded text-white"
                            onClick={() =>
                              setRoomModal({
                                isOpen: true,
                                data: room,
                              })
                            }
                          >
                            Edit
                          </button>
                        ) : isBooked ? (
                          <p className="text-sm font-bold">
                            This Room is Booked <br />
                            From <b>{checkin}</b> to <b>{checkout}</b>
                          </p>
                        ) : (
                          <button
                            className="bg-green-600 px-3 w-full py-2 rounded text-white"
                            onClick={() => onClickBookNow(room)}
                          >
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-5 border rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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

      <div className="mb-6 p-5 border rounded-md" id="map">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <hr className="my-4" />
        <div
          className="google-map-code rounded-lg"
          dangerouslySetInnerHTML={{ __html: map }}
        />
      </div>

      <div className="mb-6 p-5 border rounded-md" id="reviews">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {userDidBooking && !alreadyReviewed && (
          <div className="flex gap-3 justify-between flex-col md:flex-row my-2">
            <h1 className="text-gray-800 text-md mb-3">
              Looks like you have visited this hotel and haven't reviewd yet.
              Please leave a review.
            </h1>
            <div className="flex flex-col border rounded-lg p-5 min-w-[50%]">
              <div className="flex justify-between">
                <p className="font-bold my-2 text-gray-800">Leave a review:</p>
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

        <hr className="my-4" />

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
              <div className="flex-1 py-5 border-b border-gray-200">
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

                <p className="mt-3">{review.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
