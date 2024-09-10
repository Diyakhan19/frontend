"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { name: "Hotels", href: "/hotels" },
  { name: "Transport", href: "/transports" },
  { name: "Marketplace", href: "/posts" },
  { name: "Destinations", href: "/destinations" },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  const { user: authUser, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      const admin = authUser?.roles?.includes("admin");
      if (admin) setIsAdmin(true);
    }
  }, [authUser]);

  useEffect(() => {
    setIsLogin(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-4 lg:px-8 border-b"
      >
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/logo.png" className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex gap-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold min-w-[100px] cursor-pointer flex items-center justify-center leading-6 shadow rounded-full border px-3 py-1 hover:bg-primary hover:text-white ${
                path.includes(item.href)
                  ? "text-white bg-primary"
                  : "text-gray-900"
              }`}
            >
              {item.name}
            </a>
          ))}

          <div
            className={`text-sm font-semibold cursor-pointer w-[35px] h-[35px] flex items-center justify-center leading-6 shadow rounded-full border p-1 hover:bg-primary hover:text-white ${
              path.includes("/chat")
                ? "text-white bg-primary"
                : "text-gray-900 bg-white"
            }`}
            onClick={() => {
              if (!isAuthenticated) return router.push("/login");
              router.push("/chat");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-[18px]"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
          </div>

          <div className="hidden lg:flex lg:flex-1 justify-center items-center ml-10">
            {isLogin ? (
              isAdmin ? (
                <a
                  href={"/admin/destinations"}
                  className="text-sm font-semibold min-w-[100px] flex items-center justify-center leading-6 bg-primary text-white shadow rounded-full border px-3 py-1 hover:bg-gray-500 hover:text-white"
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href={`/profile?userId=${user?.userId}`}
                  className="group block flex-shrink-0"
                >
                  <div className="flex justify-center items-center">
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                    <div>
                      <img
                        alt=""
                        src={
                          user?.image
                            ? `${BASE_URL}/${user?.image}`
                            : "/images/female.png"
                        }
                        onError={(e) => (e.target.src = "/images/female.png")}
                        className="inline-block h-9 w-9 rounded-full object-cover"
                      />
                    </div>
                  </div>
                </a>
              )
            ) : (
              <a
                className="-mx-3 flex gap-1 items-center justify-center rounded-full px-3 py-2 text-base border shadow font-semibold leading-7 text-gray-900 hover:bg-gray-300"
                href="/login"
              >
                <p className="text-sm font-bold">Login</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/home" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/logo.png" className="h-10 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div>
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base border shadow font-semibold leading-7 text-gray-900 hover:bg-primary hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <hr className="my-5" />

              <div className="flex flex-1 justify-center items-center">
                {isLogin ? (
                  isAdmin ? (
                    <a
                      href={"/admin/destinations"}
                      className="text-sm font-semibold min-w-[100px] flex items-center justify-center leading-6 bg-primary text-white shadow rounded-full border px-3 py-1 hover:bg-gray-500 hover:text-white"
                    >
                      Dashboard
                    </a>
                  ) : (
                    <div className="flex items-center border shadow rounded-lg justify-between px-4 py-2 w-full">
                      <div className="w-full">
                        <div
                          className={`text-sm font-semibold cursor-pointer w-[50px] h-[50px] flex items-center justify-center leading-6 shadow rounded-full border p-1 hover:bg-primary hover:text-white ${
                            path.includes("/chat")
                              ? "text-white bg-primary"
                              : "text-gray-900 bg-white"
                          }`}
                          onClick={() => {
                            if (!isAuthenticated) return router.push("/login");
                            router.push("/chat");
                            setMobileMenuOpen(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-[22px]"
                          >
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                          </svg>
                        </div>
                      </div>

                      <a
                        href={`/profile?userId=${user?.userId}`}
                        className="group flex-shrink-0 w-full p-2"
                      >
                        <div className="flex justify-center items-center">
                          <div className="mr-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                              View profile
                            </p>
                          </div>
                          <div>
                            <img
                              alt=""
                              src={
                                user?.image
                                  ? `${BASE_URL}/${user?.image}`
                                  : "/images/female.png"
                              }
                              onError={(e) =>
                                (e.target.src = "/images/female.png")
                              }
                              className="inline-block h-12 w-12 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                ) : (
                  <a
                    className="-mx-3 flex gap-1 items-center justify-center rounded-full px-3 py-2 text-base border shadow font-semibold leading-7 text-gray-900 hover:bg-gray-300"
                    href="/login"
                  >
                    <p className="text-sm font-bold">Login</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
