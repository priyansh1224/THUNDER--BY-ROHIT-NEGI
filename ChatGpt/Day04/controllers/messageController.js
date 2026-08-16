import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";

export const getMessage =async(req,res)=>{
    try {
        
        const {chatId}=req.params;

        Chat.findOne({
            _id:chatId,
            userId:req.user._id
        });

        if(!chat){
            return res.status().json({
                message:"Chat not found"
            })
        }

        const messages=await Message.find({
            chatId:chatId
        }).sort({createdAt:1});

        res.status(200).json({
            messages:"your all messages are here"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            messages:"internal server error" 
        })
    }
}
export const sendMessage =async(req,res)=>{
    try {
        
        const {chatId}=req.params;
        const{content}=req.body;

        if(!content||content.trim()===""){
            return res.status(400).json({
                message:"you didn't share any thing"
            })
        };

        // verify that chatId belongs to particular user

        const chat= await Chat.findOne({
            _id:chatId,
            userId:req.user._id
        });

        const userMessage=await Message.create({
            userId:req.user._id,
            chatId:chatId,
            role:"user",
            content:content,
            
        });

        //content:Ai ko bheJhna hai 
        const dummyReply="hi i am batMan"

        const assMessage=Message.create({
             userId:req.user._id,
            chatId:chatId,
            role:"user",
            content:dummyReply,
            
        });

        res.status(201).json({
            message:dummyReply,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
