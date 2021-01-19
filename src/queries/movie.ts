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

export const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie(
    $name: String!
    $release: Date!
    $duration: Int!
    $actors: String!
  ) {
    addMovie(
      name: $name
      release: $release
      duration: $duration
      actors: $actors
    ) {
      _id
      name
      release
      duration
      actors
      average_rating
    }
  }
`;

export const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovie(
    $_id: ID!
    $name: String!
    $release: Date!
    $duration: Int!
    $actors: String!
  ) {
    updateMovie(
      _id: $_id
      name: $name
      release: $release
      duration: $duration
      actors: $actors
    ) {
      _id
      name
      release
      duration
      actors
      average_rating
    }
  }
`;

export const ADD_NEW_MOVIE_TO_CACHE = gql`
fragment NewMovie on Movie {
  _id
  name
  release
  duration
  actors
  average_rating
}
`;
