"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Hotels", href: "#" },
  { name: "Transport", href: "#" },
  { name: "Marketplace", href: "/posts" },
  { name: "Company", href: "#" },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user: authUser } = useSelector((state) => state.auth);

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-4 lg:px-8 border-b"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
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
              className="text-sm font-semibold min-w-[100px] flex items-center justify-center leading-6 text-gray-900 shadow rounded-full border px-3 py-1 hover:bg-primary hover:text-white"
            >
              {item.name}
            </a>
          ))}
          <div className="hidden lg:flex lg:flex-1 justify-center items-center ml-10">
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
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
            <div className="-my-6 divide-y divide-gray-500/10">
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
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
