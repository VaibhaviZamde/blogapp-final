import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';
import User from '../model/user.js';



dotenv.config();


// ================= SIGNUP =================
export const signupUser = async (request, response) => {
    try {
        const { username, name, password } = request.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return response.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            name,
            password: hashedPassword
        };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successful' });

    } catch (error) {
        console.log("SIGNUP ERROR ❌:", error);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
};


// ================= LOGIN =================
export const loginUser = async (request, response) => {
    try {
        console.log("LOGIN HIT:", request.body);

        const { username, password } = request.body;

        const user = await User.findOne({ username });

        if (!user) {
            return response.status(400).json({ msg: 'Username does not match' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return response.status(400).json({ msg: 'Password does not match' });
        }

        // fallback secrets (avoid crash if .env missing)
        const accessSecret = process.env.ACCESS_SECRET_KEY || "ACCESS_SECRET";
        const refreshSecret = process.env.REFRESH_SECRET_KEY || "REFRESH_SECRET";

        const accessToken = jwt.sign(user.toJSON(), accessSecret, { expiresIn: '15m' });
        const refreshToken = jwt.sign(user.toJSON(), refreshSecret);

        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        return response.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username
        });

    } catch (error) {
        console.log("LOGIN ERROR ❌:", error);
        return response.status(500).json({ msg: 'Error while login user' });
    }
};


// ================= LOGOUT =================
export const logoutUser = async (request, response) => {
    try {
        const token = request.body.token;

        if (!token) {
            return response.status(400).json({ msg: 'Token required' });
        }

        await Token.deleteOne({ token });

        return response.status(200).json({ msg: 'Logout successful' });

    } catch (error) {
        console.log("LOGOUT ERROR ❌:", error);
        return response.status(500).json({ msg: 'Error during logout' });
    }
};