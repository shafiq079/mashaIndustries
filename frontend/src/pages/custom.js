import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import uploadImage from "../helpers/uploadImage";
import { FiUploadCloud, FiTrash2, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

function Custom() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [designName, setDesignName] = useState("");
  const [amount, setAmount] = useState(1);
  const [productType, setProductType] = useState("");
  const [productSize, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({}); // only for UI hints on images & designName
  const fileInputRef = useRef(null);

  // Same constants as before (used for dropdown options only)
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

  // Convert base64 data URL to File object (unchanged)
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

  // Load AI-generated image from localStorage (unchanged)
  useEffect(() => {
    const aiImageData = localStorage.getItem("aiGeneratedImage");
    if (aiImageData) {
      const file = dataURLtoFile(aiImageData, "ai-generated-image.png");
      const url = URL.createObjectURL(file);
      setImages([file]);
      setImagePreviews([url]);
      localStorage.removeItem("aiGeneratedImage");
      return () => URL.revokeObjectURL(url);
    }
  }, []);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((src) => {
        if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...selectedFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setTouched((t) => ({ ...t, images: true }));
  };

  const handleRemoveImage = (index) => {
    const src = imagePreviews[index];
    if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    imagePreviews.forEach((src) => src?.startsWith("blob:") && URL.revokeObjectURL(src));
    setImages([]);
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files || []).filter((f) =>
      /image\/(png|jpg|jpeg|webp|gif)/i.test(f.type)
    );
    if (!droppedFiles.length) return;
    const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...droppedFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setTouched((t) => ({ ...t, images: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // EXACT SAME validation behavior as your original
    if (images.length === 0) {
      toast.error("Please select at least one file to upload.");
      setTouched((t) => ({ ...t, images: true }));
      return;
    }
    if (!designName) {
      toast.error("Please provide a name for your design.");
      setTouched((t) => ({ ...t, designName: true }));
      return;
    }

    setIsLoading(true);
    try {
      const uploadPromises = images.map((image) => uploadImage(image));
      const uploadResponses = await Promise.all(uploadPromises);

      const payload = {
        designName: designName,
        amount: amount,
        productType: productType,
        productSize: productSize,
        material: material,
        description: description,
        budget: budget,
        imageUrls: uploadResponses.map((res) => res.secure_url),
        originalNames: images.map((img) => img.name),
      };

      const response = await axios.post(SummaryApi.custom.url, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        handleClearAll();
        setDesignName("");
        setAmount(1);
        setProductType("");
        setSize("");
        setMaterial("");
        setDescription("");
        setBudget("");
        setTouched({});
        setMessage("");
      } else {
        toast.error(response.data.message || "An unknown error occurred.");
      }
    } catch (err) {
      toast.error("Error submitting request. Please try again.");
      console.error("Error submitting request:", err);
      setMessage("Error submitting request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Customize Your Order</h1>
          <p className="mt-2 text-gray-600">
            Upload reference images, set product details, and submit your custom design for review.
          </p>
        </div>

        {/* Main Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Uploader + Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Uploader */}
            <div
              className={`rounded-xl border-2 border-dashed p-6 bg-white shadow-sm transition ${
                touched.images && images.length === 0 ? "border-red-400" : "border-gray-200"
              }`}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <div
                className="flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                aria-label="Upload images"
              >
                <FiUploadCloud className="text-4xl mb-2 text-gray-500" />
                <p className="text-gray-800 font-medium">Drag & drop images here</p>
                <p className="text-sm text-gray-500">or click to browse (PNG, JPG, JPEG, WEBP, GIF)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpg,image/jpeg,image/webp,image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                {touched.images && images.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">Please select at least one image.</p>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="group relative rounded-lg overflow-hidden border border-gray-200">
                        <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-36 object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white"
                          aria-label={`Remove image ${idx + 1}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <FiUploadCloud /> Add more
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <FiRefreshCw /> Clear all
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Form Card */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Design name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={designName}
                    onChange={(e) => {
                      setDesignName(e.target.value);
                      setTouched((t) => ({ ...t, designName: true }));
                    }}
                    placeholder="Give your design a name (e.g., My Birthday Shirt)"
                    className={`w-full rounded-lg border px-3 py-2 outline-none ${
                      touched.designName && !designName
                        ? "border-red-400"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                  />
                  {touched.designName && !designName && (
                    <p className="mt-1 text-sm text-red-600">Please provide a design name.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none border-gray-300 focus:border-gray-400"
                  >
                    <option value="">Select Product</option>
                    {Object.keys(basePrices).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <select
                    value={productSize}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none border-gray-300 focus:border-gray-400"
                  >
                    <option value="">Select Size</option>
                    {Object.keys(sizePrices).map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none border-gray-300 focus:border-gray-400"
                  >
                    <option value="">Select Material</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Quantity"
                    className="w-full rounded-lg border px-3 py-2 outline-none border-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your custom design (e.g., specific details, placement, colors)"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (optional)</label>
                  <input
                    type="number"
                    min={0}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Your Budget (e.g., $50)"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary / Submit */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                <p className="mt-1 text-sm text-gray-500">A quick overview of your selections.</p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Design name</span>
                    <span className="font-medium truncate max-w-[60%]" title={designName || "-"}>
                      {designName || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Product</span>
                    <span className="font-medium">{productType || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span className="font-medium">{productSize || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material</span>
                    <span className="font-medium">{material || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span className="font-medium">{amount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget</span>
                    <span className="font-medium">{budget || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images</span>
                    <span className="font-medium">{images.length}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-medium transition ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? "Submitting..." : <>Submit for Review <FiCheckCircle /></>}
                </button>
                {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default Custom;
