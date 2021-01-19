import React, { useState } from "react";
import {
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
} from "@ionic/react";
import { Movie, MovieEdit, newMovieEdit, getMovieEdit } from "../models";
import {
  ACTORS,
  DURATION,
  MOVIE_NAME,
  RELEASE_DATE,
  parseDateForInput,
} from "../constants";
import { useMutation } from "@apollo/client";
import {
  ADD_MOVIE_MUTATION,
  UPDATE_MOVIE_MUTATION,
  ADD_NEW_MOVIE_TO_CACHE,
} from "../queries";
import { getTranslation } from "../translations";

interface ContainerProps {
  movie: Movie | null;
  setParentShowModal: Function;
}

export const EditMovie: React.FC<ContainerProps> = (props) => {
  const [serverError, setServerError] = useState("");

  const [movieEdit, setMovieEdit] = useState<MovieEdit>(
    props.movie ? getMovieEdit(props.movie) : newMovieEdit()
  );

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION, {
    update(cache, { data: { addMovie } }) {
      cache.modify({
        fields: {
          movies() {
            cache.writeFragment({
              data: addMovie,
              fragment: ADD_NEW_MOVIE_TO_CACHE,
            });
            props.setParentShowModal(false);
          },
        },
      });
    },
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION, {
    onCompleted() {
      props.setParentShowModal(false);
    },
  });

  function handleNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: number = +target.value;

    let key = target.name as keyof typeof movieEdit;

    setMovieEdit({
      ...movieEdit,
      [key]: value,
    });
  }

  function handleTextChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;

    let key = target.name as keyof typeof movieEdit;

    setMovieEdit({
      ...movieEdit,
      [key]: value,
    });
  }

  function tryAddOrUpdateMovie(addOrUpdateMovie: Function, variables: Object) {
    addOrUpdateMovie({
      variables,
    }).catch((error: Error) => {
      setServerError(error.message);
    });
  }

  return (
    <IonContent className="ion-padding">
      <h1>
        {props.movie
          ? getTranslation("movie.edit")
          : getTranslation("movie.create")}
      </h1>
      <IonItem>
        <IonLabel>{getTranslation("movie.name")}</IonLabel>
        <IonInput
          className="ion-text-right"
          name={MOVIE_NAME}
          type="text"
          value={movieEdit.name}
          onIonChange={(e) => handleTextChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>{getTranslation("movie.release")}</IonLabel>
        <IonInput
          className="ion-text-right"
          name={RELEASE_DATE}
          type="date"
          value={parseDateForInput(movieEdit.release)}
          onIonChange={(e) => handleTextChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>{getTranslation("movie.duration")}</IonLabel>
        <IonInput
          className="ion-text-right"
          name={DURATION}
          type="number"
          value={movieEdit.duration}
          onIonChange={(e) => handleNumberChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>{getTranslation("movie.actors")}</IonLabel>
        <IonTextarea
          className="ion-text-right"
          name={ACTORS}
          value={movieEdit.actors}
          onIonChange={(e) => handleTextChange(e)}
        ></IonTextarea>
      </IonItem>

      <IonGrid>
        <IonRow>
          <IonText color="danger">{serverError}</IonText>
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
                props.movie
                  ? tryAddOrUpdateMovie(updateMovie, {
                      _id: movieEdit._id,
                      name: movieEdit.name,
                      release: movieEdit.release,
                      duration: movieEdit.duration,
                      actors: movieEdit.actors,
                    })
                  : tryAddOrUpdateMovie(addMovie, {
                      name: movieEdit.name,
                      release: movieEdit.release,
                      duration: movieEdit.duration,
                      actors: movieEdit.actors,
                    });
              }}
            >
              {getTranslation("save")}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
