function authorErrorHandler(error, res) {
  if (error.message.includes("validation failed")) {
    return res.status(400).json({
      message: error.message,
    });
  }
  if (error.message.includes("Cast to ObjectId")) {
    console.log(error.message)
    return res.status(404).json({
      message: "Author not found",
    });
  }
  res.status(500).json({
    message: error.message,
  });
}

function bookErrorHandler(error, res) {
  if (error.message.includes("validation failed")) {
    return res.status(400).json({
      message: error.message,
    });
  }
  if (error.message.includes("Cast to ObjectId")) {
    if (error.message.toLowerCase().includes("author")) {
      return res.status(404).json({
        message: "Author not found",
      });
    }
    return res.status(404).json({
      message: "Book not found",
    });
  }
  res.status(500).json({
    message: error.message,
  });
}

function registerErrorHandler(error, res, email = "") {
  let errors = {}
  if (error.message.includes("email: Path `email`")) {
    errors.email = "Email is invalid." 
  }
  if (error.message.includes("password: Path `password`")) {
    errors.password = "Password has to contain at least 8 chars."
  }
  if (error.message.includes("duplicate key error")) {
    errors.email = `An account with email ${email} has allready been registered`
  }
  if(Object.keys(errors).length > 0){
    return res.status(400).json({
      errors
    })
  }
  res.status(500).json({
    message: error.message,
  });
}

function userWithoutPassword(user){
  user = user.toObject()
  delete user.password
  return user
}

module.exports = {
  authorErrorHandler,
  bookErrorHandler,
  registerErrorHandler,
  userWithoutPassword
};
