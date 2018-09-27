const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUpdateInput(data) {
  let errors = {};

  if (!Validator.isLength(data.fname || "", { min: 2, max: 20 })) {
    errors.fname = "First Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.fname || "")) {
    errors.fname = "First Name field is required";
  }

  if (!Validator.isLength(data.sur_name || "", { min: 2, max: 20 })) {
    errors.sur_name = "Sur Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.sur_name || "")) {
    errors.sur_name = "Sur Name field is required";
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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
