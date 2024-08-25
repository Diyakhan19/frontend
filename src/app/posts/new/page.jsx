"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Select from "@/components/common/Select";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "@/redux/services/postService";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { cities, categories } from "@/components/common/constants";

const page = () => {
  const router = useRouter();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      price: "",
      category: "",
      features: [],
      images: [],
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      price: yup.string().required("Price is required"),
      category: yup.string().required("Category is required"),
      features: yup.array().min(1, "Features is required"),
    }),
    onSubmit: async (values) => {
      const {
        title,
        description,
        city,
        category,
        address,
        price,
        features,
        images,
      } = values;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("category", category);
      formData.append("features", JSON.stringify(features));

      if (images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      try {
        const res = await createPost(formData).unwrap();
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

  const { title, description, address, price, features, images } = values;

  const [feature, setFeature] = useState("");

  const onChangeFeature = () => {
    if (feature === "") return;

    const arr = [...features, feature];
    setValues({
      ...values,
      features: arr,
    });

    setFeature("");
  };

  const onRemoveFeature = (indx) => {
    const arr = [...features];
    arr.splice(indx, 1);
    setValues({
      ...values,
      features: arr,
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
              Create A New Post
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
                <label>Post Title</label>
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
                <label>City</label>
                <Select
                  label=""
                  values={cities}
                  onChange={(val) => setValues({ ...values, city: val })}
                />
                {errors.city && touched.city && (
                  <p className="text-red-500">{errors.city}</p>
                )}
              </div>

              <div className="w-full">
                <label>Category</label>
                <Select
                  label=""
                  values={categories}
                  onChange={(val) => setValues({ ...values, category: val })}
                />
                {errors.category && touched.category && (
                  <p className="text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="flex w-full md:w-[50%] flex-col border p-5 shadow rounded-lg">
              <div className="relative">
                <label>Features</label>
                <input
                  type="text"
                  className="w-full"
                  value={feature}
                  id="feature"
                  name="feature"
                  placeholder="Feature here..."
                  onChange={(e) => setFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onChangeFeature();
                    }
                  }}
                />
                {errors.features && touched.features && (
                  <p className="text-red-500">{errors.features}</p>
                )}
                <div
                  className="absolute cursor-pointer top-[30px] right-3 bg-gray-600 text-white py-1 px-2 rounded-md text-sm"
                  onClick={onChangeFeature}
                >
                  Add +
                </div>
              </div>
              <div className="my-2">
                {features.length === 0 ? (
                  <div className="flex border rounded-lg items-center justify-center min-h-[100px] text-gray-500">
                    No Features added
                  </div>
                ) : (
                  <div className="flex gap-1 flex-wrap border rounded-lg p-2">
                    {features.map((item, indx) => (
                      <div className="bg-gray-500 border text-white shadow px-3 py-2 rounded-full flex gap-2">
                        {item}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="size-6"
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
