const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateFeelingsinput(data) {
  let errors = {};

  if (!Validator.isLength(data.post_title || "", { min: 10 })) {
    errors.post_title = "Post Title Should Be At Least 10 Characters";
  }

  if (Validator.isEmpty(data.post_title || "")) {
    errors.post_title = "Post Title Field Is Required";
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
