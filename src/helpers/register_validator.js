const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.username || "", { min: 2, max: 20 })) {
    errors.username = "Username must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.username || "")) {
    errors.username = "Username field is required";
  }

  if (!Validator.isLength(data.first_name || "", { min: 2, max: 20 })) {
    errors.first_name = "First Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.first_name || "")) {
    errors.first_name = "First Name field is required";
  }

  if (!Validator.isLength(data.sur_name || "", { min: 2, max: 20 })) {
    errors.sur_name = "Sur Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.sur_name || "")) {
    errors.sur_name = "Sur Name field is required";
  }

  if (!Validator.isLength(data.password || "", { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  if (Validator.isEmpty(data.password || "")) {
    errors.password = "Password field is required";
  }

  if (!Validator.equals(data.password || "", data.password2 || "")) {
    errors.password2 = "Password must match";
  }

  if (Validator.isEmpty(data.password2 || "")) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.isEmail(data.email || "")) {
    errors.email = "Email is Invalid";
  }

  if (Validator.isEmpty(data.email || "")) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.dob || "")) {
    errors.dob = "DOB field is required";
  }

  if (!Validator.isLength(data.state || "", { min: 2, max: 20 })) {
    errors.state = "State must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.state || "")) {
    errors.state = "State field is required";
  }

  if (!Validator.isLength(data.country || "", { min: 2, max: 20 })) {
    errors.country = "Country must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.country || "")) {
    errors.country = "Country field is required";
  }

  if (!Validator.isLength(data.city || "", { min: 2, max: 20 })) {
    errors.city = "City must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.city || "")) {
    errors.city = "City field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
