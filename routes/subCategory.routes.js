const ctrl = require("../controllers/subcategory.controller");
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignup");

module.exports = [
    {path: "/api/v1/create/sub/category", method: "post", handler: [ctrl.createSubCategory]},
    {path: "/api/v1/get/all/sub/category", method: "get", handler: [ctrl.getSubCategories]},
    {path: "/api/v1/update/sub/category/:id", method: "patch", handler: [ctrl.updateSubCategory]},
    {path: "/api/v1/delete/sub/category/:id", method: "delete", handler: [ctrl.deleteSubCategory]},
    {path: "/api/v1/get/sub/category/:id", method: "get", handler: [ctrl.getSubCategoryById]},
];
