"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDeletePostMutation } from "../../redux/services/postService";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddRoomMutation } from "@/redux/services/hotelService";
import { useEffect } from "react";

export default function AddRoom(props) {
  const { modal, setModal, refetch } = props;

  const { isOpen, data } = modal;

  const [addRoom] = useAddRoomMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      size: "",
      bedType: "",
      capacity: "",
      pricePerNight: "",
      view: "",
      images: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Room name is required"),
      description: Yup.string().required("Description is required"),
      size: Yup.string().required("Room size is required"),
      bedType: Yup.string().required("Bed type is required"),
      capacity: Yup.string().required("Capacity is required"),
      pricePerNight: Yup.string().required("Price per night is required"),
      view: Yup.string().required("View is required"),
    }),
    onSubmit: async (values) => {
      if (!data?.roomId && !values.images) {
        return toast.error("Please select images");
      }

      const formData = new FormData();
      formData.append("hotelId", data.hotelId);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("size", values.size);
      formData.append("pricePerNight", values.pricePerNight);
      formData.append("bedType", values.bedType);
      formData.append("capacity", values.capacity);
      formData.append("view", values.view);

      if (data?.roomId) {
        formData.append("roomId", data.roomId);
        formData.append("oldImages", JSON.stringify(data?.images));
      }

      if (values.images) {
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }
      }

      try {
        const res = await addRoom(formData).unwrap();
        toast.success(res.message);
        refetch();
        onClose();
        formik.resetForm();
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (data?.roomId) {
      const {
        name,
        size,
        bedType,
        description,
        capacity,
        pricePerNight,
        view,
      } = data;

      formik.setValues({
        name,
        description,
        size,
        bedType,
        capacity,
        pricePerNight,
        view,
      });
    }
  }, [isOpen]);

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

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform h-[90vh] rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="w-full mx-auto  sm:px-5 bg-white">
              <form
                onSubmit={formik.handleSubmit}
                className="h-full"
                encType="multipart/form-data"
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Add Room</h1>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="w-full bg-gray-500 text-white px-3 py-1 rounded-lg font-semibold"
                      onClick={onClose}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white px-3 py-1 rounded-lg font-semibold"
                    >
                      Save +
                    </button>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="w-full h-[70vh] overflow-auto">
                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Room Name
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
                        Room Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("size")}
                      />
                      {formik.touched.size && formik.errors.size && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.size}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Bed Type
                      </label>
                      <input
                        type="text"
                        name="bedType"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("bedType")}
                      />
                      {formik.touched.bedType && formik.errors.bedType && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.bedType}
                        </div>
                      )}
                    </div>

                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Capacity
                      </label>
                      <input
                        type="text"
                        name="capacity"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("capacity")}
                      />
                      {formik.touched.capacity && formik.errors.capacity && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.capacity}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 mx-1">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Price per Night
                      </label>
                      <input
                        type="text"
                        name="pricePerNight"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("pricePerNight")}
                      />
                      {formik.touched.pricePerNight &&
                        formik.errors.pricePerNight && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.pricePerNight}
                          </div>
                        )}
                    </div>

                    <div className="mb-3 mx-1 w-full">
                      <label className="block text-gray-700 font-semibold mb-2">
                        View
                      </label>
                      <input
                        type="text"
                        name="view"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        {...formik.getFieldProps("view")}
                      />
                      {formik.touched.view && formik.errors.view && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.view}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 mx-1">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Images
                    </label>

                    <input
                      type="file"
                      multiple
                      name="view"
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      onChange={(e) =>
                        formik.setValues({
                          ...formik.values,
                          images: e.target.files,
                        })
                      }
                    />

                    {formik.touched.images && formik.errors.images && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.images}
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
