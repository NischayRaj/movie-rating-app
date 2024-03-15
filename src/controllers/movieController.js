const movieService = require("../services/movieService");

const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await movieService.createMovie(movieData);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await movieService.updateMovie(id, req.body);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await movieService.deleteMovie(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieDetails(id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listMovies = async (req, res) => {
  try {
    const movies = await movieService.listMovies(req.query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rateAndReviewMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewData = req.body;
    await movieService.rateAndReviewMovie(id, reviewData, req.user);
    res.status(201).json({ message: "Rating and review posted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const reviewData = req.body;
    await movieService.updateReview(movieId, reviewId, reviewData, req.user);
    res.json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    await movieService.deleteReview(movieId, reviewId, req.user);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await movieService.listReviews(id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const { id } = req.params;
    const averageRating = await movieService.getAverageRating(id);
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  listMovies,
  rateAndReviewMovie,
  updateReview,
  deleteReview,
  listReviews,
  getAverageRating,
};
