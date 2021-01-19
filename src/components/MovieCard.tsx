import {
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import React, { useState } from "react";
import { star, create, trash, chevronDown, chevronUp } from "ionicons/icons";
import "./style.css";
import { Movie } from "../models";
import { useMutation } from "@apollo/client";
import { DELETE_MOVIE_MUTATION } from "../queries";
import { EditMovie } from "./index";

interface ContainerProps {
  movie: Movie;
}

export const MovieCard: React.FC<ContainerProps> = (props) => {
  const [expanded, setExpanded] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [deleteMovie, {}] = useMutation(DELETE_MOVIE_MUTATION, {
    onCompleted({}) {},
  });

  const CardContent = (
    <IonCardContent>
      <IonItem>
        <IonLabel>Relase date</IonLabel>
        {props.movie.release}
      </IonItem>
      <IonItem>
        <IonLabel>Duration</IonLabel>
        {props.movie.duration} minutes
      </IonItem>

      <IonItem>
        <IonLabel>Average User Rating</IonLabel>
        {props.movie.average_rating
          ? props.movie.average_rating + " / 5.00"
          : "-"}
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Actors</IonLabel>
        {props.movie.actors}
      </IonItem>
    </IonCardContent>
  );

  return (
    <>
      <IonModal
        isOpen={showEditModal}
        onDidDismiss={() => setShowEditModal(false)}
      >
        <EditMovie
          movie={props.movie}
          setParentShowModal={setShowEditModal}
        ></EditMovie>
      </IonModal>
      <IonCard>
        <IonCardHeader className="ion-no-padding">
          <IonGrid>
            <IonRow className="ion-justify-content-end">
              <IonCol className="card-heading ion-align-self-center">
                <IonButtons className="ion-float-left">
                  <IonButton onClick={() => setExpanded(!expanded)}>
                    <IonIcon
                      slot="icon-only"
                      icon={expanded ? chevronUp : chevronDown}
                    />
                  </IonButton>
                  {props.movie.name}
                </IonButtons>
              </IonCol>
              <IonCol>
                <IonButtons className="ion-float-right">
                  <IonButton
                    onClick={() => {
                      console.log("star");
                    }}
                  >
                    <IonIcon slot="icon-only" icon={star} />
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      console.log("Why");
                      console.log(showEditModal ? "True" : "False");
                      setShowEditModal(true);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={create} />
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      deleteMovie({
                        variables: { _id: props.movie._id },
                      });
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        {expanded ? CardContent : ""}
      </IonCard>
    </>
  );
};
