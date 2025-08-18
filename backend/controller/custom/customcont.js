const File = require('../../models/customsch');

exports.uploadfile = async (req, res) => {
  try {
    const { amount, productType, productSize, material, imageUrl, originalName } = req.body;
    const userId = req.userId;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required.' });
    }

    const newCustomOrder = new File({
      originalName: originalName,
      filePath: imageUrl,
      quantity: amount,
      productType: productType,
      material: material,
      productsize: productSize,
      userId: userId,
    });

    await newCustomOrder.save();

    return res.status(200).json({
      success: true,
      message: 'Your custom design has been submitted for review.'
    });

  } catch (err) {
    console.error('Error saving custom order to database:', err);
    return res.status(500).json({ message: 'Error submitting your order.' });
  }
};
