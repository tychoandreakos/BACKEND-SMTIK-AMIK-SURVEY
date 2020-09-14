const SurveyModel = require("../../Model/Survey");
const base64 = require("base64image");
const stringRandom = require("randomstring");

exports.index = async (req, res) => {
  try {
    const data = await SurveyModel.find(
      {},
      {
        "surveyForm.title": 0,
        "surveyForm.description": 0,
        "surveyForm.surveyCategoryBuilder": 0,
      }
    )
      .limit(5)
      .sort({ createdAt: -1 });
    const total = await SurveyModel.find().countDocuments();
    res.json({
      success: true,
      message: "Success fetching database!",
      time: new Date().toISOString(),
      total,
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      message: "Whoops, failed fetching database!",
      total,
      data: err,
    });
  }
};

exports.imageProcessing = async (req, res) => {
  const { image } = req.body;
  const image64 = image.split(",")[1];
  const filename = stringRandom.generate(7) + "-" + new Date().toISOString();
  const options = { filename, filePath: "./Uploads/Image/" };
  const imageData = new Buffer.from(image64, "base64");

  base64.base64decoder(imageData, options, function (err, saved) {
    if (err) {
      res.json({
        success: false,
        time: new Date().toISOString(),
        message: "Whoops, failed save image!",
        data: {
          image: err,
        },
      });
    }

    try {
      res.json({
        success: true,
        message: saved,
        data: {
          image: filename + ".jpg",
        },
      });
    } catch (err) {
      res.json({
        success: false,
        time: new Date().toISOString(),
        message: "Whoops, failed save image!",
        data: {
          image: err,
        },
      });
    }
  });
};

exports.update = async (req, res) => {
  const {
    _id,
    SURVEY_TITLE,
    SURVEY_LOGO,
    SURVEY_HEADER_TITLE,
    SURVEY_HEADER_DESC,
    SURVEY_CATEGORY_BUILDER,
    SURVEY_FORM_QUESTION,
  } = req.body;

  const data = {
    title: SURVEY_TITLE,
    logo: SURVEY_LOGO,
    surveyForm: {
      title: SURVEY_HEADER_TITLE,
      description: SURVEY_HEADER_DESC,
      surveyCategoryBuilder: {
        _id: SURVEY_CATEGORY_BUILDER._id,
        icon: SURVEY_CATEGORY_BUILDER.icon,
        title: SURVEY_CATEGORY_BUILDER.title,
        active: SURVEY_CATEGORY_BUILDER.active,
        current: SURVEY_CATEGORY_BUILDER.current,
      },
      surveyQuestion: SURVEY_FORM_QUESTION,
    },
    updatedAt: new Date().toISOString(),
  };

  try {
    await SurveyModel.updateOne({ _id }, { $set: data });
    res.json({
      success: true,
      time: new Date().toISOString(),
      id: _id,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      id: _id,
      data: err,
    });
  }
};

exports.edit = async (req, res) => {
  const _id = req.params.id;
  const data = await SurveyModel.findOne({ _id });
  try {
    res.json({
      success: true,
      time: new Date().toISOString(),
      data: data,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      data: err,
    });
  }
};

exports.destroy = async (req, res) => {
  const _id = req.params.id;
  const data = await SurveyModel.deleteOne({ _id });
  try {
    res.json({
      success: true,
      time: new Date().toISOString(),
      data: data,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      data: err,
    });
  }
};

exports.store = async (req, res) => {
  const {
    SURVEY_TITLE,
    SURVEY_LOGO,
    SURVEY_HEADER_TITLE,
    SURVEY_HEADER_DESC,
    SURVEY_CATEGORY_BUILDER,
    SURVEY_FORM_QUESTION,
  } = req.body;

  const data = {
    title: SURVEY_TITLE,
    logo: SURVEY_LOGO,
    surveyForm: {
      title: SURVEY_HEADER_TITLE,
      description: SURVEY_HEADER_DESC,
      surveyCategoryBuilder: {
        _id: SURVEY_CATEGORY_BUILDER._id,
        icon: SURVEY_CATEGORY_BUILDER.icon,
        title: SURVEY_CATEGORY_BUILDER.title,
        active: SURVEY_CATEGORY_BUILDER.active,
        current: SURVEY_CATEGORY_BUILDER.current,
      },
      surveyQuestion: SURVEY_FORM_QUESTION,
    },
    status: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const sendDb = await new SurveyModel(data).save();
    res.json({
      success: true,
      time: new Date().toISOString(),
      data: sendDb,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      data: err,
    });
  }
};
