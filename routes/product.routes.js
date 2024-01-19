const ctrl = require("../controllers/product.controller");
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignup");

module.exports = [
    {path: "/api/v1/add/product", method: "post", handler: [ctrl.createProduct]},
    {path: "/api/v1/get/all/product", method: "get", handler: [ctrl.getAllProducts]},
    {path: "/api/v1/update/product/:id", method: "patch", handler: [ctrl.updateProduct]},
    {path: "/api/v1/delete/product/:id", method: "delete", handler: [ctrl.deleteProduct]},
    {path: "/api/v1/get/product/:id", method: "get", handler: [ctrl.getProductById]},
];
