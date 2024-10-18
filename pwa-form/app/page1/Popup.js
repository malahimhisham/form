// components/Popup.js
"use client";
import Link from 'next/link';
import React from 'react';

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#37783A] bg-opacity-50 z-50">
      <div className="bg-white w-[935px] h-[590px] rounded-lg p-6 relative flex flex-col justify-center items-center">
        <button onClick={onClose} className="absolute top-2 text-5xl right-2 text-black">
          &times; {/* Cross icon */}
        </button>
        <div className="flex flex-col justify-center items-center">
          {/* Adjust image size using width and height or CSS classes */}
          <img 
            className="w-24 h-24 object-contain" // Change the width and height as needed
            src="/logo.png" 
            alt="Logo" 
          />
          <h2 className="text-4xl text-center font-bold mt-4">Please Enter Report Title</h2>
          <h1
            className="mt-9 text-center text-xl text-[#58595B]"
            style={{ textShadow: "2px 2px 4px rgba(80, 80, 80, 0.5)" }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, nostrum. Minus voluptatem atque et assumenda eius debitis.
          </h1>

          <div className="mt-9 flex items-center w-[70%] max-w-[85%]">
            <div className="flex items-center border border-gray-500 rounded-[30px] flex-1 overflow-hidden">
              <input
                className="border-none text-[#58595B] py-2 px-5 flex-1 focus:outline-none focus:ring-0"
                type="email"
                placeholder="Enter Title"
                required
              />
            </div>
            <Link href={'/page1'}><button className="bg-[#1B7C40] mx-3 text-white py-2 px-4 rounded-[30px] font-bold hover:bg-[#66a53d] transition">
              Save
            </button></Link>
          </div>
        </div>
        </div>
      </div>
    
  );
};

export default Popup;
