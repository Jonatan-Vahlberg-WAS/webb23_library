const Express = require("express");

const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authorRouter = Express.Router();

authorRouter.post("/",authMiddleware, createAuthor);
authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthor);
authorRouter.put("/:id", authMiddleware, updateAuthor);
authorRouter.delete("/:id",authMiddleware, deleteAuthor);

module.exports = authorRouter;
