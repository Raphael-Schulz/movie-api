import {
  DURATION,
  MOVIE_NAME,
  RATING,
  RELEASE_DATE,
  ACTORS,
} from "./movieFields";

export const MovieFilter = [
  {
    displayName: "movie.name",
    sortName: MOVIE_NAME,
  },
  {
    displayName: "movie.release",
    sortName: RELEASE_DATE,
  },
  {
    displayName: "movie.duration",
    sortName: DURATION,
  },
  {
    displayName: "movie.rating",
    sortName: RATING,
  },
  {
    displayName: "movie.actors",
    sortName: ACTORS,
  },
];
