export interface Movie {
  _id: string;
  name: string;
  release: string;
  duration: number;
  actors: string;
  average_rating: number;
}

export interface MovieEdit {
  _id: string;
  name: string;
  release: string;
  duration: number;
  actors: string;
}

export function newMovieEdit(): MovieEdit {
  return {
    _id: "",
    name: "",
    release: "",
    duration: 0,
    actors: "",
  };
}

export function getMovieEdit(movie: Movie): MovieEdit {
  return {
    _id: movie._id,
    name: movie.name,
    release: movie.release,
    duration: movie.duration,
    actors: movie.actors,
  };
}
