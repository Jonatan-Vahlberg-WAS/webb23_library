const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    title: { type: String, required: true },
    yearOfPublication: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    ISBN: { type: String} //optional
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book