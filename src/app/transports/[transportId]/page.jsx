"use client";

import { useGetTransportQuery } from "@/redux/services/transportService";
import { useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = () => {
  const params = useParams();
  const transportId = params?.transportId;

  const { data } = useGetTransportQuery(transportId);

  const transport = data?.data;

  if (!transport) return;

  const { title, images } = transport;

  return (
    <div className="px-5 sm:px-20 mx-auto p-6 my-5">
      <div>
        <div className="flex flex-col sm:flex-row gap-2 text-center">
          <div className="w-full flex items-center rounded">
            <img
              src={`${BASE_URL}/${images[0]}`}
              alt="Product"
              className="w-full max-h-full object-cover sm:h-[400px]"
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />
          </div>

          <div className="flex flex-col gap-2">
            {images.map((img, indx) => {
              if ([1, 2].includes(indx)) {
                return (
                  <img
                    src={`${BASE_URL}/${img}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                );
              }
            })}
          </div>

          <div className="flex flex-col gap-2">
            {images.map((img, indx) => {
              if ([3, 4].includes(indx)) {
                return (
                  <img
                    src={`${BASE_URL}/${img}`}
                    alt="Product"
                    className="w-full object-cover h-[196px]"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">{title}</h2>
          <p className="text-gray-600">{transport.description}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Details</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <strong className="font-medium">Make:</strong> {transport.make}
            </li>
            <li>
              <strong className="font-medium">Model:</strong> {transport.model}
            </li>
            <li>
              <strong className="font-medium">Type:</strong> {transport.type}
            </li>
            <li>
              <strong className="font-medium">Capacity:</strong>{" "}
              {transport.capacity}
            </li>
            <li>
              <strong className="font-medium">City:</strong> {transport.city}
            </li>
            <li>
              <strong className="font-medium">Phone:</strong> {transport.phone}
            </li>
            <li>
              <strong className="font-medium">Status:</strong>{" "}
              {transport.status}
            </li>
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(transport.pricing).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 capitalize mb-2">
                {key}
              </h3>
              <p className="text-gray-700">
                <strong>Price:</strong> ${value.price}
              </p>
              <p className="text-gray-700">
                <strong>Max Distance:</strong> {value.maxDistance} km
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
