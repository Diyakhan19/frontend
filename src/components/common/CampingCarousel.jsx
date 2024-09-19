"use client";
import React from "react";
import Slider from "react-slick";
import { campings } from "./constants";
import { useRouter } from "next/navigation";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute right-5 top-[44%] hover:cursor-pointer hover:scale-105 hidden md:block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-8"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
          stroke="white"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute left-3 top-[44%] z-20 hover:cursor-pointer hover:scale-105  hidden md:block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-8"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
          stroke="white"
        />
      </svg>
    </div>
  );
}

const CampingCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "",
    responsive: [
      {
        breakpoint: 500,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const router = useRouter();

  const onClickCategory = (category) => {
    router.push(`/camping?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <div className="relative">
        <Slider {...settings}>
          {campings.map((item, indx) => {
            return (
              <div>
                <div
                  className="rounded-xl overflow-hidden relative w-[97%] cursor-pointer hover:opacity-80"
                  onClick={() => onClickCategory(item.label)}
                >
                  <img
                    src={item.image.src}
                    alt="Card"
                    className="w-full h-[240px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-0 left-0 right-0 text-white p-2 text-center font-bold text-lg">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CampingCarousel;
