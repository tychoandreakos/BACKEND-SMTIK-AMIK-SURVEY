const mongoose = require("mongoose");
const validator = require("validator");

const configuration = {
  lengthVal: {
    min: 8,
    max: 255,
  },
  lengthItem: {
    min: 5,
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
      _id: {
        type: String,
        required: true,
      },
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
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          lowercase: true,
          validate: (val) => {
            return validator.isLength(val, configuration.lengthVal);
          },
        },
        type: {
          type: String,
          required: true,
          validate: (val) => {
            return validator.isLength(val, configuration.lengthTypeQuestion);
          },
        },
        item: [
          {
            _id: String,
            title: {
              type: String,
              required: false,
              lowercase: true,
              validate: (val) => {
                return validator.isLength(val, configuration.lengthItem);
              },
            },
            selected: Boolean,
          },
        ],
        createdAt: {
          type: Date,
          required: false,
        },
        modifiedAt: {
          type: Date,
          required: false,
        },
      },
    ],
  },
  status: {
    type: Boolean,
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
