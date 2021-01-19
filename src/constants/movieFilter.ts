import {
  DURATION,
  MOVIE_NAME,
  RATING,
  RELEASE_DATE,
  ACTORS,
} from "./movieFields";

export const MovieFilter = [
  {
    displayName: "Name",
    sortName: MOVIE_NAME,
  },
  {
    displayName: "Release date",
    sortName: RELEASE_DATE,
  },
  {
    displayName: "Duration",
    sortName: DURATION,
  },
  {
    displayName: "Rating",
    sortName: RATING,
  },
  {
    displayName: "Actors",
    sortName: ACTORS,
  },
];
