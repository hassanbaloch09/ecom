const db = require("../models");
const Chat = db.chat;

exports.sendMessage = async (req, res) => {
    const sender_id=req.user.id
    const sender_name=req.user.full_name
    const {receiver_id, message,} = req.body;

    try {
        const newChatMessage = await Chat.create({
            sender_id: sender_id,
            receiver_id: receiver_id,
            sender_name: sender_name,
            message: message,
        });
        if(!newChatMessage){
            newChatMessage.status="failed"
        }

        newChatMessage.status="success"
        await newChatMessage.save()
        res.status(201).json({ success: true, data: newChatMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



exports.getChatMessagesByStatus = async (req, res) => {

    const receiver_id=req.user.id
    const {sender_id } = req.query;

    try {
        const chatMessages = await Chat.findAll({
            attributes: ['sender_id', 'sender_name', 'message', 'createdAt'],
            where: {
                status:"success",
                receiver_id:receiver_id,
                sender_id
            },
        });
        res.status(200).json({ message: true, data: chatMessages });
    } catch (error) {
        res.status(500).json({ message: false, error: error.message });
    }
};

exports.getSendMessagesByStatus = async (req, res) => {

    const sender_id=req.user.id
    const {receiver_id } = req.query;

    try {
        const chatMessages = await Chat.findAll({
            attributes: ['receiver_id', 'message', 'createdAt'],
            where: {
                status:"success",
                sender_id:sender_id,
                sender_id,
                receiver_id
            },
        });
        res.status(200).json({ message: true, data: chatMessages });
    } catch (error) {
        res.status(500).json({ message: false, error: error.message });
    }
};
