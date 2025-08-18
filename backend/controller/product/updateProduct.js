const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')
const cache = require('../../utils/cache');

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        // Invalidate cache for general category list and the specific categories affected.
        cache.del('categoryProduct');
        cache.del(`category-wise-${updateProduct.category}`); // Invalidate the original category cache
        if (resBody.category) {
            cache.del(`category-wise-${resBody.category}`); // Invalidate the new category cache as well
        }
        
        res.json({
            message : "Product update successfully",
            data : updateProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateProductController