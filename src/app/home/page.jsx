"use client";
import Carousel from "@/components/common/Carousel";
import { useGetDestinationsQuery } from "@/redux/services/adminService";

const page = () => {
  const { data, isLoading } = useGetDestinationsQuery({ search: "" });

  const destinations = data?.data;

  if (!destinations) return;

  return (
    <div>
      <Carousel data={destinations} />
    </div>
  );
};

export default page;
