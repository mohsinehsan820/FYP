const userModel = require('../models/user')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');
const ThrowError = require('../utils/throwError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new ThrowError('Email is required.');
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) { throw new ThrowError('Email already exist.') }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ email, password: hashedPassword })

        sendSuccessResponse(res, 'You are registered successfully', newUser)
    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) { throw new ThrowError('User is not registered.') }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) { throw new ThrowError('Incorrect password.') }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '24h' })

        const data = { user, token }
        
        sendSuccessResponse(res, 'You are logged in successfully', data)

    } catch (e) {
        console.log(e)
        sendErrorResponse(res, e)
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find({});
        sendSuccessResponse(res, 'All users fetched successfully', users);
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, e);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            throw new ThrowError('User not found');
        }
        sendSuccessResponse(res, 'User deleted successfully', user);
    } catch (e) {
        console.log(e);
        sendErrorResponse(res, e);
    }
};