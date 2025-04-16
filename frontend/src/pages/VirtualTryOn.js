import React, { useState } from "react";
import axios from "axios";
import uploadImage from "../helpers/uploadImage";

const VirtualTryOn = () => {
  const [personImageFile, setPersonImageFile] = useState(null);
  const [garmentImageFile, setGarmentImageFile] = useState(null);
  const [personImagePreview, setPersonImagePreview] = useState(null);
  const [garmentImagePreview, setGarmentImagePreview] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTryOn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const personImageResponse = await uploadImage(personImageFile);
      const garmentImageResponse = await uploadImage(garmentImageFile);

      const response = await axios.post("http://localhost:8080/api/try-on", {
        person_image_url: personImageResponse.url,
        garment_image_url: garmentImageResponse.url,
      });

      setResultImageUrl(response.data.result_url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Virtual Try-On</h1>

      <form onSubmit={handleTryOn} className="space-y-6">
        {/* Two Main Sections */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Half - Uploads */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Person Upload */}
              <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow text-center">
                <label className="font-semibold mb-2 block">Upload Person Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setPersonImageFile(e.target.files[0]);
                    setPersonImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="border p-2 w-full max-w-xs mx-auto"
                  required
                />
                {personImagePreview && (
                  <img
                    src={personImagePreview}
                    alt="Person Preview"
                    className="mt-4 mx-auto w-48 h-48 object-cover border rounded"
                  />
                )}
              </div>

              {/* Garment Upload */}
              <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow text-center">
                <label className="font-semibold mb-2 block">Upload Garment Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setGarmentImageFile(e.target.files[0]);
                    setGarmentImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="border p-2 w-full max-w-xs mx-auto"
                  required
                />
                {garmentImagePreview && (
                  <img
                    src={garmentImagePreview}
                    alt="Garment Preview"
                    className="mt-4 mx-auto w-48 h-48 object-cover border rounded"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Half - Result */}
          <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Result:</h2>
            {resultImageUrl ? (
              <img
                src={resultImageUrl}
                alt="Try-On Result"
                className="w-72 h-72 object-contain border rounded"
              />
            ) : (
              <p className="text-gray-500">Result will appear here after try-on.</p>
            )}
          </div>
        </div>

        {/* Try-On Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Trying On..." : "Try On"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VirtualTryOn;
