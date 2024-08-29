"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Select from "@/components/common/Select";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  cities,
  facilities as facilitiesArr,
} from "@/components/common/constants";
import { useCreateHotelMutation } from "@/redux/services/hotelService";

const page = () => {
  const router = useRouter();
  const [createHotel, { isLoading }] = useCreateHotelMutation();

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      mapUrl: "",
      category: "",
      facilities: [],
      images: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      mapUrl: yup.string().required("Map URL is required"),
      facilities: yup.array().min(1, "Facilities is required"),
    }),
    onSubmit: async (values) => {
      const { name, description, city, address, mapUrl, facilities, images } =
        values;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("mapUrl", mapUrl);
      formData.append("city", city);
      formData.append("facilities", JSON.stringify(facilities));

      if (images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      try {
        const res = await createHotel(formData).unwrap();
        toast.success(res.message);
        router.push(`/profile?userId=${user?.userId}`);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    formik;

  const { name, description, address, mapUrl, city, facilities, images } =
    values;

  const [facility, setFacility] = useState(null);

  const onChangeFacility = (item) => {
    const arr = [...facilities, item.toLowerCase()];

    setValues({
      ...values,
      facilities: arr,
    });
    setFacility(null);
  };

  const onRemoveFacility = (indx) => {
    const arr = [...facilities];
    arr.splice(indx, 1);
    setValues({
      ...values,
      facilities: arr,
    });
  };

  const onRemoveImage = (indx) => {
    const arr = [...images];
    arr.splice(indx, 1);
    setValues({
      ...values,
      images: arr,
    });
  };

  let imgUrls = [];
  for (var i = 0; i < images.length; i++) {
    imgUrls[i] = URL.createObjectURL(images[i]);
  }

  const filteredFacilities = facilitiesArr.filter((item) =>
    !facility ? true : item.startsWith(facility) || item.includes(facility)
  );

  return (
    <div>
      <div className="m-2 px-5 py-10 flex items-center justify-center flex-col gap-3 w-full border rounded-lg shadow">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-700">
              List a New Hotel
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-gray-500 py-2 w-[80px] px-3 text-white"
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-[130px] bg-primary py-2 px-3 text-white"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Save +"}
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between sm:flex-row gap-2">
            <div className="flex p-5 border shadow rounded-md flex-col w-full md:w-[50%] items-center justify-center gap-3">
              <div className="w-full">
                <label>Hotel Name</label>
                <input
                  type="text"
                  className="w-full"
                  value={name}
                  id="name"
                  name="name"
                  placeholder="Name here..."
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="w-full">
                <label>Description</label>
                <textarea
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={description}
                  id="description"
                  name="description"
                  placeholder="Description here..."
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="w-full">
                <label>Address</label>
                <input
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={address}
                  id="address"
                  name="address"
                  placeholder="Address here..."
                  onChange={handleChange}
                />
                {errors.address && touched.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="w-full">
                <label>Map URL</label>
                <input
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={mapUrl}
                  id="mapUrl"
                  name="mapUrl"
                  placeholder="Map url here..."
                  onChange={handleChange}
                />
                {errors.mapUrl && touched.mapUrl && (
                  <p className="text-red-500">{errors.mapUrl}</p>
                )}
              </div>

              <div className="w-full">
                <label>City</label>
                <Select
                  label={city}
                  values={cities}
                  onChange={(val) => setValues({ ...values, city: val })}
                />
                {errors.city && touched.city && (
                  <p className="text-red-500">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="flex w-full md:w-[50%] flex-col border p-5 shadow rounded-lg">
              <div className="relative">
                <label>Facilities</label>
                <input
                  type="text"
                  className="w-full"
                  value={facility}
                  id="facility"
                  name="facility"
                  placeholder="Facility here..."
                  onChange={(e) => setFacility(e.target.value.toLowerCase())}
                  onClick={() => setFacility("")}
                />
                {errors.facilities && touched.facilities && (
                  <p className="text-red-500">{errors.facilities}</p>
                )}

                {facility !== null && (
                  <div className="absolute w-full cursor-pointer py-2 h-[300px] border shadow overflow-auto left-0 top-[70px] px-2 bg-white rounded-md text-sm">
                    {filteredFacilities.map((item) => {
                      if (!facilities.includes(item)) {
                        return (
                          <div
                            className="text-gray-600 p-2 border-b capitalize hover:bg-gray-200 rounded-md"
                            onClick={() => onChangeFacility(item)}
                          >
                            {item}
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
              <div className="my-2">
                {facilities.length === 0 ? (
                  <div className="flex border rounded-lg items-center justify-center min-h-[100px] text-gray-500">
                    No facilities added
                  </div>
                ) : (
                  <div className="flex gap-1 flex-wrap border rounded-lg p-2">
                    {facilities.map((item, indx) => (
                      <div className="bg-gray-500 border text-white shadow px-3 py-2 capitalize rounded-full flex gap-2">
                        {item}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="size-6"
                          onClick={() => onRemoveFacility(indx)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full">
                <label>Images</label>
                <div className="p-2 border rounded-lg items-center justify-center min-h-[100px] text-gray-500">
                  <input
                    type="file"
                    multiple
                    className="w-full"
                    id="images"
                    name="images"
                    onChange={(e) =>
                      setValues({ ...values, images: e.target.files })
                    }
                    accept="image/*"
                  />

                  {imgUrls.length !== 0 && (
                    <div className="flex gap-2 flex-wrap mt-4">
                      {imgUrls.map((img, indx) => (
                        <div className="relative">
                          <img
                            src={img}
                            className="w-[200px] h-[200px] rounded-lg"
                          />

                          <div
                            className="absolute cursor-pointer hover:scale-110 font-bold text-sm top-2 right-2 w-[20px] h-[20px] bg-white rounded-full flex items-center justify-center"
                            onClick={() => onRemoveImage(indx)}
                          >
                            X
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
