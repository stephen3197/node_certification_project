const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../utils/validator");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

// router.get("/login", (req, res) => {
//     res.redirect("/", { error: null });
// });

router.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    //res.render("admin-login", { error: null });
    //res.status(200).redirect('/admin/login').json({ message: "Logout successful" });
    res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
