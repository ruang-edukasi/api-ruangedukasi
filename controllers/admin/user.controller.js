require("dotenv").config();

const { user } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const secretKey = process.env.JWT_KEY || "no_secret";

module.exports = {
signup: async (req, res) => {
    const { full_name, email, phone_number, password } = req.body;
        try {
            const data = await user.create({
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
},

login: async (req, res) => { // Endpoint Login (LogIn)
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Generate JWT token

        const userResponse = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            additionalAttribute: user.additionalAttribute,
            customField: user.customField,
        };

        res.json({
            message: 'Login successful',
            user: userResponse,
            token,
        });

        } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    },

resetPassword: async (req, res) => {  // Endpoint Reset Password (POST /resetpw)
    try {
        const { email } = req.body;
    
        // Cek apakah pengguna dengan email tersebut ada di database
        const user = await prisma.user.findUnique({
            where: { email },
        });
    
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        return res.json({
                message: 'Reset password email sent successfully',
        });

        } catch (error) {
            console.error("Error in resetPassword:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

setPassword: async (req, res) => {   // Endpoint Set Password (POST /setpw)
        const { old_password, new_password, confirm_password } = req.body;
        try {
        const jwtUserId = res.user.id; // From checktoken middlewares
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

requestOTP: async (req, res) => {   // Endpoint Request OTP (POST /requestOTP)
    try {
        const jwtUserId = res.user.id; // Dari middlewares checktoken
          // Generate OTP
        const generatedOTP = otpGenerator.generate(6, {digits: true, upperCase: false, specialChars: false, alphabets: false, });
    
          // Simpan OTP ke database atau cache
          await prisma.user.update({
            where: { id: jwtUserId },
            data: {
              otpCode: generatedOTP,
              otpExpiration: new Date(Date.now() + 5 * 60 * 1000), // Misalnya, OTP berlaku selama 5 menit
            },
          });
    
          return res.json({
            message: 'OTP generated successfully',
          });
        } catch (error) {
          console.error("Error in requestOTP:", error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

verifyOTP: async (req, res) => {   // Endpoint Verifikasi (POST /verifyOTP)
    const { otp } = req.body;
    try {
        const jwtUserId = res.user.id; // Dari middlewares checktoken
        const user = await prisma.user.findUnique({
            where: {
            id: jwtUserId,
            },
        });

        if (!user) {
            return res.status(404).json({
            error: true,
            message: "User not found",
            });
        }

        // Cek apakah OTP sesuai
        if (user.otpCode === otp && new Date() < new Date(user.otpExpiration)) {
            // Reset OTP fields
            await prisma.user.update({
            where: { id: jwtUserId },
            data: { otpCode: null, otpExpiration: null },
            });

            return res.json({
            message: 'OTP verification successful',
            });
        } else {
            return res.status(401).json({
            error: true,
            message: 'Invalid or expired OTP',
            });
        }
        } catch (error) {
        console.error("Error in verifyOTP:", error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
