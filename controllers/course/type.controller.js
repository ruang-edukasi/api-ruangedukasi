const { courseType } = require("../../models");

const allType = async (req, res) => {
  try {
    const data = await courseType.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        typeName: true,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Load course type successful",
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
  allType,
};
