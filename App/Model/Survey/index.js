const mongoose = require("mongoose");
const validator = require("validator");

const configuration = {
  lengthVal: {
    min: 8,
    max: 255,
  },
};

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    validate: (val) => {
      return validator.isLength(val.configuration.lengthVal).trim(val);
    },
  },
  logo: String,
  category: {
    type: String,
    required: true,
    lowercase: true,
    validate: (val) => {
      return validator.isLength(val.configuration.lengthVal).trim(val);
    },
  },
  surveyForm: {
    title: {
      type: String,
      required: true,
      lowercase: true,
      validate: (val) => {
        return validator.isLength(val.configuration.lengthVal).trim(val);
      },
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      validate: (val) => {
        return validator.isLength(val.configuration.lengthVal).trim(val);
      },
    },
    surveyCategoryBuilder: {
      icon: {
        body: String,
        width: Number,
        height: Number,
      },
      title: String,
      active: Boolean,
      current: Boolean,
    },
    surveyQuestion: [
      {
        title: {
          type: String,
          required: true,
          lowercase: true,
          validate: (val) => {
            return validator.isLength(val.configuration.lengthVal).trim(val);
          },
        },
        typeQuestion: {
          type: String,
          required: true,
          lowercase: true,
          validate: (val) => {
            return validator.isLength(val.configuration.lengthVal).trim(val);
          },
        },
        item: [
          {
            title: {
              type: String,
              required: true,
              lowercase: true,
              validate: (val) => {
                return validator
                  .isLength(val.configuration.lengthVal)
                  .trim(val);
              },
            },
            selected: Boolean,
          },
        ],
        date: Date,
      },
    ],
  },
  date: {
    type: Date,
    required: true,
    validate: (val) => {
      return validator.isDate(val).isLength(val, configuration.lengthVal);
    },
  },
});

module.exports = mongoose.model("Survey", schema);
