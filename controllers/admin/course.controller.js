const { course, courseType, courseCategory, courseLevel, admin } = require('../../models')
const { imageKit } = require('../../utils')
module.exports = {
    addCategory: async(req, res) => {
        const { category_name } = req.body;
        try {

            const addCategory = await courseCategory.create({
                data: {
                    categoryName: category_name,
                    //imageUrl: `/images/${req.file.filename}`
                }
            });
            return res.status(201).json({
                error: false,
                message: "Category Create Succesfully",
                response: addCategory
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    },
    addLevel: async(req, res) => {
        const { level_name } = req.body;
        try {

            const addLevel = await courseLevel.create({
                data: {
                    levelName: level_name,
                }
            });
            return res.status(201).json({
                error: false,
                message: "Level Create Succesfully",
                response: addLevel
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    },
    addType: async(req, res) => {
        const { type_name } = req.body;
        try {

            const addType = await courseType.create({
                data: {
                    typeName: type_name,
                }
            });
            return res.status(201).json({
                error: false,
                message: "Type Create Succesfully",
                response: addType
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    },
    addCourse: async(req, res) => {
        const {
            instructor_name,
            course_name,
            course_description,
            price,
            rating,
            telegram_link,
            whatsapp_link,
            student_count,
            video_count,
            reading_count,
            content_count,
            course_type_id,
            course_category_id,
            course_level_id,
            admin_id
        } = req.body;

        try {
            //CHECK EXISTING ADMIN
            const existingUser = await admin.findUniqueOrThrow({
                where: { id: parseInt(admin_id) },
            });

            if (!existingUser) {
                return res.status(404).json({ error: true, message: "Admin Not Found" });
            }
            const addCourse = await course.create({
                data: {
                    instructorName: instructor_name,
                    courseName: course_name,
                    courseDescription: course_description,
                    price: BigInt(price),
                    rating: parseInt(rating),
                    telegramLink: telegram_link,
                    whatsappLink: whatsapp_link,
                    studentCount: student_count,
                    videoCount: video_count,
                    readingCount: reading_count,
                    contentCount: content_count,

                    CourseType: {
                        connect: { id: parseInt(course_type_id) }
                    },
                    CourseLevel: {
                        connect: { id: parseInt(course_level_id) }
                    },
                    CourseCategory: {
                        connect: { id: parseInt(course_category_id) }
                    },
                    Admin: {
                        connect: { id: parseInt(admin_id) }
                    }
                }

            });
            const priceInt = parseInt(price)
            return res.status(201).json({
                error: false,
                message: "Course Create Succesfully",
                response: {...addCourse,
                    price: priceInt
                }
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}