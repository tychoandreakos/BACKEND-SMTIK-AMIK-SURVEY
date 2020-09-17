const mongoose = require("mongoose");
const validator = require("validator");

const configuration = {
  lengthVal: {
    min: 2,
    max: undefined,
  },
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
    validate: (val) => {
      return validator.isLength(val, configuration.lengthVal);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (val) => {
      return validator.isEmail(val);
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    validate: (val) => {
      return validator.isLength(val, configuration.lengthVal);
    },
  },
  createdAt: {
    type: Date,
    required: false,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },
  // image: String,
  // jk: String,
  // name: {
  //   type: String,
  //   required: false,
  //   lowercase: true,
  //   validate: (val) => {
  //     return validator.trim(val).isLength(val, configuration.lengthVal);
  //   },
  //   address: {
  //     type: String,
  //     required: false,
  //     lowercase: true,
  //     validate: (val) => {
  //       return validator.trim(val).isLength(val, configuration.lengthVal);
  //     },
  //   },
  //   phone: {
  //     type: Number,
  //     validate: (val) => {
  //       return validator
  //         .trim(val)
  //         .isLength(val, configuration.lengthVal)
  //         .isNumeric(val);
  //     },
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //     validate: (val) => {
  //       return validator.isDate(val).isLength(val, configuration.lengthVal);
  //     },
  //   },
  // },
});

module.exports = mongoose.model("User", schema);
