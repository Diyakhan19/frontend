"use client";

import { useUpdateUserStatusMutation } from "@/redux/services/adminService";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const UserModal = ({ modal, setModal }) => {
  const { isOpen, user } = modal;

  const onClose = () => {
    setModal({
      isOpen: false,
      user: null,
    });
  };

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const onAction = async (status) => {
    try {
      const body = { userId: user.userId, status };
      const res = await updateUserStatus(body).unwrap();
      toast.success(res.message);
      onClose();
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
              <div className="flex flex-1 flex-col p-5">
                <img
                  alt="noImage"
                  src={
                    user?.image
                      ? `${BASE_URL}/${user?.image}`
                      : "/images/female.png"
                  }
                  className="mx-auto h-40 w-40 flex-shrink-0 rounded-lg object-cover"
                  onError={(e) => (e.target.src = "/images/female.png")}
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {user?.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="inline-flex capitalize items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {user?.roles.toString()}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <EnvelopeIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => onAction("rejected")}
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => onAction("approved")}
                className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Approve
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UserModal;
