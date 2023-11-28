require("dotenv").config();

const { admin } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY || "no_secret";

const register = async (req, res) => {
  const { full_name, email, phone_number, password } = req.body;
  try {
    const data = await admin.create({
      data: {
        fullName: full_name,
        email: email,
        phoneNumber: phone_number,
        password: await utils.encryptPassword(password),
      },
    });

    delete data["password"]; // hide password field in response
    return res.status(201).json({
      error: false,
      message: "Registration successful",
      response: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findAdmin = await admin.findFirst({
      where: {
        email: email,
      },
    });

    // User not exists
    if (!findAdmin) {
      return res.status(404).json({
        error: true,
        message: "Email is not registered in our system",
      });
    }

    if (bcrypt.compareSync(password, findAdmin.password)) {
      // Create token
      const token = jwt.sign(
        { id: findAdmin.id, email: findAdmin.email },
        secretKey,
        { expiresIn: "6h" }
      );

      return res.status(200).json({
        error: false,
        message: "Login successful",
        response: {
          token,
        },
      });
    }

    return res.status(403).json({
      error: true,
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

module.exports = {
  register,
  login,
};
