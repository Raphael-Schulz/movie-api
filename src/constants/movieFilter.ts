import { getTranslation } from "../translations";
import {
  DURATION,
  MOVIE_NAME,
  RATING,
  RELEASE_DATE,
  ACTORS,
} from "./movieFields";

export const MovieFilter = [
  {
    displayName: getTranslation("movie.name"),
    sortName: MOVIE_NAME,
  },
  {
    displayName: getTranslation("movie.release"),
    sortName: RELEASE_DATE,
  },
  {
    displayName: getTranslation("movie.duration"),
    sortName: DURATION,
  },
  {
    displayName: getTranslation("movie.averageRating"),
    sortName: RATING,
  },
  {
    displayName: getTranslation("movie.actors"),
    sortName: ACTORS,
  },
];
