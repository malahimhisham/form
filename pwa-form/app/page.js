import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function Home() {
  return (
    <>
      <div className="bg-[url('/vector.png')] w-full h-screen flex justify-center items-center bg-opacity-5 bg-cover bg-center">
        {/* Content inside the div */}
        <div className="flex flex-col justify-center items-center w-full px-4 sm:w-[85%] md:w-[708px] h-auto md:h-[518px]">
          <img className="w-[80px] md:w-[100px] h-auto" src="/logo.png" alt="Logo" />

          <h1
            className="font-bold text-2xl sm:text-4xl md:text-6xl text-center mt-4"
            style={{ fontFamily: "Cabria" }}
          >
            Welcome to <span className="text-[#72AC44]">CHS Equipment</span> Health Portal
          </h1>

          <h1
            className="mt-6 sm:mt-10 md:mt-14 text-center text-sm sm:text-xl md:text-[2.5rem] lg:text-2xl text-[#58595B]"
            style={{ textShadow: "2px 2px 4px rgba(80, 80, 80, 0.5)" }}
          >
            Our machines need to be well maintained and checked periodically just like us so they
            can have long healthy lives without breakdowns.
          </h1>

          <div className="mt-8 sm:mt-10 md:mt-12 flex items-center w-full max-w-[90%]">
            <div className="flex items-center border border-gray-500 rounded-[30px] flex-1 overflow-hidden">
              <MdEmail className="text-[#72AC44] ml-3" />
              <input
                className="border-none text-xs sm:text-sm md:text-base py-2 px-3 sm:px-5 flex-1 focus:outline-none focus:ring-0"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <Link href={"/page1"}>
              <button className="bg-[#1B7C40] mx-2 sm:mx-3 text-white text-xs sm:text-sm md:text-base py-2 px-3 sm:px-4 rounded-[30px] font-bold hover:bg-[#66a53d] transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
