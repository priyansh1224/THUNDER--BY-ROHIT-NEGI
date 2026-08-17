import Chat from "../model/chatSchema.js"
import Message from "../model/messageSchema.js"

//req.user= user information for fetching recent 20 chats 

export const getRecentChat=async(req,res)=>{
    try {
       const chats=await Chat.find({userId:req.user._id}).select("topic  updatedAt ")
       .sort({updatedAt:-1}).limit(20);

        res.status(200).json({
            message:"Your all recent chats",
            chats
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getSingleChat=async(req,res)=>{
    try {
        const {chatId}=req.params;
        const chat = await Chat.findOne({_id:chatId,userId:req.user._id});
        if(!chat){
            return res.status(404)
            .json({
                message:"sorry not data found"
            })
        }

        res.status(200).json({
            chatId:chat._id,
            userId:chat.userId,
            topic:chat.topic,
            usage:chat.usage,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const CreateChat=async(req,res)=>{
    try {
        const{model}=req.body;
        if(!model){
            return res.status(400).json({
                message:"Model name is missing"
            })
        }
        const chat=await Chat.create({
            userId:req.user._id,
            model,
        })

        res.status(201).json({
            chatId:chat._id,
            userId:req.user._id,
            model,
            topic:chat.topic,
            createdAt:chat.createdAt,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const deleteChat=async(req,res)=>{
    try {
        const {chatId}=req.params;

        const chat=await Chat.findOne({
            _id:chatId,userId:req.user._id
        });
        if(!chat){
            return res.status(403).json({
                message:"You are not allowed to do this"
            })
        }

        await Chat.deleteOne({
            _id:chatId
        });

        await Message.deleteMany({
            chatId:chat._id
        })
        res.status(200).json({
            message:"your message deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}



