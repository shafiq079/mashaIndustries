const CustomOrderRequestModel = require('../../models/CustomOrderRequest');

exports.uploadfile = async (req, res) => {
  try {
    const { designName, amount, productType, productSize, material, imageUrls, originalNames, description, budget } = req.body;
    const userId = req.userId;

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ message: 'At least one image URL is required.' });
    }

    const newCustomOrder = new CustomOrderRequestModel({
      designName: designName,
      originalNames: originalNames,
      imageUrls: imageUrls,
      quantity: amount,
      productType: productType,
      material: material,
      productsize: productSize,
      userId: userId,
      description: description,
      budget: budget,
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
