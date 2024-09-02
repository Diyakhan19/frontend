import { useGetTransportsMutation } from "@/redux/services/transportService";
import { useEffect, useState } from "react";
import Select from "../common/Select";
import { cities, transports } from "../common/constants";

const Filters = ({ setTransports, setSidebar }) => {
  const [getTransports] = useGetTransportsMutation();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      getTransports({ search, city, type })
        .unwrap()
        .then((res) => {
          setTransports(res.data);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, city, type]);

  const clearFilters = () => {
    setSearch("");
    setType("");
    setCity("");
    setSidebar(false);
  };

  return (
    <div>
      <div className="space-y-5 divide-y divide-gray-200">
        <div>
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-900"
            >
              Search
            </label>
            <div className="space-y-3 pt-3">
              <input
                type="text"
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-900">
              Type
            </legend>
            <div className="space-y-3 pt-3">
              <Select
                values={transports}
                label={type}
                onChange={(val) => {
                  setType(val);
                  setSidebar(false);
                }}
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
          <div
            className="px-3 py-2 cursor-pointer flex items-center justify-center bg-primary text-white rounded-lg"
            onClick={clearFilters}
          >
            Clear Filters
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
