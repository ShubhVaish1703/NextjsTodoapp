import { User } from "@/models/user";
import { connectDB, cookieSetter } from '@/utils/features';
import { generateToken } from './../../../utils/features';
const { asyncError, errorHandler } = require("@/middlewares/error");
import bcrypt from 'bcrypt'

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST") return errorHandler(res, 400, "Only POST Method is Allowed.")

    const {email, password } = req.body;

    if (!email || !password) return errorHandler(res, 400, "Please enter all fields.");

    await connectDB();

    // finding the user if he/she exist or not
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
        return errorHandler(res, 400, "Invalid Credentials");
    }

    // matching the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return errorHandler(res, 400, "Invalid Credentials");
    }


    // generating the token
    const token = generateToken(user._id);

    // setting the cookies
    cookieSetter(res, token, true);

    res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user
    })
})

export default handler;