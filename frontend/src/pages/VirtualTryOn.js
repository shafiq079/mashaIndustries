import React, { useState } from "react";
import axios from "axios";
import uploadImage from "../helpers/uploadImage"; // Import your Cloudinary helper function

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
      // Upload person image to Cloudinary
      const personImageResponse = await uploadImage(personImageFile);
      const personImageUrl = personImageResponse.url;

      // Upload garment image to Cloudinary
      const garmentImageResponse = await uploadImage(garmentImageFile);
      const garmentImageUrl = garmentImageResponse.url;

      // Send the Cloudinary URLs to the backend
      const response = await axios.post("http://localhost:8080/api/try-on", {
        person_image_url: personImageUrl,
        garment_image_url: garmentImageUrl,
      });
      console.log("Image URLs",personImageUrl, garmentImageUrl);

      setResultImageUrl(response.data.result_url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Virtual Try-On</h1>
      <form onSubmit={handleTryOn} className="space-y-6 flex flex-col items-center">
        
        {/* Upload Inputs and Previews (Side by Side) */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Person Image Section */}
          <div className="flex flex-col items-center">
            <label className="block font-semibold mb-2">Upload Person Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setPersonImageFile(e.target.files[0]);
                setPersonImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="border p-2 w-64"
              required
            />
            {personImagePreview && (
              <div className="mt-3">
                <img
                  src={personImagePreview}
                  alt="Person Preview"
                  className="w-64 h-64 object-contain rounded border"
                />
              </div>
            )}
          </div>

          {/* Garment Image Section */}
          <div className="flex flex-col items-center">
            <label className="block font-semibold mb-2">Upload Garment Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setGarmentImageFile(e.target.files[0]);
                setGarmentImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="border p-2 w-64"
              required
            />
            {garmentImagePreview && (
              <div className="mt-3">
                <img
                  src={garmentImagePreview}
                  alt="Garment Preview"
                  className="w-64 h-64 object-contain rounded border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Try-On Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Trying On..." : "Try On"}
        </button>
      </form>

      {/* Result Image */}
      {resultImageUrl && (
        <div className="mt-8 flex justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <img
              src={resultImageUrl}
              alt="Virtual Try-On Result"
              className="w-96 h-96 object-contain rounded border"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
