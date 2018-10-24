const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateMemoryinput(data) {
  let errors = {};

  if (!Validator.isLength(data.title || "", { min: 10 })) {
    errors.title = "Title Should Be At Least 10 Characters";
  }

  if (Validator.isEmpty(data.title || "")) {
    errors.title = "Title Field Is Required";
  }

  if (!Validator.isLength(data.text || "", { min: 100 })) {
    errors.text = "Body Should Be At Least 100 Characters Long";
  }

  if (Validator.isEmpty(data.text || "")) {
    errors.text = "Body Is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
