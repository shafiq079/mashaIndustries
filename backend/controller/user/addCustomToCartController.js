const CustomOrderRequestModel = require('../../models/CustomOrderRequest');
const cartModel = require('../../models/cartProduct');

const addCustomToCartController = async (req, res) => {
    try {
        const { customOrderId } = req.body;
        const currentUserId = req.userId;

        if (!customOrderId) {
            throw new Error("Custom Order ID is required.");
        }

        const customOrder = await CustomOrderRequestModel.findOne({ _id: customOrderId, userId: currentUserId });

        if (!customOrder) {
            throw new Error("Custom order not found or you do not have permission to add it.");
        }

        if (customOrder.status !== 'approved') {
            throw new Error("This order has not been approved yet.");
        }

        const newCartItem = new cartModel({
            userId: currentUserId,
            quantity: customOrder.quantity,
            isCustom: true,
            customDetails: {
                productType: customOrder.productType,
                productsize: customOrder.productsize,
                material: customOrder.material,
                image: customOrder.filePath,
                price: customOrder.adminPrice
            }
        });

        const savedCartItem = await newCartItem.save();

        res.json({
            message: "Custom order added to cart successfully.",
            data: savedCartItem,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addCustomToCartController;
