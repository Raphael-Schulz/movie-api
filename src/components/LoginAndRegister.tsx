import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonInput,
  IonLabel,
  IonCardContent,
  IonButton,
  useIonViewWillEnter,
  useIonViewDidLeave,
  useIonViewWillLeave,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../queries";
import { getTranslation } from "../translations";

export const LoginAndRegister: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useIonViewWillLeave(() => {
    setUsername("");
    setPassword("");
  }, []);

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      if (data.login.token) {
        history.replace("/dashboard");
      }
    },
  });

  function handleStateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;

    setPassword(value);
    setUsername(value);
  }

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol className="ion-align-self-center">
          <IonCard>
            <IonCardContent>
              <IonGrid>
                <h1 className="ion-text-center">
                  {showRegister ? "Register" : "Login"}
                </h1>
                <IonCol>
                  <IonInput
                    onIonChange={(event) => {
                      handleStateChange(event);
                    }}
                    type="text"
                  >
                    <IonLabel>Username</IonLabel>
                  </IonInput>
                </IonCol>
                <IonCol>
                  <IonInput
                    onIonChange={(event) => {
                      handleStateChange(event);
                    }}
                    type="password"
                  >
                    <IonLabel>Password</IonLabel>
                  </IonInput>
                </IonCol>
                <IonRow className="ion-justify-content-end">
                  <IonButton
                    onClick={() => {
                      login({
                        variables: { username: username, password: password },
                      });
                    }}
                  >
                    {showRegister ? "Create Account" : "Login"}
                  </IonButton>
                </IonRow>
                <IonRow className="ion-padding-top ion-justify-content-center">
                  <IonCol>
                    <span>Not regeistered yet?</span>
                    <span>
                      {" "}
                      Click{" "}
                      <a
                        className="text-link"
                        onClick={() => {
                          setShowRegister(!showRegister);
                        }}
                      >
                        here
                      </a>{" "}
                      to create an account.
                    </span>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
