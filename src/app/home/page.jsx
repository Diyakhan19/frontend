"use client";
import DestinationsCarousel from "@/components/common/DestinationsCarousel";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { useGetDestinationsQuery } from "@/redux/services/adminService";
import { useGetHotelsMutation } from "@/redux/services/hotelService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const { data } = useGetDestinationsQuery({
    search: "",
    sortBy: "Top 5",
  });

  const destinations = data?.data;

  const [hotels, setHotels] = useState([]);
  const [getHotels] = useGetHotelsMutation();

  useEffect(() => {
    getHotels({ search: "", limit: 4, sortBy: "rating" })
      .unwrap()
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!destinations) return;

  return (
    <div>
      <DestinationsCarousel data={destinations} />

      <div className="px-5 lg:px-20 py-5">
        <div className="px-1 mb-5">
          <h1 className="text-gray-700 text-xl font-bold my-2">
            Explore High Rated Hotels
          </h1>
          <p className="text-gray-500">
            Explore our highest-rated hotels, each offering exceptional comfort
            and service for an unforgettable stay.
          </p>
          <hr className="my-2" />
        </div>
        <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-2 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {hotels.length !== 0 &&
            hotels.map((hotel) => (
              <div
                key={hotel.hotelId}
                className="cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-20 sm:pt-48 lg:pt-40 xl:pt-[250px] hover:opacity-80"
                onClick={() => router.push(`/hotels/${hotel?.hotelId}`)}
              >
                <img
                  alt=""
                  src={`${BASE_URL}/${hotel.images[0]}`}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <div className="mr-8">{hotel?.city}</div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <div>
                    <span className="absolute inset-0" />
                    {hotel?.name}
                  </div>
                </h3>
              </div>
            ))}
        </div>
      </div>

      <div className="px-5 lg:px-20 bg-[#def7fa] justify-between w-full h-auto mt-10 py-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-700">Kashmir</h1>
          <p className="text-gray-500 my-5 text-lg">
            Welcome to Explore Kashmir, a place where you can discover the
            beauty and culture of Kashmir, Pakistan. Known as "Paradise on
            Earth," Kashmir is famous for its stunning mountains, peaceful
            lakes, and beautiful valleys. But it's not just the scenery—Kashmir
            is also rich in history and traditions, offering a unique blend of
            nature and culture that you'll love to explore. Whether you're
            looking for adventure or a peaceful getaway, Kashmir has something
            special for everyone. Experience the warmth and hospitality of the
            Kashmiri people, who welcome visitors with open arms and a rich
            cultural heritage.
          </p>
        </div>

        <div className="w-full flex items-center justify-center">
          <img
            src={"/images/kashmir.jpg"}
            className="w-[500px] h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="px-5 lg:px-20 py-5">
        <div className="px-1 my-5">
          <h1 className="text-gray-700 text-xl font-bold my-2">
            Looking for something?
          </h1>
          <p className="text-gray-500">
            Explore our marketplace categories to discover a wide range of
            products and services waiting just for you.
          </p>
          <hr className="my-2" />
        </div>

        <CategoriesCarousel />
      </div>

      <div className="px-5 lg:px-20 my-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200244.5741779084!2d73.66433502217359!3d33.997943637386875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e0664f86c46b47%3A0x66e68158b10f30a4!2sBagh!5e0!3m2!1sen!2snl!4v1724870100771!5m2!1sen!2snl"
          width="600"
          height="450"
          style={{
            border: 0,
            width: "100%",
            borderRadius: "15px",
            border: "1px solid lightgray",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="px-5 lg:px-20 bg-yellow-50 justify-between w-full h-auto mt-10 py-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-700">About</h1>
          <p className="text-gray-500 my-5 text-lg">
            Explore Kashmir is a web-based platform to showcase the beauty and
            opportunities within Kashmir, Pakistan. The website features
            multiple modules including destinations, hotels, transports, and
            marketplace, allowing users to explore tourist attractions, book
            accommodations, and find transportation options. Additional
            functionalities such as a chat system for user interaction and a
            profile module for personalized experiences are integrated to
            enhance user engagement and provide a seamless browsing and booking
            experience for visitors.
          </p>
        </div>

        <div className="w-full flex items-center justify-center">
          <img
            src={"/logo.png"}
            className="w-[400px] h-auto rounded-lg p-5 bg-white border"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
