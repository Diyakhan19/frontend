"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Select from "@/components/common/Select";
import toast from "react-hot-toast";
import {
  useCreateCampingMutation,
  useGetCampingQuery,
} from "@/redux/services/campingService";
import Loader from "@/components/common/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { cities, campings } from "@/components/common/constants";
import { useGetDestinationsQuery } from "@/redux/services/adminService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const campingId = params.get("campingId");

  const [createCamping, { isLoading }] = useCreateCampingMutation();

  const { data } = useGetCampingQuery(campingId, { skip: !campingId });
  const { data: desRes } = useGetDestinationsQuery({ search: "" });
  const destinations = desRes?.data;

  const camping = data?.data;

  useEffect(() => {
    if (camping) {
      const {
        name,
        description,
        duration,
        price,
        type,
        city,
        phone,
        destinationId,
        facilities,
        images,
      } = camping;

      setValues({
        name,
        description,
        duration,
        city,
        price,
        type,
        phone,
        destinationId,
        facilities,
        oldImages: images,
        images: [],
      });
    }
  }, [camping]);

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      duration: "",
      city: "",
      price: "",
      type: "",
      phone: "",
      destinationId: "",
      facilities: [],
      images: [],
      oldImages: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("name is required"),
      description: yup.string().required("Description is required"),
      duration: yup.string().required("Duration is required"),
      city: yup.string().required("City is required"),
      price: yup.string().required("Price is required"),
      type: yup.string().required("Type is required"),
      phone: yup.string().required("Phone is required"),
      destinationId: yup.string().required("Destination is required"),
      facilities: yup.array().min(1, "Facilities is required"),
    }),
    onSubmit: async (values) => {
      const {
        name,
        description,
        duration,
        price,
        type,
        city,
        phone,
        destinationId,
        facilities,
        images,
        oldImages,
      } = values;

      const totalImgs = images.length + oldImages.length;
      if (totalImgs !== 5) return toast.error("5 Images are required");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("phone", phone);
      formData.append("destinationId", destinationId);
      formData.append("type", type);
      formData.append("facilities", JSON.stringify(facilities));

      if (campingId) {
        formData.append("campingId", campingId);
        formData.append("oldImages", JSON.stringify(oldImages));
      }

      if (images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      try {
        const res = await createCamping(formData).unwrap();
        toast.success(res.message);
        window.location.replace(`/profile?userId=${user?.userId}`);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    formik;

  const {
    name,
    description,
    duration,
    price,
    type,
    city,
    phone,
    destinationId,
    facilities,
    images,
    oldImages,
  } = values;

  const [feature, setFeature] = useState("");

  const onChangeFacility = () => {
    if (feature === "") return;

    const arr = [...facilities, feature];
    setValues({
      ...values,
      facilities: arr,
    });

    setFeature("");
  };

  const onRemoveFeature = (indx) => {
    const arr = [...facilities];
    arr.splice(indx, 1);
    setValues({
      ...values,
      facilities: arr,
    });
  };

  const onRemoveImage = (key, path, indx) => {
    const arr = [...values[key]];

    if (key === "images") {
      arr.splice(indx, 1);
      return setValues({
        ...values,
        images: arr,
      });
    }

    if (key === "oldImages") {
      const index = arr.findIndex((item) => item === path);

      if (index > -1) {
        arr.splice(index, 1);
        setValues({
          ...values,
          oldImages: arr,
        });
      }
    }
  };

  let imgUrls = [];
  for (var i = 0; i < images.length; i++) {
    const img = images[i];
    imgUrls[i] = {
      key: "images",
      url: URL.createObjectURL(img),
    };
  }

  if (campingId) {
    oldImages.forEach((img) => {
      imgUrls.push({
        key: "oldImages",
        path: img,
        url: `${BASE_URL}/${img}`,
      });
    });
  }

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
              Create A New Camping Service
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
            <div className="flex p-5 border shadow rounded-md flex-col w-full md:w-[50%] items-center justify-start gap-3">
              <div className="w-full">
                <label>Service name</label>
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
                <label>Price</label>
                <input
                  type="number"
                  className="w-full rounded-[6px] border border-borderCol"
                  value={price}
                  id="price"
                  name="price"
                  placeholder="Price here..."
                  onChange={handleChange}
                />
                {errors.price && touched.price && (
                  <p className="text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="w-full">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="w-full rounded-[6px] border border-borderCol"
                  value={phone}
                  id="phone"
                  name="phone"
                  placeholder="Phone number here..."
                  onChange={handleChange}
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="w-full">
                <label>Description</label>
                <textarea
                  type="text"
                  rows={5}
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
                <label>Duration</label>
                <input
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={duration}
                  id="duration"
                  name="duration"
                  placeholder="Duration here..."
                  onChange={handleChange}
                />
                {errors.duration && touched.duration && (
                  <p className="text-red-500">{errors.duration}</p>
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

              <div className="w-full">
                <label>Type</label>
                <Select
                  label={type}
                  values={campings}
                  onChange={(val) => setValues({ ...values, type: val })}
                />
                {errors.type && touched.type && (
                  <p className="text-red-500">{errors.type}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-[50%] flex-col border p-5 shadow rounded-lg">
              <div className="relative">
                <label>
                  Destination{" "}
                  <span>
                    <small>(Select a destination)</small>
                  </span>
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 border border-borderCol rounded-lg max-h-[300px] overflow-auto">
                  {Array.isArray(destinations) &&
                    destinations.map((item) => {
                      return (
                        <div
                          className={`border rounded-md cursor-pointer ${
                            item.destinationId === destinationId
                              ? "bg-primary text-white"
                              : "bg-white text-gray-800"
                          }`}
                          onClick={() =>
                            setValues({
                              ...values,
                              destinationId: item.destinationId,
                            })
                          }
                        >
                          <img
                            src={`${BASE_URL}/${item.images[0]}`}
                            className="w-[250px] h-[100px] rounded-t-md"
                          />
                          <p className="px-2 py-1 text-sm font-medium">
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                </div>
                {errors.destinationId && touched.destinationId && (
                  <p className="text-red-500">{errors.destinationId}</p>
                )}
              </div>

              <div className="relative">
                <label>Facilities Provided</label>
                <input
                  type="text"
                  className="w-full"
                  value={feature}
                  id="feature"
                  name="feature"
                  placeholder="Type facitity here..."
                  onChange={(e) => setFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onChangeFacility();
                    }
                  }}
                />
                {errors.facilities && touched.facilities && (
                  <p className="text-red-500">{errors.facilities}</p>
                )}
                <div
                  className="absolute cursor-pointer top-[30px] right-3 bg-gray-600 text-white py-1 px-2 rounded-md text-sm"
                  onClick={onChangeFacility}
                >
                  Add +
                </div>
              </div>
              <div className="my-2">
                {facilities.length === 0 ? (
                  <div className="flex border rounded-lg items-center justify-center min-h-[100px] text-gray-500">
                    No facilities added
                  </div>
                ) : (
                  <div className="flex gap-1 flex-wrap border rounded-lg p-2">
                    {facilities.map((item, indx) => (
                      <div className="bg-gray-500 border text-white shadow px-3 py-2 rounded-full flex gap-2">
                        {item}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                          onClick={() => onRemoveFeature(indx)}
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
                <label>Images (5 images)</label>
                <div className="p-2 border border-borderCol rounded-lg items-center justify-center min-h-[100px] text-gray-500">
                  <input
                    type="file"
                    multiple
                    className="w-full object-cover"
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
                            src={img.url}
                            className="w-[200px] h-[200px] rounded-lg"
                          />

                          <div
                            className="absolute cursor-pointer hover:scale-110 font-bold text-sm top-2 right-2 w-[20px] h-[20px] bg-white rounded-full flex items-center justify-center"
                            onClick={() =>
                              onRemoveImage(img.key, img.path, indx)
                            }
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
