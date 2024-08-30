"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBookingMutation } from "@/redux/services/hotelService";

export default function BookingModal(props) {
  const { modal, setModal, refetch } = props;

  const { isOpen, data } = modal;

  const [booking] = useBookingMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      phone: "",
      email: "",
      checkin: "",
      checkout: "",
      guests: "",
      specialRequest: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      nationality: Yup.string().required("Nationality is required"),
      phone: Yup.string().required("Phone no is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      checkin: Yup.string().required("Checkin is required"),
      checkout: Yup.string().required("Checkout is required"),
      guests: Yup.string().required("Guests is required"),
    }),
    onSubmit: async (values) => {
      const body = {
        roomId: data.roomId,
        hotelId: data.hotelId,
        name: values.name,
        nationality: values.nationality,
        phone: values.phone,
        email: values.email,
        checkin: values.checkin,
        checkout: values.checkout,
        guests: values.guests,
        specialRequest: values.specialRequest,
      };

      try {
        const res = await booking(body).unwrap();
        toast.success(res.message);
        refetch();
        onClose();
        formik.resetForm();
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      }
    },
  });

  const onClose = () => {
    setModal({
      isOpen: false,
      data,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform h-auto max-h-[90vh] rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="w-full mx-auto sm:px-5 bg-white">
              <form
                onSubmit={formik.handleSubmit}
                className="h-full"
                encType="multipart/form-data"
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Booking Confirmation</h1>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="w-full bg-gray-500 text-white px-3 py-1 text-sm rounded-lg font-semibold"
                      onClick={onClose}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="w-full min-w-[160px] bg-primary text-white px-3 py-1 text-sm rounded-lg font-semibold"
                    >
                      Confirm Booking +
                    </button>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="w-full h-[70vh] overflow-auto">
                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>

                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("nationality")}
                      />
                      {formik.touched.nationality &&
                        formik.errors.nationality && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.nationality}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Checkin
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("checkin")}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {formik.touched.checkin && formik.errors.checkin && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.checkin}
                        </div>
                      )}
                    </div>

                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Checkout
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("checkout")}
                        min={
                          formik.values.checkin &&
                          new Date(formik.values.checkin)
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                      {formik.touched.checkout && formik.errors.checkout && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.checkout}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of guests
                    </label>
                    <input
                      type="input"
                      name="guests"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...formik.getFieldProps("guests")}
                    />
                    {formik.touched.guests && formik.errors.guests && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.guests}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Special Request
                    </label>
                    <textarea
                      type="input"
                      name="specialRequest"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...formik.getFieldProps("specialRequest")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
