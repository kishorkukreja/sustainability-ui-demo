import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('././bg.jpg')`,
      }}
    >
      {/* Gradient Overlay for a stylish effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

      {/* Content Container */}
      <div className="grid grid-cols-6 gap-8 max-w-7xl p-12 rounded-lg shadow-2xl bg-white bg-opacity-95 text-gray-900 relative z-10">
        {/* Left Text Tile */}
        <div className="col-span-3 flex flex-col justify-center items-start space-y-6">
          <img
            src="././download1.png"
            alt="Unilever Logo"
            className="w-40 mb-4"
          />
          <h1 className="text-5xl font-extrabold mb-4 text-green-800 leading-tight">
            Wake up to a Sustainable Future
          </h1>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            At Unilever, we are committed to driving sustainability through
            innovative technology and intelligent insights. Our Sustainable
            GraphLLM platform empowers you to track, manage, and enhance your
            sustainability initiatives with real-time data and AI-driven
            recommendations. Whether you are optimizing supply chains, reducing
            carbon footprints, or ensuring sustainable sourcing, our tools are
            designed to support your journey towards a more sustainable future.
          </p>
          <button
            onClick={handleClick}
            className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transition duration-300"
          >
            Start Your Sustainability Journey
          </button>
        </div>

        {/* Center Image Tile */}
        <div className="col-span-2 flex items-center justify-center">
          <img
            src="././zimage.jpg"
            alt="Sustainability Center"
            className="w-80 h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Image Tile */}
        <div className="col-span-1 flex items-center justify-center">
          <img
            src="././simage.jpg"
            alt="Sustainability Right"
            className="w-80 h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
