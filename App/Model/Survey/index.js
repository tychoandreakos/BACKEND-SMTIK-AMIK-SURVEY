const mongoose = require("mongoose");
const validator = require("validator");

const configuration = {
  lengthVal: {
    min: 8,
    max: undefined,
  },
};

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (val) => {
      return validator
        .isLength(val, configuration.lengthVal)
        .isLowerCase()
        .trim(val)
        .escape(input);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (val) => {
      return validator.isEmail(val).isLength(val, configuration.lengthVal);
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (val) => {
      return validator.trim(val).isLength(val, configuration.lengthVal);
    },
  },
});

module.exports = mongoose.model("Survey", schema);
