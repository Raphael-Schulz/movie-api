import { gql } from "@apollo/client";

export const MOVIE_RATING_QUERY = gql`
  query movieRating($movieId: String!) {
    movieRating(movieId: $movieId) {
      _id
      rating
    }
  }
`;

export const SAVE_MOVIE_RATING_MUTATION = gql`
  mutation saveMovieRating($_id: ID, $movieId: String!, $rating: Int!) {
    saveMovieRating(_id: $_id, movieId: $movieId, rating: $rating) {
      movieRating {
        _id
        rating
      }
      movie {
        _id
        average_rating
      }
    }
  }
`;

export const ADD_NEW_MOVIE_RATING_TO_CACHE = gql`
  fragment NewMovieRating on MovieRating {
    _id
    movieId
    rating
  }
`;
