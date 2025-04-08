import React, { useState, useEffect } from "react";

const Ai = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const token = "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";

  const handleGenerate = async () => {
    if (!input) {
      alert("Please enter some text!");
      return;
    }

    setLoading(true);
    setImageSrc("");

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: input }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch image");

      const result = await response.blob();
      const objectUrl = URL.createObjectURL(result);

      if (imageSrc) URL.revokeObjectURL(imageSrc);

      setImageSrc(objectUrl);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const handleClear = () => {
    setInput("");
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc("");
    }
  };

  const sendToCustom = async () => {
    if (!imageSrc) {
      alert("No image generated yet!");
      return;
    }

    try {
      const response = await fetch(imageSrc);
      if (!response.ok) throw new Error("Failed to fetch image from URL");

      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        localStorage.setItem("aiGeneratedImage", reader.result);
        window.location.href = "/custom";
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error sending image:", error);
      alert("Failed to send image to custom page.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Image Generator</h1>

      {/* Image Display (Above Buttons) */}
      {imageSrc && (
        <div className="mb-6 flex justify-center">
          <img
            src={imageSrc}
            alt="Generated"
            className="w-96 h-auto rounded-lg shadow-lg border border-gray-300"
          />
        </div>
      )}

      {/* Input Field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to generate an image..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Generate
        </button>

        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Clear Image
        </button>

        <button
          onClick={sendToCustom}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Send to Custom
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <div className="mt-4 text-lg font-semibold text-gray-600">Generating...</div>}
    </div>
  );
};

export default Ai;