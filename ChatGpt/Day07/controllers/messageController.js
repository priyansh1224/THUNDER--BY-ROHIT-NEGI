import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
import { generateAIResponse } from "../services/openRouterService.js";
import { updateSummaryIfNeeded } from "../services/summaryService.js";
import { buildMessagesForAI } from "../utils/chatContext.js";
import {
  resetUsageIfNeeded,
  hasTokenLimitReached,
  addUserTokenUsage,
} from "../utils/userUsage.js";
import { addChatTokenUsage } from "../utils/tokenUsage.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, model } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Message content is required",
      });
    }

    await resetUsageIfNeeded(req.user);

    if (hasTokenLimitReached(req.user)) {
      return res.status(429).json({
        message: "Token limit reached. Please try after some time.",
        usage: req.user.usage,
      });
    }

    let chat;

    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        userId: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    } else {
      const selectedModel = model || process.env.DEFAULT_AI_MODEL;

      if (!selectedModel) {
        return res.status(400).json({
          message: "Model is required for new chat",
        });
      }

      chat = await Chat.create({
        userId: req.user._id,
        model: selectedModel,
        topic: content.trim().slice(0, 40),
      });
    }

    const oldMessages = await Message.find({
      chatId: chat._id,
    })
      .sort({ createdAt: 1 })
      .skip(chat.summarizedTillMessageNumber);

    const messagesForAI = buildMessagesForAI({
      chat,
      oldMessages,
      currentMessage: content.trim(),
    });

    const { aiReply, usage } = await generateAIResponse({
      model: chat.model,
      messages: messagesForAI,
    });

    const userMessage = await Message.create({
      chatId: chat._id,
      role: "user",
      content: content.trim(),
      userId: req.user._id
    });

    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: aiReply,
       userId: req.user._id,
       usage,
    });

    chat.messageCount += 2;

    if (chat.topic === "New Chat") {
      chat.topic = content.trim().slice(0, 40);
    }

    await addChatTokenUsage(chat, usage);
    await addUserTokenUsage(req.user, usage.totalTokens);

    res.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      reply: aiReply,
      usage,
      userMessage,
      assistantMessage,
    });

    updateSummaryIfNeeded(chat._id).catch((err) => {
      console.log("Summary update failed:", err.message);
    });
  } catch (err) {
    console.log("sendMessage error:", err.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    const messages = await Message.find({
      chatId: chat._id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Messages fetched successfully",
      chat: {
        id: chat._id,
        topic: chat.topic,
        model: chat.model,
        messageCount: chat.messageCount,
      },
      messages,
    });
  } catch (err) {
    console.log("getMessages error:", err.message);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};