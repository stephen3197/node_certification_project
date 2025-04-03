const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const generateToken = async (admin) => {
  return jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Admin Signup
exports.register = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Email already exists" });

    const admin = new Admin({ username, email, password });
    await admin.save();

    //res.status(201).json({ message: "Admin registered successfully" });
    return res.render('admin-login', {
      error: true,
      message: "Admin registered successfully. \nPlease login to use the Admin features.",
      dialog: true
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render('admin-login', {
        error: true,
        message: "Admin Details Not Found. \nPlease Resgiter and login as Admin.",
        dialog: true
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = await generateToken(admin);
    res.cookie("token", token, { httpOnly: true });
    //res.status(200).json({ message: "Login successful", token });
    res.redirect("/admin/news");
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

// Admin Logout
exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};
