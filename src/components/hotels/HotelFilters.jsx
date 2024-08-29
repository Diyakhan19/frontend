import { useGetHotelsMutation } from "@/redux/services/hotelService";
import React, { useEffect, useState } from "react";
import { cities, facilities } from "@/components/common/constants";
import Select from "../common/Select";

const HotelFilters = ({ setHotels, setSidebar }) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const [getHotels] = useGetHotelsMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      getHotels({ search, city, facilities: selectedFacilities })
        .unwrap()
        .then((res) => {
          setHotels(res.data);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, city, selectedFacilities]);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setSelectedFacilities([]);
  };

  const onClickCheckBox = (facility) => {
    const arr = [...selectedFacilities];
    const indx = arr.indexOf(facility);
    if (indx > -1) {
      arr.splice(indx, 1);
    } else {
      arr.push(facility);
    }
    setSelectedFacilities(arr);
  };

  return (
    <div>
      <form className="space-y-5 divide-y divide-gray-200">
        <div>
          <div
            className="px-3 py-2 cursor-pointer flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            onClick={clearFilters}
          >
            Clear Filters
          </div>
        </div>

        <div className="pt-5">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Search
            </legend>
            <div className="space-y-3 pt-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="w-full"
              />
            </div>
          </fieldset>
        </div>

        <div className="pt-5">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              City
            </legend>
            <div className="space-y-3 pt-3">
              <Select
                values={cities}
                label={city}
                onChange={(val) => {
                  setCity(val);
                  setSidebar(false);
                }}
              />
            </div>
          </fieldset>
        </div>

        <div className="pt-5">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900 mb-5">
              Facilities
            </legend>
            <div className="flex flex-col gap-3 max-h-[500px] overflow-auto px-1 py-2">
              {facilities.map((item) => (
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    className="rounded cursor-pointer"
                    onClick={() => onClickCheckBox(item)}
                    checked={selectedFacilities.includes(item)}
                  />
                  <p className="capitalize text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default HotelFilters;
