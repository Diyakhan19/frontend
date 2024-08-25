"use client";
import Carousel from "@/components/common/Carousel";
import CategoriesCarousel from "@/components/common/CategoriesCarousel";
import { useGetDestinationsQuery } from "@/redux/services/adminService";

const page = () => {
  const { data, isLoading } = useGetDestinationsQuery({ search: "" });

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

      <div className="px-20 py-5">
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
    </div>
  );
};

export default page;
