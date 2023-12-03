const {
  course,
  courseContent,
  courseType,
  courseCategory,
  courseLevel,
} = require("../../models");

const allCourse = async (req, res) => {
  try {
    const data = await course.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        instructorName: true,
        courseName: true,
        courseDescription: true,
        price: true,
        rating: true,
        CourseCategory: {
          select: {
            categoryName: true,
          },
        },
        CourseType: {
          select: {
            typeName: true,
          },
        },
        CourseLevel: {
          select: {
            levelName: true,
          },
        },
      },
    });

    // Convert BigInt to string before sending the response
    const responseData = data.map((course) => ({
      ...course,
      price: course.price ? parseFloat(course.price) : null,
      courseType: course.CourseType.typeName,
      courseCategory: course.CourseCategory.categoryName,
      courseLevel: course.CourseLevel.levelName,
    }));

    responseData.forEach((course) => {
      delete course.CourseType;
      delete course.CourseCategory;
      delete course.CourseLevel;
    });

    return res.status(200).json({
      error: false,
      message: "Load course successful",
      response: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const detailCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // params courseId from course.route
    const data = await course.findFirst({
      where: {
        id: parseInt(courseId),
      },
      orderBy: {
        id: "asc",
      },
      include: {
        courseContent: {
          select: {
            id: true,
            contentTitle: true,
            videoLink: true,
            status: true,
          },
        },
        courseSkill: {
          select: {
            id: true,
            skillName: true,
          },
        },
        courseTarget: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    // Check courseTypeId
    const valueTypeId = data.courseTypeId;
    const checkTypeName = await courseType.findFirst({
      where: {
        id: valueTypeId,
      },
    });

    // Check courseCategoryId
    const valueCategoryId = data.courseCategoryId;
    const checkCategoryName = await courseCategory.findFirst({
      where: {
        id: valueCategoryId,
      },
    });

    // Check courseLevelId
    const valueLevelId = data.courseLevelId;
    const checkLevelName = await courseLevel.findFirst({
      where: {
        id: valueLevelId,
      },
    });

    delete data["courseTypeId"];
    delete data["courseCategoryId"];
    delete data["courseLevelId"];
    delete data["adminId"];

    if (!data) {
      // Handle where no course is found with the given courseId
      return res.status(404).json({
        error: true,
        message: `Course with id #${courseId} not found`,
        response: null,
      });
    }

    // Check length in courseContent
    const courseContentLength = data.courseContent.length;

    // Convert BigInt to float before sending the response
    const responseData = {
      ...data,
      price: data.price ? parseFloat(data.price) : null,
      contentCount: parseInt(courseContentLength),
      courseType: checkTypeName.typeName,
      courseCategory: checkCategoryName.categoryName,
      courseLevel: checkLevelName.levelName,
    };

    return res.status(200).json({
      error: false,
      message: `Load course with id #${courseId} successful`,
      response: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

module.exports = {
  allCourse,
  detailCourse,
};
