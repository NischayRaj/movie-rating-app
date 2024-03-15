const Movie = require("../models/Movie");

const createMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    return await movie.save();
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (id, movieData) => {
  try {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (id) => {
  try {
    await Movie.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

const getMovieDetails = async (id) => {
  try {
    return await Movie.findById(id);
  } catch (error) {
    throw error;
  }
};

const listMovies = async (filters) => {
  try {
    return await Movie.find(filters);
  } catch (error) {
    throw error;
  }
};

const rateAndReviewMovie = async (id, reviewData, user) => {
  try {
    const movie = await Movie.findById(id);
    movie.ratings.push({
      user: user._id,
      rating: reviewData.rating,
      review: reviewData.review,
    });
    await movie.save();
  } catch (error) {
    throw error;
  }
};

const updateReview = async (movieId, reviewId, reviewData, user) => {
  try {
    const movie = await Movie.findById(movieId);
    const review = movie.ratings.id(reviewId);
    if (!review) throw new Error("Review not found");
    if (!review.user.equals(user._id)) throw new Error("Unauthorized");
    review.rating = reviewData.rating;
    review.review = reviewData.review;
    await movie.save();
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (movieId, reviewId, user) => {
  try {
    const movie = await Movie.findById(movieId);
    const review = movie.ratings.id(reviewId);
    if (!review) throw new Error("Review not found");
    if (!review.user.equals(user._id)) throw new Error("Unauthorized");
    review.remove();
    await movie.save();
  } catch (error) {
    throw error;
  }
};

const listReviews = async (id) => {
  try {
    const movie = await Movie.findById(id);
    return movie.ratings;
  } catch (error) {
    throw error;
  }
};

const getAverageRating = async (id) => {
  try {
    const movie = await Movie.findById(id);
    const ratings = movie.ratings.map((r) => r.rating);
    const averageRating =
      ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    return averageRating.toFixed(1);
  } catch (error) {
    throw error;
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
