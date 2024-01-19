const ctrl = require("../controllers/chat.controller");
const auth = require("../middleware/auth");

module.exports = [
    {path: "/api/v1/send/message", method: "post", handler: [auth,ctrl.sendMessage]},
    {path: "/api/v1/received/message", method: "get", handler: [auth,ctrl.getChatMessagesByStatus]},
    {path: "/api/v1/get/send//messages", method: "get", handler: [auth,ctrl.getSendMessagesByStatus]},
];
