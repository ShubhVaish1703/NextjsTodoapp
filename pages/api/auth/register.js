import { User } from "@/models/user";
import { connectDB, cookieSetter } from '@/utils/features';
import { generateToken } from './../../../utils/features';
const { asyncError, errorHandler } = require("@/middlewares/error");
import bcrypt from 'bcrypt'

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST") return errorHandler(res, 400, "Only POST Method is Allowed.")

    const { name, email, password } = req.body;

    if(!name || !email || !password) return errorHandler(res,400,"Please enter all fields.");

    await connectDB();

    // finding the user if he/she exist or not
    let user = await User.findOne({email});
    if(user){
        return errorHandler(res,400,"User already registered with this email"); 
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password,10)

    // creating the user
    user = await User.create({
        name, email, password: hashedPassword,
    });

    // generating the token
    const token = generateToken(user._id);

    // setting the cookies
    cookieSetter(res,token,true);

    res.status(201).json({
        success:true,
        message:"Registered Successfully",
        user
    })
})

export default handler;