"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { useBookTransportMutation } from "@/redux/services/transportService";
import { useSelector } from "react-redux";

export default function BookTransport(props) {
  const { modal, setModal } = props;
  const { isOpen, data } = modal;

  const params = useParams();
  const router = useRouter();
  const transportId = params?.transportId;

  const { user } = useSelector((state) => state.auth);

  const [bookTranport] = useBookTransportMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      phone: "",
      email: "",
      passangers: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      nationality: Yup.string().required("Nationality is required"),
      phone: Yup.string().required("Phone no is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      passangers: Yup.string().required("No of passangers is required"),
    }),
    onSubmit: async (values) => {
      const body = {
        transportId: +transportId,
        name: values.name,
        nationality: values.nationality,
        phone: values.phone,
        email: values.email,
        passangers: values.passangers,
        pricePlan: data,
      };

      try {
        const res = await bookTranport(body).unwrap();
        toast.success(res.message);
        router.push(`/profile?userId=${user.userId}&tab=bookings`);
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
        className="fixed flex items-center justify-center inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex items-center h-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform max-h-[90vh] rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="w-full mx-auto sm:px-5 bg-white">
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
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

                <div className="w-full overflow-auto">
                  <div className="border border-gray-400 rounded-lg mt-2 mb-4 p-5">
                    Pricing Type Selected:
                    <span className="capitalize font-bold ml-2">
                      Per {data}
                    </span>
                  </div>
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

                  <div className="mb-3 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of passangers
                    </label>
                    <input
                      type="input"
                      name="passangers"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...formik.getFieldProps("passangers")}
                    />
                    {formik.touched.passangers && formik.errors.passangers && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.passangers}
                      </div>
                    )}
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
