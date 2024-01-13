const {Signup, Login, Logout} = require('../controller/AuthController');

const router = require("express").Router();

router.post("/register", Signup);
router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;