import React from "react";
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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { MovieTable } from "../components";
import { addCircleOutline } from "ionicons/icons";
import { useQuery, useMutation } from "@apollo/client";
import { USER_INFORMATION_QUERY, LOGOUT_MUTATION } from "../queries";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(USER_INFORMATION_QUERY);

  const [logout, {}] = useMutation(LOGOUT_MUTATION, {
    onCompleted({}) {
      history.replace("/login");
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    history.replace("/login");
    return <p>Error</p>;
  }

  console.log(data);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonAvatar slot="start">
              <img src="assets/popcorn.svg" alt="Current User" />
            </IonAvatar>
            <IonLabel slot="start">{data.currentUser.username}</IonLabel>
            <IonButton
              onClick={() => {
                logout();
              }}
            >
              {" "}
              Logout
            </IonButton>
          </IonItem>
          <IonButtons slot="end">
            <IonButton slot="start" onClick={() => {}}>
              <IonIcon slot="end" icon={addCircleOutline} /> Add Movie
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
