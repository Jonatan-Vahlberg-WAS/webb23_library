const Author = require("../models/author.model");
const Book = require("../models/book.model");
const { bookErrorHandler } = require("../utils/apiHelpers");

async function createBook(req, res) {
  const _book = req.body;
  try {
    const createdBy = req.userId
    const author = await Author.findById(_book.author);
    if (!author) {
      throw new Error("Cast to ObjectId: author");
    }
    const book = await Book.create({
      ..._book,
      createdBy
    });
    await book.populate(["author", "createdBy"])
    res.status(201).json(book);
  } catch (error) {
    bookErrorHandler(error, res);
  }
}

async function getBooks(req, res) {
  let filter = {};
  if (req.query.author) {
    filter.author = req.query.author;
  }
  try {
    const books = await Book.find(filter).populate("author");
    res.json(books);
  } catch (error) {
    res.json([]);
  }
}

async function getBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate("author");
    if (!book) {
      throw new Error("Cast to ObjectId");
    }
    res.json(book);
  } catch (error) {
    bookErrorHandler(error, res);
  }
}

async function updateBook(req, res) {
  const { id } = req.params;
  const _book = req.body;
  const createdBy = req.userId

  try {
    const author = await Author.findById(_book.author);
    if (!author) {
      throw new Error("Cast to ObjectId: author");
    }
    const book = await Book.findByIdAndUpdate(id, {
      ..._book,
      createdBy
    }, {
      new: true,
      runValidators: true,
    }).populate("author");
    if (!book) {
      throw new Error("Cast to ObjectId");
    }
    res.json(book);
  } catch (error) {
    bookErrorHandler(error, res);
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new Error("Cast to ObjectId");
    }
    res.status(204).json();
  } catch (error) {
    bookErrorHandler(error, res);
  }
}

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
