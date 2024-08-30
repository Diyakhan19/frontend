"use client";
import AddRoom from "@/components/modals/AddRoom";
import BookingModal from "@/components/modals/BookingModal";
import { useGetHotelQuery } from "@/redux/services/hotelService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import FslightboxReact from "fslightbox-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useParams();
  const hotelId = +params?.hotelId;

  const [roomModal, setRoomModal] = useState({
    isOpen: false,
    data: null,
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    data: null,
  });

  const { user } = useSelector((state) => state.auth);

  const { data, refetch } = useGetHotelQuery(hotelId);

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
    rating,
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
                if (indx > -1) {
                  return (
                    <img
                      src={`${BASE_URL}/${image}`}
                      alt="Product"
                      className="object-cover w-full h-full lg:h-[120px] xl:h-[177px]"
                    />
                  );
                }
              })}
              <img
                src={`${BASE_URL}/${images[0]}`}
                alt="Product"
                className="object-cover w-full h-full lg:h-[120px] xl:h-[177px]"
              />
            </div>
          </div>

          <div className="col-span-12 border shadow h-full px-5 lg:col-span-3">
            <div className="flex flex-col items-center gap-4 mt-4">
              <StarRatings
                rating={rating}
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
                className="w-full text-center min-w-[200px] px-4 py-2.5 bg-gray-200 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                See Reviews
              </a>
              <a
                href="#map"
                type="button"
                className="w-full text-center min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                See Map Location
              </a>
              <button
                type="button"
                className="w-full min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                Chat with owner
              </button>
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

        <div className="w-[1200px] min-w-[1200px] overflow-x-auto">
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
                    isBooked,
                    checkin,
                    checkout,
                  } = room;

                  const firstImg =
                    Array.isArray(images) && images.length !== 0 && images[0];

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
                            onClick={() =>
                              setBookingModal({ isOpen: true, data: room })
                            }
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
        <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
        <hr className="my-4" />
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{review.reviewer}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500 font-semibold text-xl">
                  {review.rating}
                </span>
                <span className="ml-2 text-gray-600">/ 5</span>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
