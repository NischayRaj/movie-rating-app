const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authenticateToken = require("../middleware/authenticateToken");

// Middleware to authenticate token
router.use(authenticateToken);

// Routes for CRUD operations
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);
router.get("/:id", movieController.getMovieDetails);
router.get("/", movieController.listMovies);

// Routes for rating and reviewing movies
router.post("/:id/reviews", movieController.rateAndReviewMovie);
router.put("/:movieId/reviews/:reviewId", movieController.updateReview);
router.delete("/:movieId/reviews/:reviewId", movieController.deleteReview);
router.get("/:id/reviews", movieController.listReviews);
router.get("/:id/averageRating", movieController.getAverageRating);

module.exports = router;
