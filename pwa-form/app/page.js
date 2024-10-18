import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Welcome to Our Forms</h1>
        <div className="space-y-4">
          <Link href="/commision">
            <button className="w-64 mx-2 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
              Form Commission
            </button>
          </Link>
          <Link href="/form">
            <button className="w-64 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
              Form Field
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
