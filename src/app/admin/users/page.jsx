"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import { useRouter } from "next/navigation";
import { useGetUsersQuery } from "@/redux/services/adminService";
import UserModal from "@/components/modals/UserModal";

const Destination = () => {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    user: null,
  });

  const { data, refetch } = useGetUsersQuery({ search });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(keyword);
    });

    return () => clearTimeout(timeout);
  }, [keyword]);

  useEffect(() => {
    if (!modal.isOpen) {
      refetch();
    }
  }, [modal.isOpen]);

  const users = data?.data;

  if (!users) return;

  return (
    <>
      <Sidebar />
      <Topbar />

      <UserModal modal={modal} setModal={setModal} />

      <div className="flex min-h-screen">
        <main className="flex-1 p-3 lg:ml-72 w-full">
          <div className="p-5 border shadow rounded-md min-h-[600px]">
            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-5">
              <h1 className="text-2xl font-bold text-gray-700">Users</h1>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 rounded w-full sm:w-[300px]"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>

            <hr className="my-5" />

            <div class="flow-root">
              <div class="overflow-x-auto">
                <div class="inline-block min-w-full py-2 overflow-auto align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300 overflow-auto">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Roles
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Posts
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Hotels
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Transports
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      {users.length !== 0 ? (
                        users.map((item) => (
                          <tr class="even:bg-gray-50">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                              {item.name}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.email}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                              {item.roles.toString()}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                              <span
                                className={`inline-flex items-center gap-x-1.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                                  item.status === "approved"
                                    ? "text-green-700 bg-green-100"
                                    : item.status === "rejected"
                                    ? "text-red-500 bg-red-100"
                                    : "text-yellow-700 bg-yellow-200"
                                }`}
                              >
                                <svg
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                  className={`h-1.5 w-1.5 ${
                                    item.status === "approved"
                                      ? "fill-green-500"
                                      : item.status === "rejected"
                                      ? "fill-red-500"
                                      : "fill-yellow-600"
                                  }`}
                                >
                                  <circle r={3} cx={3} cy={3} />
                                </svg>
                                {item.status}
                              </span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item._count.posts}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item._count.hotels}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item._count.transports}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button
                                className="bg-primary py-1 h-[30px] px-3 rounded text-white"
                                onClick={() =>
                                  setModal({ isOpen: true, user: item })
                                }
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr class="even:bg-gray-50">
                          <td colSpan={7}>
                            <div className="flex items-center justify-center h-[400px] text-gray-500">
                              No users found
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Destination;
