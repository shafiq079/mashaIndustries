import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SummaryApi from "../common";

function Custom() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [amount, setAmount] = useState(1);
  const [productType, setProductType] = useState("");
  const [productSize, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const basePrices = {
    Jacket: 1500,
    "T-Shirt": 800,
    Hoodie: 1200,
    Shorts: 600,
    Jeans: 1200,
    Top: 700,
    Dresses: 1000,
    Trousers: 900,
  };

  const sizePrices = {
    S: 0,
    M: 25,
    L: 50,
    XL: 75,
  };

  const materialPrices = {
    Basic: 0,
    Premium: 200,
  };

  // Convert base64 data URL to File object
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    const calculatePrice = () => {
      const basePrice = basePrices[productType] || 0;
      const sizePrice = sizePrices[productSize] || 0;
      const materialPrice = materialPrices[material] || 0;
      const total = (basePrice + sizePrice + materialPrice) * amount;
      setTotalPrice(total);
    };
    calculatePrice();
  }, [productType, productSize, material, amount]);

  useEffect(() => {
    // Load AI-generated image from localStorage
    const aiImageData = localStorage.getItem("aiGeneratedImage");
    if (aiImageData) {
      const file = dataURLtoFile(aiImageData, "ai-generated-image.png");
      setImages([file]);
      setImagePreviews([URL.createObjectURL(file)]);
      localStorage.removeItem("aiGeneratedImage"); // Clear after loading
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    let formData = new FormData();
    formData.append("amount", amount);
    formData.append("productType", productType);
    formData.append("productSize", productSize);
    formData.append("material", material);
    formData.append("totalPrice", totalPrice);
    images.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await axios.post(SummaryApi.custom.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Files uploaded successfully!");
      setImages([]);
      setImagePreviews([]);
      setAmount(1);
      setProductType("");
      setSize("");
      setMaterial("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error uploading files:", err);
      setMessage("Error uploading files.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Customize Your Order</h1>
      {imagePreviews.length > 0 && (
        <div className="mb-6 flex justify-center gap-4">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt="Preview" className="w-48 h-auto " />
          ))}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="w-full flex gap-4">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="mb-4 block w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Product</option>
            {Object.keys(basePrices).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={productSize}
            onChange={(e) => setSize(e.target.value)}
            className="mb-4 block w-full md:w-1/2  p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Size</option>
            {Object.keys(sizePrices).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex gap-4 mx-auto">
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="mb-4 block w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Material</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Quantity"
            min="1"
            className="mb-4 block w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <p className="mb-4 font-bold">Total Price: ${totalPrice}</p>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Custom;
