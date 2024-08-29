"use client";
import React, { useEffect, useState } from "react";
import destination from "@/assets/images/destination.png";
import { useGetDestinationsQuery } from "@/redux/services/adminService";
import Card from "@/components/destinations/Card";
import Select from "@/components/common/Select";

const sortings = [
  { label: "Most recent", value: "Most recent" },
  { label: "Most visited", value: "Most visited" },
  { label: "Most liked", value: "Most liked" },
];

const page = () => {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Sort By");

  const { data, refetch } = useGetDestinationsQuery({
    search: search,
    sortBy: sortBy,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(keyword);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const destinations = data?.data;

  if (!destinations) return;

  return (
    <div>
      <div className="relative w-full h-96">
        <img
          src={destination.src}
          alt="Destination Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <h1 className="absolute inset-x-0 bottom-20 sm:bottom-12 text-center text-white text-4xl font-bold">
          Discover Your Next Adventure
        </h1>

        <p className="absolute inset-x-0 bottom-4 text-center text-white text-lg">
          Explore our exclusive chosen destinations
        </p>
      </div>

      <section className="px-5 lg:px-20 mt-5 w-full">
        <div>
          <h1 className="font-bold text-xl text-gray-700">
            Explore the Enchanting Beauty of Kashmir
          </h1>

          <p className="text-gray-600 mt-2">
            Nestled in the northern regions of Pakistan, Kashmir is a paradise
            on earth, renowned for its breathtaking landscapes, lush valleys,
            and serene lakes. Whether you're seeking adventure, tranquility, or
            cultural experiences, Kashmir offers an unforgettable journey
            through some of the most stunning natural wonders and historical
            treasures. Discover the hidden gems and explore the majestic beauty
            of this captivating region.
          </p>
        </div>

        <hr className="my-4 border" />

        <div className="w-full flex flex-col gap-2 md:flex-row justify-between">
          <div id="input" className="w-full lg:w-[40%]">
            <input
              type="text"
              className="text-gray-600 w-full"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div id="sorting" className="w-full lg:w-[40%]">
            <Select
              values={sortings}
              label={sortBy}
              onChange={(val) => setSortBy(val)}
            />
          </div>

          <button className="bg-primary text-white rounded-lg px-3 py-2 w-full lg:w-[20%]">
            Clear Filters
          </button>
        </div>

        <div className="my-10">
          <div className="grid grid-cols-12 gap-4">
            {destinations.map((item) => (
              <Card data={item} refetch={refetch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
