const express = require("express");
const router = express.Router();
const News = require("../models/News");
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/login", (req, res) => {
    res.render("admin-login", { error: null });
});
// router.get("/register", (req, res) => {
//     res.render("auth/register", { error: null });
// });

router.get("/", authMiddleware, async (req, res) => {
    res.render('news-form', { error: null });
});
router.get("/list", authMiddleware, newsController.getAllNews);
module.exports = router;