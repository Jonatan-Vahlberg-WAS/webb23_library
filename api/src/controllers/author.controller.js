const Author = require("../models/author.model");
const { authorErrorHandler } = require("../utils/apiHelpers");

async function createAuthor(req, res) {
  try {
    const _author = req.body;
    const createdBy = req.userId
    const author = await Author.create({
      ..._author,
      createdBy
    });
    await author.populate("createdBy")
    res.status(201).json(author);
  } catch (error) {
    authorErrorHandler(error, res)
  }
}

async function getAuthors(req, res) {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    authorErrorHandler(error, res);
  }
}

async function getAuthor(req, res) {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    if (!author) {
      throw new Error("Cast to ObjectId");
    }
    res.json(author);
  } catch (error) {
    authorErrorHandler(error, res);
    
  }
}

async function updateAuthor(req, res) {
  const { id } = req.params;
  const _author = req.body;
  try {
    if (id !== _author._id) {
      throw new Error("Cast to ObjectId");
    }
    const updatedAuthor = await Author.findByIdAndUpdate(id, _author, {
        new: true,
        runValidators: true
    });
    if (!updatedAuthor) {
      throw new Error("Cast to ObjectId");
    }
    res.json(updatedAuthor);
  } catch (error) {
    authorErrorHandler(error, res);
  }
}

async function deleteAuthor(req, res) {
  const { id } = req.params;

  try {
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      throw new Error("Cast to ObjectId");
    }
    res.status(204).json();
  } catch (error) {
    authorErrorHandler(error, res);
  }
}

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
