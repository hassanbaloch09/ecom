const ctrl = require("../controllers/payment.controller");
const auth = require("../middleware/auth");

module.exports = [
    {path: "/api/v1/create/payment", method: "post", handler: [auth, ctrl.payment]},
    {path: "/api/v1/validate/payment", method: "post", handler: [auth,ctrl.validateOrder]},
    {path: "/api/v1/get/transaction-list", method: "get", handler: [auth,ctrl.getTransactionList]},
    {path: "/api/v1/get/successful/transaction-list", method: "get", handler: [auth,ctrl.getSuccessfulTransactions]},
    {path: "/api/v1/get/failed/transaction-list", method: "get", handler: [auth,ctrl.getFailedTransactions]},
    {path: "/api/v1/get/transaction/:id", method: "get", handler: [auth,ctrl.getTransactionByID]},
];
