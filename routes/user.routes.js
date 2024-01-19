const ctrl = require("../controllers/user.controller");
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignup");

module.exports = [
    {path: "/api/v1/auth/signUp", method: "post", handler: [checkDuplicateUsernameOrEmail,ctrl.signup]},
    {path: "/api/v1/auth/signIn", method: "post", handler: [ctrl.signin]},
];
