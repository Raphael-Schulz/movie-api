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
} from "@ionic/react";
import { Movie, MovieEdit, newMovieEdit, getMovieEdit } from "../models";
import { ACTORS, DURATION, MOVIE_NAME, RELEASE_DATE } from "../constants";

interface ContainerProps {
  movie: Movie | null;
  setParentShowModal: Function;
}

export const EditMovie: React.FC<ContainerProps> = (props) => {
  const [movieEdit, setMovieEdit] = useState<MovieEdit>(
    props.movie ? getMovieEdit(props.movie) : newMovieEdit()
  );

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

  return (
    <IonContent className="ion-padding">
      <h1>{props.movie ? "Edit Movie" : "Create Movie"}</h1>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput
          className="ion-text-right"
          name={MOVIE_NAME}
          type="text"
          value={movieEdit.name}
          onIonChange={(e) => handleTextChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Relase date</IonLabel>
        <IonInput
          className="ion-text-right"
          name={RELEASE_DATE}
          type="date"
          value={movieEdit.release}
          onIonChange={(e) => handleTextChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Duration (min)</IonLabel>
        <IonInput
          className="ion-text-right"
          name={DURATION}
          type="number"
          value={movieEdit.duration}
          onIonChange={(e) => handleNumberChange(e)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Actors</IonLabel>
        <IonTextarea
          className="ion-text-right"
          name={ACTORS}
          value={movieEdit.actors}
          onIonChange={(e) => handleTextChange(e)}
        ></IonTextarea>
      </IonItem>
      <IonGrid>
        <IonRow className="ion-padding-top ion-justify-content-evenly">
          <IonCol className="ion-text-center">
            <IonButton
              color="medium"
              onClick={() => {
                props.setParentShowModal(false);
              }}
            >
              Abort{" "}
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-center">
            <IonButton color="success" onClick={() => {}}>
              {"Save"}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
