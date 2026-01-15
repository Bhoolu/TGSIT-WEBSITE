// server.js - TGIST Secure Backend
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit"); // NEW

// Models
const Contact = require("./models/Contacts");
const Admin = require("./models/Admin");

// Middleware
const { isAuthenticated } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// ============ DATABASE CONNECTION ============
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============ MIDDLEWARE ============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));
app.use("/CSS", express.static(path.join(__dirname, "CSS")));
app.use("/JS", express.static(path.join(__dirname, "JS")));
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use("/admin", express.static(path.join(__dirname, "admin")));

// ============ SECURITY MIDDLEWARES ============
// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

// IP Whitelisting for admin routes
const allowedIPs = ["129.222.206.170", "127.0.0.1"]; // your public IP + localhost

function ipWhitelist(req, res, next) {
  // Normalize IPv6-mapped IPv4
  let clientIP = req.ip;
  if (clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.replace("::ffff:", "");
  }

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    console.log("Blocked IP:", clientIP); // debug log
    res.status(403).json({ success: false, message: "Access denied" });
  }
}

// const allowedIPs = ["129.222.206.170", "129.222.206.170"]; // replace with your real IPs
// function ipWhitelist(req, res, next) {
//   const clientIP = req.ip.replace("::ffff:", ""); // normalize IPv4
//   if (allowedIPs.includes(clientIP)) {
//     next();
//   } else {
//     res.status(403).json({ success: false, message: "Access denied" });
//   }
// }

// // Apply whitelist to admin routes (both API and static admin pages)
// app.use("/api/admin", ipWhitelist);
// app.use("/admin", ipWhitelist);

// ============ PUBLIC ROUTES ============
// Contact Form Submission
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all required fields" });
  }
  try {
    const contact = new Contact({
      name,
      email,
      subject: subject || "No subject",
      message,
      status: "unread",
    });
    await contact.save();
    res.json({ success: true, message: "Thank you for contacting us!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// ============ ADMIN AUTH ============
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  console.log("Incoming login body:", req.body); // DEBUG

  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    console.log("Admin found:", admin); // DEBUG

    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    console.log("Password match result:", valid); // DEBUG

    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// app.post("/api/admin/login", loginLimiter, async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin)
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });

//     const valid = await bcrypt.compare(password, admin.passwordHash);
//     if (!valid)
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "30m" } // short expiry
//     );
//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// });

// ============ CONTACT CRUD (Protected) ============
// Read all contacts
app.get("/api/admin/contacts", isAuthenticated, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading contacts" });
  }
});

// Update contact status (admin only)
app.patch("/api/admin/contacts/:id", isAuthenticated, async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (adminNote) updateFields.adminNote = adminNote;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating contact" });
  }
});

// Delete contact
app.delete("/api/admin/contacts/:id", isAuthenticated, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting contact" });
  }
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`🚀 TGIST Server Running at http://localhost:${PORT}`);
});
