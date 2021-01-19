import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  useIonViewDidLeave,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { MovieTable, EditMovie, Loading } from "../components";
import { addCircleOutline } from "ionicons/icons";
import { useQuery, useApolloClient } from "@apollo/client";
import { USER_INFORMATION_QUERY } from "../queries";
import { AUTHORIZATION, LOGIN_ROUTE } from "../constants";
import { getTranslation } from "../translations";

const Dashboard: React.FC = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [showNewMovieModal, setShowNewMovieModal] = useState(false);

  const { loading, error, data } = useQuery(USER_INFORMATION_QUERY);

  useIonViewDidLeave(() => {
    client.clearStore().then(() => {
      client.resetStore();
    });
  });

  function logout() {
    localStorage.removeItem(AUTHORIZATION);
    history.replace(LOGIN_ROUTE);
  }

  if (loading) return <Loading />;

  if (error) {
    history.replace(LOGIN_ROUTE);
    return <p>Error</p>;
  }

  return (
    <IonPage>
      <IonModal
        isOpen={showNewMovieModal}
        onDidDismiss={() => setShowNewMovieModal(false)}
      >
        <EditMovie
          movie={null}
          setParentShowModal={setShowNewMovieModal}
        ></EditMovie>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonAvatar slot="start">
              <img src="assets/popcorn.svg" alt={getTranslation("current.user")} />
            </IonAvatar>
            <IonLabel>{data.currentUser.username}</IonLabel>
          </IonItem>
          <IonButtons slot="end">
            <IonButton
              slot="start"
              onClick={() => {
                setShowNewMovieModal(true);
              }}
            >
              <IonIcon slot="end" icon={addCircleOutline} />
              {getTranslation("movie.add")}
            </IonButton>
            <IonButton
              color="medium"
              onClick={() => {
                logout();
              }}
            >
              {getTranslation("logout")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MovieTable />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
