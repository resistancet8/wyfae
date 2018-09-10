const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (!Validator.isLength(data.password || "", { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  if (Validator.isEmpty(data.password || "")) {
    errors.password = "Password field is required";
  }

  if (!Validator.isEmail(data.email || "")) {
    errors.email = "Email is Invalid";
  }

  if (Validator.isEmpty(data.email || "")) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
