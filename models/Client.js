// models/Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Sort by order, then by creation date
clientSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model("Client", clientSchema);
