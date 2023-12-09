const { CourseReview } = require("../../models");

const ReviewController = {
  getCourseReviews: async (req, res) => {   // Endpoint untuk mendapatkan review dan rating suatu kursus
    try {
      const courseId = req.params.courseId; // ID kursus dari parameter URL

      const courseReviews = await CourseReview.findMany({ // Ambil review dan rating untuk kursus tertentu dari database
        where: {
          courseId: courseId,
        },
        include: {
          User: {
            select: {
              id: true,
              fullName: true,
              imageUrl: true,
            },
          },
        },
      });

      res.status(200).json({
        error: false,
        message: "Course reviews retrieved successfully",
        data: courseReviews,
      });
    } catch (error) {
      console.error("Error getting course reviews:", error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },

  addCourseReview: async (req, res) => {
    try {
      const userId = req.user.id; // ID pengguna dari data otentikasi
      const courseId = req.params.courseId; // ID kursus dari parameter URL
      const { rating, review } = req.body;

      const newReview = await CourseReview.create({ // Tambahkan review ke database
        data: {
          courseId: courseId,
          userId: userId,
          rating: rating,
          review: review,
        },
      });

      res.status(201).json({
        error: false,
        message: "Review and rating added successfully",
        data: newReview,
      });
    } catch (error) {
      console.error("Error adding course review and rating:", error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = ReviewController;
