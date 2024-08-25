"use client";
import React from "react";
import Slider from "react-slick";
// import { useRouter } from "next/navigation";

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
        class="size-8"
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
        class="size-8"
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

const Carousel = (props) => {
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

                <div className="text-white absolute top-[25%] lg:top-[20%] left-4 md:left-10 md:leading-[35px]">
                  <h3 className="font-[600] text-[25px]">{item.title}</h3>
                  <h3 className="font-[600]">{item.district}</h3>
                </div>
                <div>
                  <button
                    className="px-2 md:px-4 pb-1 pt-[5px] rounded-md absolute 
                  bottom-5 md:bottom-15 left-4 md:left-10 text-white hover:scale-105 
                   font-[600]"
                  >
                    See Details
                  </button>
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

export default Carousel;
