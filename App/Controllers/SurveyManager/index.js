const SurveyModel = require("../../Model/Survey");

exports.index = async (req, res) => {
  try {
    const data = await SurveyModel.find();
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};

exports.store = async (req, res) => {
  const data = {
    title: "one direction",
    logo: "sdakdka.jpg",
    category: "love",
    surveyForm: {
      title: "damn you stark",
      description: "despacito",
      surveyCategoryBuilder: {
        icon: {
          body: "asdsaa",
          width: 25,
          height: 25,
        },
        title: "love",
        active: true,
        current: true,
      },
      surveyQuestion: [
        {
          title: "sarap lo",
          typeQuestion: "single",
        },
        {
          title: "damn you stark",
          typeQuestion: "multiple",
          item: [
            {
              title: "damn you stark",
              selected: false,
              date: new Date(),
            },
            {
              title: "damn you stark",
              selected: false,
              date: new Date(),
            },
            {
              title: "damn you stark",
              selected: false,
              date: new Date(),
            },
          ],
        },
      ],
    },
    date: new Date(),
  };

  try {
    const sendDb = await new SurveyModel(data).save();
    res.json({
      success: true,
      data: sendDb,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};
