const handeError = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  console.log(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid email/password") {
    code = 400;
    message = "Invalid email/password";
  } else if (err.name === "Invalid access_token") {
    code = 401;
    message = "Unauthorized";
  } else if (err.name === "Password is required") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "Email is required") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "You are not authorized";
  } else if (err.name === "Data User Not Found") {
    (code = 400), (message = `Data User With Id ${err.id} Not Found`);
  } else if (err.name === "Password Not Match") {
    (code = 400), (message = "Password Not Match");
  } else if (err.name === "Invalid Password") {
    (code = 400), (message = "Invalid Password");
  } else if (err.name === "Data Post Not Found") {
    (code = 400), (message = `Data Post With Id ${err.id} Not Found`);
  } else if (err.name === "Uploaded Image is required") {
    (code = 400), (message = "Uploaded Image is required");
  } else if (err.name === "Like/Unlike Failed") {
    (code = 400), (message = "Like/Unlike Failed");
  } else if (err.name === "can't like because already liked") {
    (code = 400), (message = "can't like because already liked");
  } else if (err.name === "can't dislike because it hasn't been liked") {
    (code = 400), (message = "can't dislike because it hasn't been liked");
  }
  res.status(code).json({
    success: false,
    message: message,
    data: null,
  });
};

module.exports = handeError;
