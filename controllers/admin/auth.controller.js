require("dotenv").config();

const { admin } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY || "no_secret";

const register = async (req, res) => {
  const { full_name, email, phone_number, password } = req.body;
  try {
    const adminCheck = await admin.findUnique({
      where: {
        email: email,
      },
    });

    if (adminCheck) {
      return res.status(203).json({
        error: true,
        message: "Email already registered",
      });
    }

    const encryptEmail = await utils.encryptEmail(email);
    const data = await admin.create({
      data: {
        fullName: full_name,
        email: email,
        phoneNumber: phone_number,
        password: await utils.encryptPassword(password),
        emailToken: encryptEmail,
        status: "inActive",
      },
      select: {
        fullName: true,
        email: true,
        phoneNumber: true,
        status: true,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "Ruang Edukasi <system@gmail.com>",
      to: email,
      subject: "Ruang Edukasi - Verification Email",
      html: `<p>
        To complete registration at <strong>Ruang Edukasi</strong> <br/><br/>
        <a href="${process.env.HOST}/api/v1/auth/admin/verification-email/${encryptEmail}"
        style="background-color: #4CAF50; color: white; padding: 10px; text-decoration:none; text-align: center;">Verification email</a>
        </p>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: err,
        });
      }

      delete data["password"]; // hide password field in response
      return res.status(201).json({
        error: false,
        message:
          "Registration successful.\nCheck your inbox or spam folder to verification your email.",
      });
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

    const activeCheck = await admin.findUnique({
      where: {
        email: email,
        status: "Active",
      },
    });

    if (!activeCheck) {
      return res.status(401).json({
        error: true,
        message: "Please activate your email first.",
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

const verificationEmail = async (req, res) => {
  try {
    const emailTokenCheck = await admin.findFirst({
      where: {
        emailToken: req.params.key,
      },
    });

    if (!emailTokenCheck) {
      return res.status(500).json({
        error: true,
        message: "Email verification link not valid",
      });
    }

    await admin.update({
      data: {
        emailToken: null,
        status: "Active",
      },
      where: {
        id: emailTokenCheck.id,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Your email successful verified.",
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
  verificationEmail,
};
