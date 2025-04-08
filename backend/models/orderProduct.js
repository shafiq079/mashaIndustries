const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productDetails:{
        type: Array,
        default:[],
    },
    email:{
        type:String,
        default:[]
    },
    userId:{
        type: String,
        default:"",
    },
    paymentDetails:{
        paymentId:{
            type: String,
            default:[]
        },
        payment_method_type:[],
        payment_status: {
            type: String,
            default:""
        }
    },
    shippingOptions:[],
    totalAmount:{
        type:Number,
        default:0
    }
}, { timestamps: true }); // Added timestamps here

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
