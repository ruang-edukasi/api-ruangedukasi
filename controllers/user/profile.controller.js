require("dotenv").config();

const { user } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");

const list = async (req, res) => {
  try {
    const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
    const data = await user.findFirst({
      where: {
        id: jwtUserId,
      },
    });

    delete data["password"]; // hide password field in response
    return res.status(201).json({
      error: false,
      message: "Load profile successful",
      response: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const profile = async (req, res) => {
  const { city, country } = req.body;
  try {
    const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
    const data = await user.update({
      where: {
        id: jwtUserId,
      },
      data: {
        city: city,
        country: country,
      },
    });

    delete data["password"]; // hide password field in response
    return res.status(201).json({
      error: false,
      message: "Update profile successful",
      response: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const changePassword = async (req, res) => {
  const { old_password, new_password, confirm_password } = req.body;
  try {
    const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
    const findUser = await user.findUnique({
      where: {
        id: jwtUserId,
      },
    });

    if (bcrypt.compareSync(old_password, findUser.password)) {
      if (new_password === confirm_password) {
        const data = await user.update({
          where: {
            id: jwtUserId,
          },
          data: {
            password: await utils.encryptPassword(new_password),
          },
        });

        delete data["password"]; // hide password field in response
        return res.status(200).json({
          error: false,
          message: "Change password successful",
          response: data,
        });
      } else {
        return res.status(403).json({
          error: true,
          message: "The password confirmation does not match",
        });
      }
    }

    return res.status(403).json({
      error: true,
      message: "Your old password is wrong",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

module.exports = {
  list,
  profile,
  changePassword,
};
