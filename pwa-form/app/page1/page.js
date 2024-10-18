"use client";
import React, { useState } from 'react';
import Popup from './Popup'; // Adjust the path as necessary

const Page = () => {
  // State to hold the uploaded images and popup visibility
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  // Handle the selection from the dropdown
  const handleImageSelection = (event) => {
    setSelectedImage(event.target.value);
    if (event.target.value && !uploadedImages.includes(event.target.value)) {
      setUploadedImages([...uploadedImages, event.target.value]);
    }
  };

  // Remove an image from the list
  const handleRemoveImage = (indexToRemove) => {
    const newImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(newImages);
  };

  // Open the popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 w-full">
        <div className="h-12 w-24 flex items-center justify-center">
          <img className='text-sm' src="/logo.png" alt="Logo" />
        </div>
        <div
          className='border ml-4 text-center rounded-md border-gray-300 py-3 px-7 w-full cursor-pointer'
          onClick={handleOpenPopup} // Open popup on click
        >
          Report Title
        </div>
      </header>

      {/* Tab Navigation */}
      {/* <nav className="flex space-x-3 w-screen p-2 mt-4">
        <button className="px-7 py-3 bg-[#1B7C40] text-white rounded">Site Info</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Equipment</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Observation</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Work Done</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Summary</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Measured Values</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Maintenance Plan</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Comments</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Set Pressures</button>
        <button className="px-7 py-2 bg-[#E6E6E6] rounded">Transformer</button>
      </nav> */}

      {/* <nav className="flex overflow-x-auto p-2 mt-4 scrollbar-hide snap-x snap-mandatory max-w-full">
        <div className="flex flex-nowrap space-x-3 min-w-full">
          
          <button className="px-7 py-2 bg-[#3c8a1d] text-white rounded  snap-start">Site Info</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Equipment</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Observation</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Work Done</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Summary</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Measured Values</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Maintenance Plan</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Comments</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Set Pressures</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Transformer</button>
        </div>
      </nav> */}

<div className="flex overflow-x-auto space-x-5 mt-3"> 
  <button className="px-7 py-2 bg-[#3c8a1d] text-white rounded  snap-start">Site Info</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Equipment</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Observation</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Work Done</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Summary</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Measured Values</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Maintenance Plan</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Comments</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Set Pressures</button>
          <button className="px-7 py-2 bg-[#E6E6E6] rounded snap-start">Transformer</button>  
</div>




      {/* Form Section */}
      <div className="border p-6 mt-4 rounded-lg bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold">Company Name*</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Contact person job title *</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Company Address *</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Contact telephone *</label>
            <input type="email" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Contact email*</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Industry type *</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
          <div>
            <label className="block text-sm font-bold">Contact Person *</label>
            <input type="text" className="border w-full p-2 rounded" placeholder="Type..." />
          </div>
        </div>
      </div>

      {/* Dropdown Section */}
      <div className="border px-4 py-2 mt-4 rounded-lg bg-white">
        <select
          value={selectedImage}
          onChange={handleImageSelection}
          className="w-full p-2 rounded"
        >
          <option className='font-semibold' value="">Attach Media</option>
          <option value="image1.jpg">Image 1</option>
          <option value="image2.jpg">Image 2</option>
          <option value="image3.jpg">Image 3</option>
          {/* Add more options as needed */}
        </select>

        {/* Display selected images */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {uploadedImages.map((imageUrl, index) => (
            <div key={index} className="relative border p-2 rounded">
              <img src={imageUrl} alt={`Uploaded ${index}`} className="w-full h-32 object-cover rounded" />
              <button
                className="absolute top-0 right-0 text-red-500 p-1"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-4">
        <button className="bg-[#C2C2C2] mx-1 text-white px-4 py-2 rounded-full">Previous</button>
        <button className="bg-[#10331D] mx-1 text-white px-4 py-2 rounded-full">Next</button>
        <button className="bg-[#1B7C40] mx-1 text-white px-4 py-2 rounded-full">Submit</button>
      </div>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default Page;
