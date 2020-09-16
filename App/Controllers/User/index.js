const UserModel = require("../../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.fetchUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await UserModel.findOne({ _id }, { password: 0 });
    res.json({
      success: true,
      message: "Success fecthing user",
      data: {
        result,
      },
      time: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed fetching user",
      data: err,
      time: new Date().toISOString(),
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const save = await new UserModel(data).save();
    const accessToken = jwt.sign(
      { email: save.email, password: save.password },
      process.env.ACCESS_TOKEN
    );
    res.json({
      success: true,
      message: "Success signup",
      data: {
        _id: save._id,
        _token: accessToken,
      },
      time: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed signup",
      data: err,
      time: new Date().toISOString(),
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFind = await UserModel.findOne({ email });
    const verified = bcrypt.compareSync(password, userFind.password);
    if (verified) {
      const accessToken = jwt.sign(
        { email: userFind.email, password: userFind.password },
        process.env.ACCESS_TOKEN
      );
      res.json({
        success: true,
        message: "Success login",
        data: {
          _id: userFind._id,
          email: userFind.email,
          _token: accessToken,
        },
        time: new Date().toISOString(),
      });
    } else {
      throw "Your credential has been rejected";
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed login",
      data: err,
      time: new Date().toISOString(),
    });
  }
};
