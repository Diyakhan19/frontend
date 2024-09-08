"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import Select from "@/components/common/Select";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { cities, transports } from "@/components/common/constants";
import {
  useGetTransportQuery,
  usePostTransportMutation,
} from "@/redux/services/transportService";
import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const transportId = params.get("transportId");

  const [postTransport, { isLoading }] = usePostTransportMutation();

  const { data } = useGetTransportQuery(transportId);

  const transport = data?.data;

  useEffect(() => {
    if (transport) {
      const {
        title,
        description,
        make,
        model,
        type,
        pricing,
        phone,
        city,
        capacity,
        images,
      } = transport;

      setValues({
        title,
        description,
        make,
        model,
        type,
        pricing,
        phone,
        city,
        capacity,
        images: [],
        oldImages: images,
      });
    }
  }, [transport]);

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      make: "",
      model: "",
      type: "",
      pricing: {
        hour: {
          price: "",
          maxDistance: "",
        },
        day: {
          price: "",
          maxDistance: "",
        },
        month: {
          price: "",
          maxDistance: "",
        },
      },
      capacity: "",
      phone: "",
      city: "",
      images: [],
      oldImages: [],
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      make: yup.string().required("Make is required"),
      model: yup.string().required("Model is required"),
      type: yup.string().required("Type is required"),
      pricing: yup.object().shape({
        hour: yup.object().shape({
          price: yup.string().required("Price is required"),
          maxDistance: yup.string().required("Max distance is required"),
        }),
      }),
      phone: yup.string().required("Phone is required"),
      city: yup.string().required("City is required"),
      capacity: yup.string().required("Capacity is required"),
    }),
    onSubmit: async (values) => {
      const {
        title,
        description,
        make,
        model,
        type,
        pricing,
        phone,
        city,
        capacity,
        images,
        oldImages,
      } = values;

      const totalImgs = images.length + oldImages.length;

      if (totalImgs !== 5) {
        return toast.error("Please select 5 images");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("make", make);
      formData.append("model", model);
      formData.append("type", type);
      formData.append("pricing", JSON.stringify(pricing));
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("capacity", capacity);

      if (transportId) {
        formData.append("transportId", transportId);
        formData.append("oldImages", JSON.stringify(oldImages));
      }

      if (images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      try {
        const res = await postTransport(formData).unwrap();
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
    title,
    description,
    make,
    model,
    type,
    city,
    pricing,
    phone,
    capacity,
    images,
    oldImages,
  } = values;

  const onChangePrice = (e) => {
    const key = e.target.name;
    let newPricing = { ...pricing };
    let obj = { ...newPricing[key] };
    obj.price = e.target.value;
    newPricing[key] = obj;

    setValues({
      ...values,
      pricing: newPricing,
    });
  };

  const onChangeDistance = (e) => {
    const key = e.target.name;
    let newDistance = { ...pricing };
    let obj = { ...newDistance[key] };
    obj.maxDistance = e.target.value;
    newDistance[key] = obj;

    setValues({
      ...values,
      pricing: newDistance,
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
    imgUrls[i] = {
      key: "images",
      url: URL.createObjectURL(images[i]),
    };
  }

  if (transportId) {
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
              List a transport
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
                <label>Title</label>
                <input
                  type="text"
                  className="w-full"
                  value={title}
                  id="title"
                  name="title"
                  placeholder="Title here..."
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500">{errors.title}</p>
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
                  placeholder="Describe your transport..."
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="w-full">
                <label>Make</label>
                <input
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={make}
                  id="make"
                  name="make"
                  placeholder="Make/Manufacuturing Company..."
                  onChange={handleChange}
                />
                {errors.make && touched.make && (
                  <p className="text-red-500">{errors.make}</p>
                )}
              </div>

              <div className="w-full">
                <label>Model</label>
                <input
                  type="text"
                  rows={8}
                  className="w-full rounded-[6px] border border-borderCol"
                  value={model}
                  id="model"
                  name="model"
                  placeholder="Model here..."
                  onChange={handleChange}
                />
                {errors.model && touched.model && (
                  <p className="text-red-500">{errors.model}</p>
                )}
              </div>

              <div className="w-full">
                <label>Capacity</label>
                <input
                  type="text"
                  className="w-full rounded-[6px] border border-borderCol"
                  value={capacity}
                  id="capacity"
                  name="capacity"
                  placeholder="Seating capacity here..."
                  onChange={handleChange}
                />
                {errors.capacity && touched.capacity && (
                  <p className="text-red-500">{errors.capacity}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-[50%] flex-col border p-5 shadow rounded-lg">
              <div className="w-full">
                <label>Type</label>
                <Select
                  label={type}
                  values={transports}
                  onChange={(val) => setValues({ ...values, type: val })}
                />
                {errors.type && touched.type && (
                  <p className="text-red-500">{errors.type}</p>
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

              <div className="relative">
                <label>Phone number</label>
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
                <p className="font-bold mb-2">Pricing</p>
                <div className="flex gap-2 flex-col lg:flex-row">
                  <div className="w-full">
                    <label>Per hour</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.hour.price}
                      id="hour"
                      name="hour"
                      placeholder="Price here..."
                      onChange={onChangePrice}
                    />
                    {errors.pricing?.hour.price &&
                      touched.pricing?.hour.price && (
                        <p className="text-red-500">
                          {errors.pricing.hour.price}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <label>For Max Distance (KMs)</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.hour.maxDistance}
                      id="hour"
                      name="hour"
                      placeholder="Max kms..."
                      onChange={onChangeDistance}
                    />
                    {errors.pricing?.hour.maxDistance &&
                      touched.pricing?.hour.maxDistance && (
                        <p className="text-red-500">
                          {errors.pricing.hour.maxDistance}
                        </p>
                      )}
                  </div>
                </div>

                <div className="flex gap-2 flex-col lg:flex-row mt-2">
                  <div className="w-full">
                    <label>Per day</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.day.price}
                      id="day"
                      name="day"
                      placeholder="Price here..."
                      onChange={onChangePrice}
                    />
                  </div>
                  <div className="w-full">
                    <label>For Max Distance (KMs)</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.day.maxDistance}
                      id="day"
                      name="day"
                      placeholder="Max kms..."
                      onChange={onChangeDistance}
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-col lg:flex-row mt-2">
                  <div className="w-full">
                    <label>Per Month</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.month.price}
                      id="month"
                      name="month"
                      placeholder="Price here..."
                      onChange={onChangePrice}
                    />
                  </div>
                  <div className="w-full">
                    <label>For Max Distance (KMs)</label>
                    <input
                      type="number"
                      className="w-full rounded-[6px] border border-borderCol"
                      value={pricing.month.maxDistance}
                      id="month"
                      name="month"
                      placeholder="Max kms..."
                      onChange={onChangeDistance}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label>Images (5 Images)</label>
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
