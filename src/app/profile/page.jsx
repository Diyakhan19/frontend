"use client";
import { useGetUserByIdQuery } from "../../redux/services/userService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "@/components/destinations/Card";
import PostCard from "@/components/posts/Card";
import HotelCard from "@/components/hotels/HotelCard";
import TransportCard from "@/components/transports/TransportCard";
import { deleteCookie } from "cookies-next";
import moment from "moment";
import { useGetTransportsMutation } from "@/redux/services/transportService";
import { resetAuth } from "@/redux/reducers/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="size-4"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const userId = params.get("userId");
  const tabSelected = params.get("tab");

  const { isAuthenticated, user: currentUser } = useSelector(
    (state) => state.auth
  );

  const [transports, setTrasports] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const { data } = useGetUserByIdQuery(userId);
  const [getTransports] = useGetTransportsMutation();

  const [tab, setTab] = useState("posts");
  const user = data?.data;

  useEffect(() => {
    if (tabSelected) {
      setTab(tabSelected);
    }
  }, [tabSelected]);

  useEffect(() => {
    if (user) {
      const trasportIds = user.bookmarks;
      getTransports({ search: "", trasportIds: trasportIds })
        .then((res) => {
          setTrasports(res.data.data);
        })
        .catch((err) => {});
    }
  }, [user]);

  if (!user) return;

  const isMe = user.userId === currentUser?.userId;

  const bookings = user?.bookings;
  const rentals = user?.rented;

  const favPosts = user.favorites
    .filter((item) => item.postId)
    .map((item) => item.post);

  const favDestinations = user.favorites
    .filter((item) => item.destinationId)
    .map((item) => item.destination);

  const onClickLogout = () => {
    deleteCookie("token");
    localStorage.clear();
    dispatch(resetAuth());
  };

  const onClickLink = (type) => {
    if (user.status === "approved") {
      if (type === "hotel") router.push("/hotels/new");
      else if (type === "transport") router.push("/transports/new");
    } else {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 10000);
    }
  };

  return (
    <>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-10/12 lg:mx-auto mb-8 mx-2">
          {isAuthenticated && isMe && (
            <div className="my-3 w-full shadow border rounded-lg px-3 py-2">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between h-full w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="/posts/new"
                    className="cursor-pointer mx-1 gap-2 items-center justify-between rounded-full px-3 py-1 border shadow text-gray-600 flex hover:bg-gray-200"
                  >
                    <p>Post an Ad</p>
                    <Arrow />
                  </a>

                  {user?.roles?.includes("vendor") && (
                    <>
                      <div
                        className="cursor-pointer mx-1 gap-2 items-center justify-between rounded-full px-3 py-1 border shadow text-gray-600 flex hover:bg-gray-200"
                        onClick={() => onClickLink("hotel")}
                      >
                        <p>Post a hotel</p>
                        <Arrow />
                      </div>

                      <div
                        className="cursor-pointer mx-1 gap-2 items-center justify-between rounded-full px-3 py-1 border shadow text-gray-600 flex hover:bg-gray-200"
                        onClick={() => onClickLink("transport")}
                      >
                        <p>Post a transport</p>
                        <Arrow />
                      </div>
                    </>
                  )}
                </div>

                <a
                  className=" bg-red-500 hover:bg-gray-400 cursor-pointer text-white py-1 px-3 gap-2 flex shadow border items-center justify-between rounded-full"
                  onClick={onClickLogout}
                  href="/home"
                >
                  <p>Logout</p>
                  <Arrow />
                </a>
              </div>
            </div>
          )}

          {showWarning && (
            <div className="bg-red-200 rounded shadow border border-red-300 flex items-center p-2 text-red-500">
              You can not perform this action. Your account is not approved.
              Please contact Admin to get your account approved.
            </div>
          )}

          <header className="flex flex-col sm:flex-row flex-wrap items-center p-4 md:py-8 rounded-lg shadow border my-2">
            <div className="w-full flex flex-col sm:flex-row gap-2">
              <div className="md:w-3/12 flex items-center justify-center">
                <img
                  className="w-40 h-40 object-cover rounded-full
               border-2 border-primary p-1"
                  src={
                    user?.image
                      ? `${BASE_URL}/${user?.image}`
                      : "/images/female.png"
                  }
                  alt="profile"
                />
              </div>
              <div className="w-8/12 md:w-7/12 ml-4">
                <div className="md:flex md:flex-wrap md:items-center mb-4">
                  <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {user?.name}
                  </h2>
                  <span
                    className="inline-block fas fa-certificate fa-lg text-blue-500 
                         relative mr-6 text-xl transform -translate-y-2"
                    aria-hidden="true"
                  >
                    <i
                      className="fas fa-check text-white text-xs absolute inset-x-0
                         ml-1 mt-px"
                    />
                  </span>
                  <span
                    className={`inline-flex items-center gap-x-1.5 capitalize rounded-full px-1.5 py-0.5 text-xs font-medium ${
                      user?.status === "approved"
                        ? "text-green-700 bg-green-100"
                        : user?.status === "rejected"
                        ? "text-red-500 bg-red-100"
                        : "text-yellow-700 bg-yellow-200"
                    }`}
                  >
                    <svg
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 ${
                        user?.status === "approved"
                          ? "fill-green-500"
                          : user?.status === "rejected"
                          ? "fill-red-500"
                          : "fill-yellow-600"
                      }`}
                    >
                      <circle r={3} cx={3} cy={3} />
                    </svg>
                    {user?.status}
                  </span>
                </div>
                <ul className="hidden md:flex space-x-8 mb-4">
                  <li>
                    <span className="font-semibold mr-1">
                      {user?.posts?.length}
                    </span>
                    Posts
                  </li>
                  <li>
                    <span className="font-semibold mr-1">
                      {user?.hotels?.length}
                    </span>
                    Hotels
                  </li>
                  <li>
                    <span className="font-semibold mr-1">
                      {user?.transports?.length}
                    </span>
                    Tranports
                  </li>
                </ul>
                <div className="hidden md:block">
                  <h1 className="font-semibold">{user?.email}</h1>
                  <p className="text-sm mt-2">{user?.about}</p>
                </div>
              </div>
              <div className="md:hidden text-sm my-2">
                <h1 className="font-semibold">{user?.email}</h1>
                <p>{user?.about}</p>
              </div>
            </div>
          </header>
          <div className="px-px md:px-3">
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.posts?.length}
                </span>
                Posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.hotels?.length}
                </span>
                Hotels
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.transports?.length}
                </span>
                Transports
              </li>
            </ul>

            <ul
              className="flex items-center justify-around md:justify-center space-x-4 lg:space-x-10  
              uppercase tracking-widest font-semibold text-xs text-gray-600 border-t"
            >
              <li
                className={`md:border-t md:-mt-px md:text-gray-700 cursor-pointer ${
                  tab === "posts" && "md:border-gray-700"
                }`}
                onClick={() => setTab("posts")}
              >
                <div className="p-3 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="hidden md:inline">posts</span>
                </div>
              </li>

              {user?.roles.includes("vendor") && (
                <>
                  <li
                    className={`cursor-pointer md:border-t ${
                      tab === "hotels" && "md:border-gray-700"
                    }`}
                    onClick={() => setTab("hotels")}
                  >
                    <div className="p-3 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                        <path
                          fill-rule="evenodd"
                          d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <span className="hidden md:inline">hotels</span>
                    </div>
                  </li>
                  <li
                    className={`cursor-pointer md:border-t ${
                      tab === "trasports" && "md:border-gray-700"
                    }`}
                    onClick={() => setTab("trasports")}
                  >
                    <div className="p-3 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                        <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                        <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>

                      <span className="hidden md:inline">Transport</span>
                    </div>
                  </li>
                </>
              )}

              {isAuthenticated && isMe && (
                <>
                  <li
                    className={`cursor-pointer md:border-t ${
                      tab === "favorites" && "md:border-gray-700"
                    }`}
                    onClick={() => setTab("favorites")}
                  >
                    <div className="p-3 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>

                      <span className="hidden md:inline">favorites</span>
                    </div>
                  </li>

                  <li
                    className={`cursor-pointer md:border-t ${
                      tab === "bookings" && "md:border-gray-700"
                    }`}
                    onClick={() => setTab("bookings")}
                  >
                    <div className="p-3 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                      </svg>

                      <span className="hidden md:inline">my bookings</span>
                    </div>
                  </li>
                </>
              )}
            </ul>

            <hr className="mb-3" />

            <div className="border shadow rounded-lg p-5 min-h-[600px]">
              {tab === "posts" ? (
                user?.posts.length === 0 ? (
                  "No posts found"
                ) : (
                  <div className="grid grid-cols-12 gap-2">
                    {user.posts.map((post) => (
                      <div className="grid col-span-12 md:col-span-4 lg:col-span-3">
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                )
              ) : tab === "hotels" ? (
                user?.hotels.length === 0 ? (
                  "No hotels found"
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    {user.hotels.map((item) => (
                      <HotelCard data={item} />
                    ))}
                  </div>
                )
              ) : tab === "trasports" ? (
                user?.transports.length === 0 ? (
                  "No transports found"
                ) : (
                  <div className="grid grid-cols-12 gap-2">
                    {user.transports.map((transport) => (
                      <div className="grid col-span-12 md:col-span-6 xl:col-span-4">
                        <TransportCard transport={transport} />
                      </div>
                    ))}
                  </div>
                )
              ) : tab === "bookings" ? (
                bookings.length === 0 && rentals.length === 0 ? (
                  "No bookings found"
                ) : (
                  <div>
                    <h1 className="my-2 font-bold">
                      Hotel Bookings: {bookings.length}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {bookings.map((item) => {
                        const { hotel } = item.room;
                        return (
                          <div className="border border-borderCol shadow rounded-lg text-sm truncate">
                            <Link
                              href={`/hotels/${item.room.hotel.hotelId}`}
                              className="flex flex-col bg-gray-200"
                            >
                              <img
                                src={`${BASE_URL}/${hotel.images[0]}`}
                                className="rounded-t-lg h-full w-full min-h-[150px] max-h-[150px] object-cover"
                              />
                              <div className="p-2">
                                <span className="font-semibold mr-1">
                                  Hotel:
                                </span>
                                {hotel.name}
                              </div>
                            </Link>
                            <div className="flex w-full px-2 py-1 mt-[1px] bg-gray-200">
                              <span className="font-semibold mr-1">Room:</span>
                              {item.room.name}
                            </div>
                            <div className="my-1 p-2">
                              <b>Checkin:</b>{" "}
                              {moment(item.checkin).format("DD-MM-YYYY")} <br />
                              <b>Checkout:</b>{" "}
                              {moment(item.checkout).format("DD-MM-YYYY")}{" "}
                              <br />
                              <b>Guests:</b> {item.guests} <br />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <hr className="my-4" />

                    <h1 className="my-2 font-bold">
                      Vehicles Rented: {rentals.length}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {rentals.map((item) => (
                        <div className="border border-borderCol shadow rounded-lg text-sm truncate">
                          <Link
                            href={`/transports/${item.transportId}`}
                            className="flex flex-col bg-gray-200"
                          >
                            <img
                              src={`${BASE_URL}/${item.transport.images[0]}`}
                              className="rounded-t-lg h-full w-full min-h-[150px] max-h-[150px] object-cover"
                            />
                            <div className="p-2">
                              <span className="font-semibold mr-1">
                                Vehicle:
                              </span>
                              {item.transport.title}
                            </div>
                          </Link>

                          <div className="flex mt-[1px] px-2 py-1 bg-gray-200">
                            <span className="font-semibold mr-1">Type:</span>
                            {item.transport.type}
                          </div>
                          <div className="my-1 p-2">
                            <b>Plan:</b> Per {item.pricePlan} <br />
                            <b>Rented On:</b>{" "}
                            {moment(item.createdAt).format("DD-MM-YYYY")} <br />
                            <b>Passangers:</b> {item.passangers} <br />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <div>
                    <h1 className="my-2 font-bold ">
                      Favorite Destinations: {favDestinations.length}
                    </h1>
                    <div className="grid grid-cols-12 gap-2">
                      {favDestinations.map((item) => (
                        <Card data={item} />
                      ))}
                    </div>

                    <hr className="my-4" />

                    <h1 className="my-2 font-bold ">
                      Favorite Posts: {favPosts.length}
                    </h1>
                    <div className="grid grid-cols-12 gap-2">
                      {favPosts.map((post) => (
                        <div className="grid col-span-12 md:col-span-4 lg:col-span-3">
                          <PostCard post={post} />
                        </div>
                      ))}
                    </div>

                    <hr className="my-4" />
                    <h1 className="my-2 font-bold ">
                      Bookmarked Transports: {transports.length}
                    </h1>
                    <div className="grid grid-cols-12 gap-2">
                      {transports.map((transport) => (
                        <div className="grid col-span-12 md:col-span-6 xl:col-span-4">
                          <TransportCard transport={transport} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
