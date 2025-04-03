const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createNews", authMiddleware, newsController.createNews);
router.get("/:id", authMiddleware, newsController.getNewsById);
router.put("/:id", authMiddleware, newsController.updateNews);
router.post("/delete/:id", authMiddleware, newsController.deleteNews);

router.get("/", authMiddleware, async (req, res) => {
    res.render('news-form', { error: null });
});

module.exports = router;