const UserModel = require("../../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    const data = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(data);
    const sendDb = await new UserModel(data).save();
    // const userFind = await UserModel().find(data);
    // const accessToken = jwt.sign(
    //   { username: user.username, password: user.role },
    //   accessTokenSecret
    // );
    console.log(sendDb);
    res.json({
      success: true,
      message: "Success signup",
      //   data: {
      //     _token: accessToken,
      //   },
      data: sendDb,
      time: new Date().toISOString(),
    });
  } catch (err) {
    res.json({
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
        { email: userFind.email, password },
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
    res.json({
      success: false,
      message: "Failed login",
      data: err,
      time: new Date().toISOString(),
    });
  }
};
