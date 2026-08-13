import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database.js";
import userRouter from "./routes/userRouter.js"
import messageRouter from "./routes/messageRouter.js"
dotenv.config();

const app=express();
app.use(express.json());


app.use("/user",userRouter)
app.use("/msg",messageRouter)

const startServer=async()=>{
    try {
        await connectDB();

        app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();
