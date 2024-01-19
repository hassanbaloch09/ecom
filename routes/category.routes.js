const ctrl = require("../controllers/category.controller");
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignup");

module.exports = [
    {path: "/api/v1/create/category", method: "post", handler: [ctrl.createCategory]},
    {path: "/api/v1/get/all/category", method: "get", handler: [ctrl.getAllCategories]},
    {path: "/api/v1/update/category/:id", method: "patch", handler: [ctrl.updateCategory]},
    {path: "/api/v1/delete/category/:id", method: "delete", handler: [ctrl.deleteCategory]},
    {path: "/api/v1/get/category/:id", method: "get", handler: [ctrl.getCategoryById]},
];
