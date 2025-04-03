const express = require("express");
const router = express.Router();
const News = require("../models/News");
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const latestNews = await News.find()
      .sort({ publishedAt: -1 })
      .limit(3)
    //.populate('author', 'name');
    res.render('home', { news: latestNews, user: "" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY || '59321058daa8f3ba23ceebee45d48297';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log("rul", url)
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

router.get('/sports', async (req, res) => {
  try {
    // const sportsNews = await News.find({ category: 'sports' })
    //   .sort({ publishedAt: -1 })
    //   .populate('author', 'name');
      
    // res.render('sports', { 
    //   news: sportsNews,
    //   user: "" 
    // });

    res.render('sports');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/about', (req, res) => {
  res.render('about', { user: "" });
});

router.get('/contact', (req, res) => {
  res.render('contact', { 
    user: ""
  });
});

module.exports = router;