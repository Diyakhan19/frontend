
// "use client"; 
// import React, { useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Sidebar from '@/components/admin/Sidebar';

// const Destination = () => {
//     const destinations = [
//         {
//             id: 1,
//             title: "Arang Kel",
//             location: "Maldives",
//             info: "Luxury beach resort",
//             description: "Enjoy the serenity of the Maldives with our luxury beachside resort.",
//             images: [
//                 "/images/arangk.jpg",
//                 "/images/arangk2.jpg",
//                 "/images/arangk3.jpg",
//             ],
//         },
//         {
//             id: 2,
//             title: "Muzaffarabad",
//             location: "AJK",
//             info: "Beautiful city",
//             description: "Enjoy the serenity of the Maldives with our luxury beachside resort.",
//             images: [
//                 "/images/mzd1.jpg",
//                 "/images/mzd2.jpg",
//                 "/images/mzd3.jpg",
//             ],
//         },
//         {
//             id: 2,
//             title: "Rawlakot",
//             location: "AJK",
//             district: "Poonch",
//             description: "Rawalakot is the capital of Poonch district in Azad Kashmir, Pakistan. It is located in the Pir Panjal Range",
//             images: [
//                 "/images/rwk1.jpg",
//                 "/images/rwk2.jpg",
//                 "/images/rwk3.jpg",
//             ],
//         },
//         {
//             id: 2,
//             title: "Muzaffarabad",
//             location: "AJK",
//             info: "Beautiful city",
//             description: "Enjoy the serenity of the Maldives with our luxury beachside resort.",
//             images: [
//                 "/images/mzd1.jpg",
//                 "/images/mzd2.jpg",
//                 "/images/mzd3.jpg",
//             ],
//         },
//         {
//             id: 2,
//             title: "Muzaffarabad",
//             location: "AJK",
//             info: "Beautiful city",
//             description: "Enjoy the serenity of the Maldives with our luxury beachside resort.",
//             images: [
//                 "/images/mzd1.jpg",
//                 "/images/mzd2.jpg",
//                 "/images/mzd3.jpg",
//             ],
//         },
//         {
//             id: 2,
//             title: "Muzaffarabad",
//             location: "AJK",
//             info: "Beautiful city",
//             description: "Enjoy the serenity of the Maldives with our luxury beachside resort.",
//             images: [
//                 "/images/mzd1.jpg",
//                 "/images/mzd2.jpg",
//                 "/images/mzd3.jpg",
//             ],
//         },
//         // Add more destinations as needed
//     ];

//     return (
//         <>
//             <Head>
//                 <title>Admin Dashboard - Destinations</title>
//             </Head>
//             <div className="flex min-h-screen">
//                 <Sidebar />
//                 <main className="flex-1 p-5 lg:ml-72"> {/* Added lg:ml-72 to account for sidebar width on large screens */}
//                     <div className="flex justify-between items-center mb-5">
//                         <h1 className="text-2xl font-bold text-gray-700">Destinations</h1>
//                         <div className="flex space-x-3">
//                             <input
//                                 type="text"
//                                 placeholder="Search destinations"
//                                 className="px-3 py-2 border rounded"
//                             />
//                             <select className="px-3 py-2 border rounded">
//                                 <option>Filter by</option>
//                                 <option>Most Recent</option>
//                                 <option>Most Popular</option>
//                             </select>
//                             <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
//                                 + Add New Destination
//                             </button>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {destinations.map((dest) => (
//                             <div key={dest.id} className="border rounded-lg p-4 shadow-lg">
//                                 <ImageCarousel images={dest.images} />
//                                 <h2 className="text-lg font-bold mt-2">{dest.title}</h2>
//                                 <p className="text-sm text-gray-500">{dest.location}</p>
//                                 <p className="text-sm">{dest.info}</p>
//                                 <p className="text-sm text-gray-700 mt-2">{dest.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// };

// // Image Carousel Component
// const ImageCarousel = ({ images }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextImage = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     const prevImage = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? images.length - 1 : prevIndex - 1
//         );
//     };

