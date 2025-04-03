const News = require("../models/News");

// Create News Article
exports.createNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const news = new News({ title, content, imageUrl });
    await news.save();
    res.send({ message: "News article created" });
    // return res.render('news-form', {
    //   message: "News Sumbitted Successfully",
    //   dialog: true
    // });
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error });
  }
};

// Get All News Articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    //res.status(200).json(news);
    res.render("news-list", { news });
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Get Single News Article
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Update News Article
exports.updateNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );
    if (!news) return res.status(404).json({ message: "News not found" });
    res.status(200).json({ message: "News updated", news });
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

// Delete News Article
exports.deleteNews = async (req, res) => {
  try {
    const newsById = await News.findByIdAndDelete(req.params.id);
    if (!newsById) return res.status(404).json({ message: "News not found" });
    //res.status(200).json({ message: "News deleted" });
    const news = await News.find().sort({ publishedAt: -1 });
    //res.status(200).json(news);
    res.render("news-list", { news });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
