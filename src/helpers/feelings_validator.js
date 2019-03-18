const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateFeelingsinput(data) {
  let errors = {};

  if (!Validator.isLength(data.post_title || "", { min: 1 })) {
    errors.post_title = "Post Title Should Be At Least 1 Character";
  }

  if (Validator.isEmpty(data.post_title || "")) {
    errors.post_title = "Post Title Field Is Required";
  }

  if (!Validator.isLength(data.text || "", { min: 1 })) {
    errors.text = "Body Should Be At Least 1 Character Long";
  }

  if (Validator.isEmpty(data.text || "") || !data.text.trim()) {
    errors.text = "Body Is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
