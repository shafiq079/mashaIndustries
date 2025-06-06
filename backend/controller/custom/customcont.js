const File = require('../../models/customsch');

exports.uploadfile = async (req, res) => {

  const { amount, productType, productSize, material, totalPrice } = req.body;
  const userId = req.userId; 
  if (req.files && req.files.length > 0) {
    try {
      const filesToSave = req.files.map(file => ({
        originalName: file.originalname,
        filePath: file.path,
        quantity: amount,
        productType: productType,
        material: material,
        productsize: productSize,
        totalPrice: totalPrice,
        id: userId, 
      }));      

      await File.insertMany(filesToSave);
      return res.status(200).send('Files uploaded successfully');
    } catch (err) {
      console.error('Error saving files to database:', err);
      return res.status(500).send('Error uploading files');
    }
  } else {
    return res.status(400).send('No files uploaded');
  }
};
