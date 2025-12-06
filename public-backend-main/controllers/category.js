const CategoryModel = require('../models/category')

exports.getAll = async (req, res) => {
    try {
        const data = await CategoryModel.find().populate('products');        
        return res.status(200).json({ message: 'All categories fetched successfully', data });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'server error', e });
    }
}

exports.read = async (req, res) => {
    try {
        const { slug } = req.params;
        const ProductModel = require('../models/product');

        const category = await CategoryModel.findOne({slug});

        if (!category) {
            return res.status(404).json({ message: 'Slug not matched. Category not found' });
        }

        // Fetch products that match this category slug
        const products = await ProductModel.find({ category: slug });

        const data = {
            ...category.toObject(),
            products: products
        };

        return res.status(200).json({ message: 'Category fetched successfully', data});
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'server error', e });
    }
}