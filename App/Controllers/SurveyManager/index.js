const SurveyModel = require("../../Model/Survey");

exports.index = async (req, res) => {
  try {
    const data = await SurveyModel.find({}, { surveyForm: 0 })
      .limit(5)
      .sort({ date: -1 });
    res.json({
      success: true,
      message: "Success fetching database!",
      time: new Date().toISOString(),
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      time: new Date().toISOString(),
      message: "Whoops, failed fetching database!",
      data: err,
    });
  }
  d;
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
