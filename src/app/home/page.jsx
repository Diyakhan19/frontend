"use client";
import Carousel from "@/components/common/Carousel";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { useGetDestinationsQuery } from "@/redux/services/adminService";

const page = () => {
  const { data } = useGetDestinationsQuery({
    search: "",
    sortBy: "Top 5",
  });

  const destinations = data?.data;

  if (!destinations) return;

  const posts = [
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
    {
      title: "Boost your conversion",
      images: [
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      ],
    },
  ];

  return (
    <div>
      <Carousel data={destinations} />

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

        <CategoriesCarousel data={posts} />
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

      <div className="px-5 lg:px-20 my-10">
        {/* <div className="relative">
          <img
            src="/images/map.png"
            className="rounded-xl w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
        </div> */}
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
    </div>
  );
};

export default page;
