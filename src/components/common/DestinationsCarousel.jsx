"use client";
import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute right-10 top-[50%] hover:cursor-pointer hover:scale-105 hidden md:block">
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
    <div className="absolute left-10 top-[50%] z-20 hover:cursor-pointer hover:scale-105  hidden md:block">
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

const DestinationsCarousel = (props) => {
  const router = useRouter();
  let { data } = props;

  // const router = useRouter();
  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
        },
      },
    ],
  };

  return (
    <>
      <div className="relative">
        <Slider {...settings}>
          {data.map((item, indx) => {
            return (
              <div key={indx} className="relative">
                <div className="h-[250px] md:h-[280px] lg:h-[70vh] overflow-hidden">
                  <img
                    src={`${BASE_URL}/${item.images[0]}`}
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                    alt="Image"
                    className="w-full h-full object-cover brightness-[100%]"
                  />
                </div>

                <div className="text-white h-[150px] bg-gradient-to-t from-black via-black/70 to-transparent w-full absolute bottom-0 md:leading-[35px] flex items-center justify-center flex-col">
                  <h3
                    className="font-bold text-[25px] hover:scale-110 cursor-pointer"
                    onClick={() =>
                      router.push(`/destinations/${item.destinationId}`)
                    }
                  >
                    {item.title}
                  </h3>
                  <h3 className="font-bold">{item.district}</h3>
                </div>
              </div>
            );
          })}

          {data.length === 0 && (
            <div className="relative h-[250px] md:h-[280px] lg:h-[400px]">
              <img
                src="/images/placeholder.jpg"
                onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                alt="Image"
                className="rounded-md w-full h-[250px] md:h-[280px] lg:h-[400px] brightness-[100%]"
              />
              <div className="bg-[#E74040] text-[#FFFFFF] text-[12px] font-semibold px-2 rounded-[4px] h-[25px] w-[250px] md:h-[25px] left-2 md:left-10 flex items-center justify-center absolute top-2 md:top-6">
                Destinations
              </div>
            </div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default DestinationsCarousel;
