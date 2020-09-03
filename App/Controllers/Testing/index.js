const TestingModel = require("../../Model/Testing");

exports.index = (req, res) => {};

exports.store = async (req, res) => {
  const msg = new TestingModel({
    email: "Testing@gmail.com",
  });

  try {
    const saveMessage = await msg.save();
    res.json({
      success: true,
      data: saveMessage,
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
    });
  }
};
