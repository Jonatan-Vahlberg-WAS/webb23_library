
const Express = require("express");
const cors = require("cors");
const authorRouter = require("./routes/author.route");
const bookRouter = require("./routes/book.route");
const authRouter = require("./routes/auth.route");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
}))

app.get("/", (req, res)  => {
    res.json({
        message: "Library API",
        p: process.env.MONGODB_URI
    })
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);


module.exports = app