import { serialize } from 'cookie';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { User } from '@/models/user';

export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "NextTodo",
    })
    // console.log("Database connected on "+ connection.host)
}

// function to set cookies
export const cookieSetter = (res, token, set) => {

    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: '/',
        httpOnly: true,
        maxAge: set ? 60 * 60 * 1000 : 0,
    }))
}

// function to generate auth token
export const generateToken = (_id) => {
    return jwt.sign({_id},process.env.JWT_SECRET)
}


//function for checking the user is authenticated or not
export const checkAuth = async(req) => {
    const cookie = req.headers.cookie;
    if(!cookie) return null;
    
    const token = cookie.split("=")[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    return await User.findById(decoded._id);
}