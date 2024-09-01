"use client";
import { useAddDestinationMutation } from "@/redux/services/adminService";
import { useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [addDestination, { isLoading }] = useAddDestinationMutation();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    district: "",
    mapUrl: "",
    description: "",
    images: [],
  });

  const { title, location, district, description, images, mapUrl } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 5) return toast.error("Please select 5 images");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("district", district);
    formData.append("mapUrl", mapUrl);
    formData.append("description", description);
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await addDestination(formData).unwrap();
      toast.success(res.message);
      router.push("/admin/destinations");
    } catch (err) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <div>
      <Sidebar />
      <Topbar />

      <main className="flex-1 p-3 lg:ml-72">
        <div className="mb-5 p-5 border rounded-lg bg-white shadow">
          <h2 className="text-lg font-bold mb-3">Add New Destination</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data/">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={district}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Map URL</label>
              <input
                type="text"
                name="mapUrl"
                value={mapUrl}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={description}
                rows={8}
                onChange={handleInputChange}
                className="w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full"
                required
                accept="image/*"
                name="images"
              />
            </div>
            <div className="flex items-center gap-2 justify-end w-full">
              <button
                type="button"
                onClick={() => router.back()}
                className="ml-4 bg-gray-500 w-[100px] h-[40px] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 w-[100px] h-[40px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default page;
