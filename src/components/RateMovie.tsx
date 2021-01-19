import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { Movie } from "../models";
import { useMutation, useQuery } from "@apollo/client";
import { MAX_MOVIE_RATING } from "../constants";

import { star } from "ionicons/icons";
import {
  MOVIE_RATING_QUERY,
  SAVE_MOVIE_RATING_MUTATION,
  ADD_NEW_MOVIE_RATING_TO_CACHE,
} from "../queries";
import { Loading } from "./Loading";
import { getTranslation } from "../translations";

interface ContainerProps {
  movie: Movie;
  setParentShowModal: Function;
}

export const RateMovie: React.FC<ContainerProps> = (props) => {
  const { loading, error, data } = useQuery(MOVIE_RATING_QUERY, {
    variables: { movieId: props.movie._id },
  });
  const [rating, setRating] = useState(3);

  const [saveMovieRating] = useMutation(SAVE_MOVIE_RATING_MUTATION, {
    update(cache, { data: { saveMovieRating } }) {
      if (!data.movieRating) {
        cache.modify({
          fields: {
            movieRating() {
              cache.writeFragment({
                data: saveMovieRating.movieRating,
                fragment: ADD_NEW_MOVIE_RATING_TO_CACHE,
              });
            },
          },
        });
      }
      props.setParentShowModal(false);
    },
  });

  useEffect(() => {
    if (!error && !loading) {
      if (data.movieRating) setRating(data.movieRating.rating);
    }
  }, [loading, data, error]);

  const stars = [];
  for (let i = 1; i < MAX_MOVIE_RATING + 1; i++) {
    stars.push(
      <IonButton
        key={i}
        onClick={() => {
          setRating(i);
        }}
      >
        <IonIcon
          color={rating >= i ? "warning" : ""}
          slot="icon-only"
          icon={star}
        />
      </IonButton>
    );
  }

  if (loading) return <Loading />;

  return (
    <IonContent className="ion-padding">
      <h2 className="ion-text-center">{props.movie.name}</h2>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonButtons class="ion-align-self-center">
            <IonCol>{stars}</IonCol>
          </IonButtons>
        </IonRow>
        <IonRow className="ion-padding-top ion-justify-content-evenly">
          <IonCol className="ion-text-center">
            <IonButton
              color="medium"
              onClick={() => {
                props.setParentShowModal(false);
              }}
            >
              {getTranslation("quit")}
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-center">
            <IonButton
              color="success"
              onClick={() => {
                saveMovieRating({
                  variables: {
                    _id: data && data.movieRating && data.movieRating._id,
                    movieId: props.movie._id,
                    rating: rating,
                  },
                });
              }}
            >
              {getTranslation("rate")}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