//     return (
//         <div className="relative">
//             <Image
//                 src={images[currentIndex]}
//                 alt="Destination Image"
//                 width={400}
//                 height={250}
//                 className="rounded-lg"
//             />
//             <button
//                 onClick={prevImage}
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full"
//             >
//                 &lt;
//             </button>
            

//             <button
//                 onClick={nextImage}
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full"
//             >
//                 &gt;
//             </button>
//         </div>
//     );
// };

// export default Destination;

"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Sidebar from '@/components/admin/Sidebar';

const Destination = () => {
    const [destinations, setDestinations] = useState([
        {
            id: 1,
            title: "Arang Kel",
            location: "AJK",
            info: "Beautiful city",
            description: "Enjoy the beauty of Arnag Kel with its rich culture and stunning landscapes.",
            images: [
                "/images/arangk.jpg",
                "/images/arangk2.jpg",
                "/images/arangk3.jpg",
            ],
        },
        {
            id: 2,
            title: "Muzaffarabad",
            location: "AJK",
            info: "Beautiful city",
            description: "Enjoy the beauty of Muzaffarabad with its rich culture and stunning landscapes.",
            images: [
                "/images/mzd1.jpg",
                "/images/mzd2.jpg",
                "/images/mzd3.jpg",
            ],
        },
        {
            id: 3,
            title: "Rawlakot",
            location: "AJK",
            district: "Poonch",
            description: "Rawalakot is the capital of Poonch district in Azad Kashmir, Pakistan. It is located in the Pir Panjal Range",
            images: [
                "/images/rwk1.jpg",
                "/images/rwk2.jpg",
                "/images/rwk3.jpg",
            ],
        },
        // Add more destinations as needed
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newDestination, setNewDestination] = useState({
        title: '',
        location: '',
        district: '',
        description: '',
        images: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDestination({ ...newDestination, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setNewDestination({ ...newDestination, images: imageUrls });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newDestination.title && newDestination.location && newDestination.district && newDestination.description && newDestination.images.length > 0) {
            setDestinations([...destinations, { ...newDestination, id: destinations.length + 1 }]);
            setShowForm(false);
            setNewDestination({
                title: '',
                location: '',
                district: '',
                description: '',
                images: [],
            });
        } else {
            alert("All fields are required!");
        }
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard - Destinations</title>
            </Head>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 p-5 lg:ml-72">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-2xl font-bold text-gray-700">Destinations</h1>
                        <div className="flex space-x-3">
                            <input
                                type="text"
                                placeholder="Search destinations"
                                className="px-3 py-2 border rounded"
                            />
                            <select className="px-3 py-2 border rounded">
                                <option>Filter by</option>
                                <option>Most Recent</option>
                                <option>Most Popular</option>
                            </select>
                            <button 
                                className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowForm(true)}
                            >
                                + Add New Destination
                            </button>
                        </div>
                    </div>
                    {showForm && (
                        <div className="mb-5 p-5 border rounded-lg bg-gray-100">
                            <h2 className="text-lg font-bold mb-3">Add New Destination</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <input 
                                        type="text"
                                        name="title"
                                        value={newDestination.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Location</label>
                                    <input 
                                        type="text"
                                        name="location"
                                        value={newDestination.location}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">District</label>
                                    <input 
                                        type="text"
                                        name="district"
                                        value={newDestination.district}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea 
                                        name="description"
                                        value={newDestination.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Images</label>
                                    <input 
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {destinations.map((dest) => (
                            <div key={dest.id} className="border rounded-lg p-4 shadow-lg">
                                <ImageCarousel images={dest.images} />
                                <h2 className="text-lg font-bold mt-2">{dest.title}</h2>
                                <p className="text-sm text-gray-500">{dest.location}</p>
                                <p className="text-sm">{dest.info}</p>
                                <p className="text-sm text-gray-700 mt-2">{dest.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

// Image Carousel Component
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative">
            <Image
                src={images[currentIndex]}
                alt="Destination Image"
                width={400}
                height={250}
                className="rounded-lg"
            />
            <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full"
            >
                &lt;
            </button>
            <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full"
            >
                &gt;
            </button>
        </div>
    );
};

export default Destination;
