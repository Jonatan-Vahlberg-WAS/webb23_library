const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  yearOfBirth: { type: Number, required: true, min: 1600, max: 2023 },
  primaryGenre: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Author = mongoose.model("Author", authorSchema)

module.exports = Author