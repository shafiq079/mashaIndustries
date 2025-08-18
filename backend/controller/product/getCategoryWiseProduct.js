const productModel = require("../../models/productModel")
const cache = require('../../utils/cache');

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const cacheKey = `category-wise-${category}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return res.json({
                data : cachedData,
                message : "Product (from cache)",
                success : true,
                error : false
            });
        }

        const product = await productModel.find({ category })

        cache.set(cacheKey, product);

        res.json({
            data : product,
            message : "Product",
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

module.exports = getCategoryWiseProduct