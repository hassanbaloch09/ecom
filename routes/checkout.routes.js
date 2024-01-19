const ctrl = require("../controllers/checkout.controller");
const auth = require("../middleware/auth");

module.exports = [
    {path: "/api/v1/create/checkout", method: "post", handler: [auth,ctrl.createCheckout]},
    {path: "/api/v1/get/all/checkout", method: "get", handler: [auth,ctrl.getAllCheckouts]},
    {path: "/api/v1/update/checkout/:id", method: "patch", handler: [auth,ctrl.updateCheckoutById]},
    {path: "/api/v1/delete/checkout/:id", method: "delete", handler: [auth,ctrl.deleteCheckoutById]},
    {path: "/api/v1/get/checkout/:id", method: "get", handler: [auth,ctrl.getCheckoutById]},
];
