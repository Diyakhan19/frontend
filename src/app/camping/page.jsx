"use client";
import React, { useEffect, useState } from "react";
import camping from "@/assets/images/camping.png";
import { useGetCampingsQuery } from "@/redux/services/campingService";
import CampingCard from "@/components/camping/CampingCard";
import Select from "@/components/common/Select";
import {
  cities,
  campings as campingTypes,
} from "@/components/common/constants";
import { useSearchParams } from "next/navigation";

const page = () => {
  const params = useSearchParams();
  const val = params.get("category");

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState(val || "");

  const { data, refetch } = useGetCampingsQuery({
    search: search,
    city: city,
    type: type,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(keyword);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const campings = data?.data;

  if (!campings) return;

  return (
    <div>
      <div className="relative w-full h-96">
        <img
          src={camping.src}
          alt="Destination Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <h1 className="absolute inset-x-0 top-20 sm:top-12 text-center text-white text-4xl font-bold">
          Kashmir Camping Escapes: Your Next Adventure
        </h1>

        <p className="absolute inset-x-0 top-52 md:top-32 lg:top-24 text-center text-white text-lg">
          Explore our chosen camping services
        </p>
      </div>

      <section className="px-5 lg:px-20 mt-5 w-full">
        <div>
          <h1 className="font-bold text-xl text-gray-700">
            Explore Kashmir’s Best Camping Services
          </h1>

          <p className="text-gray-600 mt-2">
            Camping in Kashmir is a great way to enjoy nature and explore the
            beauty of the outdoors. Whether you're new to camping or have done
            it before, there are many spots to choose from, like peaceful
            lakesides and beautiful mountain views. You can relax under the
            stars, breathe in the fresh air, and enjoy the quiet sounds of
            nature. Camping in Kashmir is perfect for anyone looking for a fun
            adventure or a calm, peaceful break from daily life.
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
              values={cities}
              label={city}
              onChange={(val) => setCity(val)}
            />
          </div>

          <div id="sorting" className="w-full lg:w-[40%]">
            <Select
              values={campingTypes}
              label={type}
              onChange={(val) => setType(val)}
            />
          </div>

          <button
            className="bg-primary text-white rounded-lg px-3 py-2 w-full lg:w-[20%]"
            onClick={() => {
              setCity("");
              setKeyword("");
              setType("");
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="my-10">
          {campings.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center border shadow rounded-lg">
              No camping services found
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {campings.map((item) => (
                <CampingCard data={item} refetch={refetch} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
