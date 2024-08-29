"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "@/components/common/Select";
import Card from "@/components/hotels/HotelCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useGetHotelsMutation } from "@/redux/services/hotelService";
import HotelFilters from "@/components/hotels/HotelFilters";

const page = () => {
  const [sidebar, setSidebar] = useState(false);

  const [hotels, setHotels] = useState([]);

  const [getHotels] = useGetHotelsMutation();

  useEffect(() => {
    getHotels({ search: "" });
  }, []);

  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={sidebar}
          onClose={setSidebar}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setSidebar(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <form className="mt-4 px-3">
                <HotelFilters setHotels={setHotels} setSidebar={setSidebar} />
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Hotels
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Explore a wide range of hotels and restaurants to find your self a
              comfortable place to stay.
            </p>
          </div>

          <div className="sticky top-0">
            <div className="pt-5 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <div className="col-span-4">
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  onClick={() => setSidebar(true)}
                  className="inline-flex items-center lg:hidden"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filters
                  </span>
                  <PlusIcon
                    aria-hidden="true"
                    className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                </button>

                <div className="hidden lg:block">
                  <HotelFilters setHotels={setHotels} setSidebar={setSidebar} />
                </div>
              </div>

              <div className="col-span-8">
                {hotels.length === 0 ? (
                  <div className="flex items-center justify-center h-[600px] border rounded-lg text-lg">
                    No hotels found
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    {hotels.map((item) => (
                      <Card data={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
