"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useGetPostsMutation } from "../../redux/services/postService";
import Posts from "@/components/posts/Posts";
import Select from "@/components/common/Select";
import { cities, categories } from "@/components/common/constants";

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "All New Arrivals" },
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];

const page = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [getAllPosts, { isLoading }] = useGetPostsMutation();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

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
  };

  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
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
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    key={section.name}
                    as="div"
                    className="border-t border-gray-200 pb-4 pt-4"
                  >
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pb-2 pt-4">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                defaultValue={option.value}
                                id={`${section.id}-${optionIdx}-mobile`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}-mobile`}
                                className="ml-3 text-sm text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Marketplace
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Explore a wide selection of local goods from Kashmir, available
              online for easy purchase.
            </p>
          </div>

          <div className="sticky top-0">
            <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
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
                            onChange={(val) => setCategory(val)}
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
                            onChange={(val) => setCity(val)}
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
              </aside>

              <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3 overflow-auto">
                <Posts posts={posts} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
