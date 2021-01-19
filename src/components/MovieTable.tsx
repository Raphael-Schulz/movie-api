import React, { useState } from "react";
import { IonModal } from "@ionic/react";
import {
  DEFAULT_SORT,
  MovieFilter,
  SORT_ASC,
  SORT_DESC,
  SELECTED_SORT_FIELD,
  SORT_DIRECTION,
} from "../constants";
import { SortBar, MovieCard } from "./index";
import { MOVIES_QUERY } from "../queries";

import { useQuery } from "@apollo/client";
import { Movie } from "../models";

export const MovieTable: React.FC = () => {
  const [selectedSortField, setSelectedSortField] = useState(() => {
    let savedSelectedSortField = localStorage.getItem(SELECTED_SORT_FIELD);
    if (savedSelectedSortField) return savedSelectedSortField;
    else return "";
  });

  const [direction, setDirection] = useState(() => {
    let savedDirection = localStorage.getItem(SORT_DIRECTION);
    if (savedDirection) return +savedDirection;
    else return DEFAULT_SORT;
  });

  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    variables: { selectedSortField: selectedSortField, direction: direction },
  });

  function onSortItemClick(sortName: string) {
    if (selectedSortField === sortName) toggleDirection();
    else {
      localStorage.setItem(SELECTED_SORT_FIELD, sortName);
      setSelectedSortField(sortName);

      localStorage.setItem(SORT_DIRECTION, DEFAULT_SORT.toString());
      setDirection(DEFAULT_SORT);
    }
  }

  function toggleDirection() {
    let newDirection = direction === SORT_DESC ? SORT_ASC : SORT_DESC;

    localStorage.setItem(SORT_DIRECTION, newDirection.toString());
    setDirection(newDirection);
  }

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>Error</p>;
  }

  console.log(data.movies);

  return (
    <>
      <SortBar
        filterDefinition={MovieFilter}
        selectedSortField={selectedSortField}
        setSelectedSortField={onSortItemClick}
        direction={direction}
      />
      {data.movies.map((movie: Movie, index: number) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </>
  );
};
