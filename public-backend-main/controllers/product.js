const ProductModel = require('../models/product')

exports.getAll = async (req, res) => {
    try {
        const data = await ProductModel.find();
        return res.status(200).json({ message: 'All products fetched successfully', data });
    } catch (e) {
        console.log(e);
        // sendErrorResponse(res, 'Failed to fetch products', e); // sendErrorResponse is not defined in this snippet, assuming it's imported or I should use res.status
        return res.status(500).json({ message: 'Failed to fetch products', error: e.message });
    }
};

exports.read = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await ProductModel.findOne({ slug });

        if (!data) {
            return res.status(404).json({ message: 'Slug not matched. Product not found'});
        }

        return res.status(404).json({ message: 'Product fetched successfully', data });
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, 'Server error', e, 500);
    }
};
