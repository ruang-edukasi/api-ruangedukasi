const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    courseType: prisma.courseType,
    courseCategory: prisma.courseCategory,
    courseLevel: prisma.courseLevel,
    course: prisma.course,
    courseContent: prisma.courseContent,
    courseSkill: prisma.courseSkill,
    courseTarget: prisma.courseTarget,
    courseReview: prisma.courseReview,
    courseCoupon: prisma.courseCoupon,
    admin: prisma.admin,
    user: prisma.user,
    userCourse: prisma.userCourse,
    userCourseContent: prisma.userCourseContent,
    order: prisma.order,
};