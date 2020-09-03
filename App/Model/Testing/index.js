let mongoose = require("mongoose");
let validator = require("validator");

let TestingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (val) => {
      return validator.isEmail(val);
    },
  },
});

module.exports = mongoose.model("Testing", TestingSchema);
