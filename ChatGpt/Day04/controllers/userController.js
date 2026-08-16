import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { loginSchema, signupSchema } from "../validators/userValidators.js"
//login
//logout
//signup
//profile

const createToken = (id, email) => {

    if (process.env.JWT_SECRET) {
        throw new Error("JWT secret key is missing")
    }
    jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

const cookieOption = {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000
}

export const login = async (req, res) => {

    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues[0].message
            })
        }

        const { email, password } = result.data;


        //verify the password

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        // match the password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const token = createToken(existingUser._id, email);

        res.cookie("token", token, cookieOption);

        res.status(200).json({
            message: "user Logged in successfully",
            name: existingUser.name,
            age: existingUser.age,
            email: existingUser.email,
            usage: existingUser.usage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
    })

    res.status(200).json({
        message: "user logged out successfully"
    })

}


export const signup = async (req, res) => {
    try {

        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues[0].message
            })
        }

        const { name, age, email, password } = result.data;


        // http status code. 
        // email already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const userCreated = await User.create({
            name,
            age,
            email,
            password: hashPassword
        });

        //token create karna padega
        //_id, email:payload

        const token = createToken(userCreated._id, email);

        res.cookie("token", token, cookieOption);

        res.status(201).json({
            message: "user created successfully ",
            name,
            age,
            email
        });


    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// export const profile=async(req,res)=>{
//     try {
//         const {email}=req.body;
//         if(!email){
//             return res.status(400).json({
//                 message:"Email is required"
//             })
//         }
//         const existingUser=await User.findOne({email});
//         if(!existingUser){
//             return res.status(404).json({
//                 message:"User not found"
//             })
//         }
//         res.status(200).json({
//             name:existingUser.name,
//             age:existingUser.age,
//             email:existingUser.email,
//             usage:existingUser.usage
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message:"Internal server error"
//         })
//     }
// }

export const profile = async (req, res) => {
    try {
        res.status(200).json({
            age: req.User.age,
            name: req.user.name,
            email: req.user.email,
            usage: req.User.usage

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

