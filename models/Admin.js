// // models/Admin.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const adminSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   role: {
//     type: String,
//     enum: ["admin", "superadmin"],
//     default: "admin",
//   },
//   lastLogin: {
//     type: Date,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Hash password before saving
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare passwords
// adminSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("Admin", adminSchema);
// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   passwordHash: { type: String, required: true },
//   role: { type: String, default: "admin" },
// });

// module.exports = mongoose.model("Admin", adminSchema);

// models/Admin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate usernames
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model("Admin", adminSchema);
