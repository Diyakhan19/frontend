"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import { useRouter } from "next/navigation";
import { useGetDestinationsQuery } from "@/redux/services/adminService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Destination = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetDestinationsQuery({ search });

  const destinations = data?.data;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(keyword);
    });

    return () => clearTimeout(timeout);
  }, [keyword]);

  if (!destinations) return;
  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="flex min-h-screen">
        <main className="flex-1 p-3 lg:ml-72">
          <div className="p-5 border shadow rounded-md min-h-[600px]">
            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-5">
              <h1 className="text-2xl font-bold text-gray-700">Destinations</h1>
              <div className="flex flex-col sm:flex-row gap-2 ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 rounded"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <select className="px-3 py-2 border h-[40px] min-w-[200px] text-gray-500 rounded-[6px] border-[#C5C2C2]">
                  <option>Filter by</option>
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                </select>
                <button
                  className="bg-gray-800 hover:bg-gray-600 text-white text-sm font-bold px-4"
                  onClick={() => router.push("/admin/destinations/new")}
                >
                  + Add New Destination
                </button>
              </div>
            </div>

            <hr className="my-5" />

            {destinations.length !== 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
                {destinations.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-3 shadow-lg"
                  >
                    <Image
                      src={`${BASE_URL}/${item.images[0]}`}
                      alt="Destination Image"
                      width={100}
                      height={100}
                      className="rounded-lg w-full h-[150px] xl:h-[200px] cursor-pointer"
                      onClick={() =>
                        router.push(`/destinations/${item.destinationId}`)
                      }
                    />
                    <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                    <p className="text-sm text-gray-500">
                      {item.location}, {item.district}
                    </p>

                    <p className="text-sm text-gray-700 mt-2 truncate">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] shadow rounded-md border text-gray-500 w-full">
                No destinations found
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Destination;
