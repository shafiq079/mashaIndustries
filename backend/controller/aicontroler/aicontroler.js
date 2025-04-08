const multer = require("multer");
const path = require("path");
const AiImage = require("../../models/aischema");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../assets/aiuploads')); // Save files in `aiuploads`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Initialize Multer Upload
const aiupload = multer({ storage });

// Controller Function to Handle Upload
const uploadAiImage = async (req, res) => {
  try {
      const newImage = new AiImage({
          imagePath: `/aiuploads/${req.file.filename}`, // Path to the uploaded image
          description: req.body.description || "" // Save description if provided
      });

      await newImage.save();

      res.json({
          message: "Image uploaded and saved successfully",
          imagePath: newImage.imagePath,
          description: newImage.description
      });

  } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server error", error });
  }
};

// Export the Multer instance and controller function
module.exports = { aiupload, uploadAiImage };
