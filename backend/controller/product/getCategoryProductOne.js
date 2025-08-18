const productModel = require("../../models/productModel")
const cache = require('../../utils/cache');


const getCategoryProduct = async(req,res)=>{
    try{
        const cacheKey = 'categoryProduct';
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return res.json({
                message : "category product (from cache)",
                data : cachedData,
                success : true,
                error : false
            });
        }

        const productCategory = await productModel.distinct("category")

        //array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }

        cache.set(cacheKey, productByCategory);

        res.json({
            message : "category product",
            data : productByCategory,
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

module.exports = getCategoryProduct