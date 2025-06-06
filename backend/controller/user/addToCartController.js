const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId; // Assuming this is the logged-in user ID

        // Check if the product is already in the user's cart
        const isProductAvailable = await addToCartModel.findOne({
            productId,
            userId: currentUser // Check if the product is already in the user's cart
        });

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in your cart",
                success: false,
                error: true
            });
        }

        // If the product is not in the cart, add it to the cart
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to cart",
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.json({
            message: err?.message || "Something went wrong",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
