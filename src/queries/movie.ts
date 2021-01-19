import { gql } from "@apollo/client";

export const MOVIES_QUERY = gql`
  query GetMovies($selectedSortField: String, $direction: Int) {
    movies(selectedSortField: $selectedSortField, direction: $direction) {
      _id
      name
      release
      duration
      actors
      average_rating
    }
  }
`;

export const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($_id: ID!) {
    deleteMovie(_id: $_id)
  }
`;
