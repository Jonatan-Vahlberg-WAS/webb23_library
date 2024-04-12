const Express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const bookRouter = Express.Router();

bookRouter.post("/", authMiddleware, createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.put("/:id", authMiddleware, updateBook);
bookRouter.delete("/:id", authMiddleware, deleteBook);

module.exports = bookRouter
