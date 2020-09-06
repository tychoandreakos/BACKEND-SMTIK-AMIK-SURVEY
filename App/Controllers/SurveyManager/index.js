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
};

exports.store = async (req, res) => {
  const data = {
    title: "kinerja dosen",
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
