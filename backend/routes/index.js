const express = require('express');
const router = express.Router();
const multer = require('multer');

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const verifyEmailController = require('../controller/user/userVerificationController');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');
const midleupload = require('../middleware/customuploadmidle'); 
const { aiupload, uploadAiImage }=require('../controller/aicontroler/aicontroler')
//try on
const { tryOnImage } = require('../controller/tryon/tryOnController');
const tryonUpload = multer({ dest: 'uploads/tryon' });

const customupload=require('../controller/custom/customcont');
const getAllOrderController = require('../controller/order/allOrderController');

// User routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Admin panel routes
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.get("/order-list", authToken, getAllOrderController);

// Product routes
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Cart routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Add the verification route
router.get("/verify-email", verifyEmailController);

// payment and order
router.post('/checkout',authToken, paymentController)
router.post('/webhook',webhooks)
router.get('/order',authToken, orderController)

// Custom Order Uploads
router.post("/custom",authToken, midleupload.array('files', 10), customupload.uploadfile);

router.post("/aiupload", aiupload.single("aiimage"), uploadAiImage);
//try on feature upload image
router.post("/try-on", tryOnImage);


module.exports = router;
