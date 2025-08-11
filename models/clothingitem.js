const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    type: String,
    required: true,
    enum: ["sunny", "rainy", "snowy", "cloudy"],
  },

  image: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  likes: {
    type: Number,
    ref: "User",
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
