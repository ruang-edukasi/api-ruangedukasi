const { courseType } = require("../../models");

const allType = async(req, res) => {
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
}
const premiumType = async(req, res) => {
    try {
        const data = await courseType.findMany({
            where: {
                typeName: "Premium",
            },
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
            message: "Load premium course types successful",
            response: data,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
};
const gratisType = async(req, res) => {
    try {
        const data = await courseType.findMany({
            where: {
                typeName: "Gratis",
            },
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
            message: "Load Gratis course types successful",
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
    premiumType,
    gratisType
};