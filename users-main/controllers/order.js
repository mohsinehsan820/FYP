const orderModel = require('../models/order');
const cartModel = require('../models/cart');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/throwError');

exports.create = async (req, res) => {
    try {
        const user = req.user.userId;
        const cart = await cartModel.findOne({ user: user });
        const newOrder = new orderModel({
            user,
            ...req.body,
        })

        cart.items.pull(...req.body.items)
        await cart.save();
        await newOrder.save();
        sendSuccessResponse(res, "Order placed successfully", newOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.cancel = async (req, res) => {
    try {
        const cancelOrder = await orderModel.findByIdAndDelete(req.params.id);

        if (!cancelOrder) {
            throw new ThrowError("Order not found");
        }

        sendSuccessResponse(res, "Order canceled successfully", cancelOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.all = async (req, res) => {
    try {
        const user = req.user.userId

        const findOrder = await orderModel.find({ user: user });

        if (findOrder.length === 0) {
            throw new ThrowError("No Order placed yet.");
        }

        sendSuccessResponse(res, "Your order fetched successfully", findOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('user', 'name email');
        sendSuccessResponse(res, "All orders fetched successfully", orders);
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, e);
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            throw new ThrowError("Order not found");
        }
        sendSuccessResponse(res, "Order status updated successfully", order);
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, e);
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;
        const order = await orderModel.findByIdAndUpdate(id, { paymentStatus }, { new: true });
        if (!order) {
            throw new ThrowError("Order not found");
        }
        sendSuccessResponse(res, "Payment status updated successfully", order);
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, e);
    }
};

exports.read = async (req, res) => {
    try {
        const orderNum = req.params.id;

        const findOrder = await orderModel.findById(orderNum);

        sendSuccessResponse(res, "Your order fetched successfully", findOrder)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}