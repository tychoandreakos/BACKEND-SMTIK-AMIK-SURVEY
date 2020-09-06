const mongoose = require("mongoose");
const validator = require("validator");

const configuration = {
  lengthVal: {
    min: 8,
    max: 255,
  },
  lengthCategory: {
    min: 3,
    max: 255,
  },
  lengthTypeQuestion: {
    min: 3,
    max: 255,
  },
};

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    validate: (val) => {
      return validator.isLength(val, configuration.lengthVal);
    },
  },
  logo: String,
  category: {
    type: String,
    required: true,
    lowercase: true,
    validate: (val) => {
      return validator.isLength(val, configuration.lengthCategory);
    },
  },
  surveyForm: {
    title: {
      type: String,
      required: true,
      lowercase: true,
      validate: (val) => {
        return validator.isLength(val, configuration.lengthVal);
      },
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
      validate: (val) => {
        return validator.isLength(val, configuration.lengthVal);
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
            return validator.isLength(val, configuration.lengthVal);
          },
        },
        typeQuestion: {
          type: String,
          required: true,
          lowercase: true,
          validate: (val) => {
            return validator.isLength(val, configuration.lengthTypeQuestion);
          },
        },
        item: [
          {
            title: {
              type: String,
              required: true,
              lowercase: true,
              validate: (val) => {
                return validator.isLength(val, configuration.lengthVal);
              },
            },
            selected: Boolean,
            date: {
              type: Date,
              required: true,
            },
          },
        ],
      },
    ],
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Survey", schema);
