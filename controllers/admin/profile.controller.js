require("dotenv").config();

const { admin } = require("../../models");

const list = async (req, res) => {
  try {
    const jwtAdminId = res.adminuser.id; // From checktoken middlewares
    const data = await admin.findFirst({
      where: {
        id: jwtAdminId,
      },
    });
    delete data["password"];
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
    const jwtAdminId = res.adminuser.id; // From checktoken middlewares
    const data = await admin.update({
      where: {
        id: jwtAdminId,
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

module.exports = {
  list,
  profile,
};
