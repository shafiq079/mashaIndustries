const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref: 'product',
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    userId: {
        type: String,
        required: true
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    customDetails: {
        designName: { type: String },
        productType: { type: String },
        productsize: { type: String },
        material: { type: String },
        image: { type: String },
        price: { type: Number } // This will be the admin-set price
    }
}, {
    timestamps: true
});

const addToCartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = addToCartModel;