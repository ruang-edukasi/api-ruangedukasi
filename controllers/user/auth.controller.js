require("dotenv").config();

const { user } = require("../../models");
const utils = require("../../utils");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const secretKey = process.env.JWT_KEY || "no_secret";

module.exports = {
  signup: async (req, res) => {
    // Endpoint SignUp (SignUp)
    const { full_name, email, phone_number, password } = req.body;
    try {
      const userCheck = await user.findUnique({
        where: { email: email },
      });

      if (userCheck) {
        return res.status(203).json({
          error: true,
          message: "Email already registered",
        });
      }

      const encryptEmail = await utils.encryptEmail(email);
      const data = await user.create({
        data: {
          fullName: full_name,
          email: email,
          phoneNumber: phone_number,
          password: await utils.encryptPassword(password),
          emailToken: encryptEmail,
          status: "inActive",
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
        <a href="${process.env.HOST}/api/v1/auth/user/verification-email/${encryptEmail}"
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
      console.log(error);
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  },

  verificationEmail: async (req, res) => {
    try {
      const findData = await user.findFirst({
        where: {
          emailToken: req.params.key,
        },
      });
      if (!findData) {
        return res.status(500).json({
          error: true,
          message: "Email verification link not valid",
        });
      }

      await user.update({
        data: {
          emailToken: null,
          status: "Active",
        },
        where: {
          id: findData.id,
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
  },

  login: async (req, res) => {
    // Endpoint Login (LogIn)
    try {
      const { email, password } = req.body;

      const userCheck = await user.findUnique({
        where: {
          email: email,
        },
      });

      if (!userCheck || !(await bcrypt.compare(password, userCheck.password))) {
        return res.status(401).json({
          error: true,
          message: "Invalid credentials",
        });
      }

      const activeCheck = await user.findUnique({
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

      const token = jwt.sign(
        { id: userCheck.id, email: userCheck.email },
        secretKey,
        {
          expiresIn: "1h",
        }
      ); // Generate JWT token

      res.json({
        error: false,
        message: "Login successful",
        response: {
          token,
        },
      });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  resetPassword: async (req, res) => {
    // Endpoint Reset Password (POST /resetpw)
    try {
      const { email } = req.body;

      // Cek apakah pengguna dengan email tersebut ada di database
      const userCheck = await user.findUnique({
        where: { email: email },
      });

      if (!userCheck) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      return res.json({
        message: "Reset password link sent successfully",
      });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  setPassword: async (req, res) => {
    // Endpoint Set Password (POST /setpw)
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
  },

  requestOTP: async (req, res) => {
    // Endpoint Request OTP (POST /requestOTP)
    try {
      const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
      // Generate OTP
      const generatedOTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: true,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      // Simpan OTP ke database atau cache
      await user.update({
        where: { id: jwtUserId },
        data: {
          otpCode: generatedOTP,
          otpExpiration: new Date(Date.now() + 5 * 60 * 1000), // OTP valid 5 Minutes
        },
      });

      return res.json({
        error: false,
        message: "OTP generated successfully",
      });
    } catch (error) {
      console.error("Error in requestOTP:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  verifyOTP: async (req, res) => {
    // Endpoint Verifikasi (POST /verifyOTP)
    const { otp } = req.body;
    try {
      const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
      const userCheck = await user.findUnique({
        where: {
          id: jwtUserId,
        },
      });

      if (!userCheck) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      // Cek apakah OTP sesuai
      if (
        userCheck.otpCode === otp &&
        new Date() < new Date(userCheck.otpExpiration)
      ) {
        // Reset OTP fields
        await user.update({
          where: { id: jwtUserId },
          data: { otpCode: null, otpExpiration: null },
        });

        return res.json({
          message: "OTP verification successful",
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "Invalid or expired OTP",
        });
      }
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
