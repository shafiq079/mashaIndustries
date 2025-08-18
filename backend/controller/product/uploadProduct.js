const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")
const cache = require('../../utils/cache');

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
    
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        // Invalidate cache
        cache.del('categoryProduct');
        cache.del(`category-wise-${saveProduct.category}`);

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController