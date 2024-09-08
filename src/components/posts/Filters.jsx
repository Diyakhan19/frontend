import { useGetPostsMutation } from "@/redux/services/postService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "@/components/common/Select";
import { cities, categories } from "@/components/common/constants";

const Filters = ({ setPosts, setSidebar }) => {
  const params = useSearchParams();
  const val = params.get("category");

  const [getAllPosts] = useGetPostsMutation();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(val || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllPosts({ search, city, category })
        .unwrap()
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, city, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setCity("");
    setSidebar(false);
  };

  return (
    <div>
      <form className="space-y-5 divide-y divide-gray-200">
        <div>
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
              Category
            </legend>
            <div className="space-y-3 pt-3">
              <Select
                values={categories}
                label={category}
                onChange={(val) => {
                  setCategory(val);
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
      </form>
    </div>
  );
};

export default Filters;
