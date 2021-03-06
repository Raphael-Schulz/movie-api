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
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../queries";
import { DASHBOARD_ROUTE, AUTHORIZATION } from "../constants";
import { Loading } from "./Loading";
import { getTranslation } from "../translations";
import { LangugageSelection } from "./LanguageSelection";

export const LoginAndRegister: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [languageChanged, setLanguageChanged] = useState(false);

  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      if (data.login.token) {
        localStorage.setItem(AUTHORIZATION, data.login.token);
        history.replace(DASHBOARD_ROUTE);
      }
    },
  });

  const [register, { loading: registerLoading }] = useMutation(
    REGISTER_MUTATION,
    {
      onCompleted(data) {
        if (data.register.username) {
          setShowRegister(false);
        }
      },
    }
  );

  function handleTextChange(event: Event, setState: Function): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;

    setState(value);
  }

  function tryLoginOrRegister(loginOrRegister: Function): void {
    setServerError("");
    const usernameInput = username;
    const passwordInput = password;
    setUsername("");
    setPassword("");

    loginOrRegister({
      variables: {
        username: usernameInput,
        password: passwordInput,
      },
    }).catch((error: Error) => {
      setServerError(error.message);
    });
  }

  function changeLangugage() {
    setLanguageChanged(!languageChanged);
  }

  if (loginLoading || registerLoading) return <Loading />;

  return (
    <IonCard className="ion-margin">
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-justify-content-end">
            <LangugageSelection setLanguageChanged={changeLangugage} />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <h1>
              {showRegister
                ? getTranslation("register")
                : getTranslation("login")}
            </h1>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput
                onIonChange={(event) => {
                  handleTextChange(event, setUsername);
                }}
                value={username}
                type="text"
              >
                <IonLabel>{getTranslation("username")}</IonLabel>
              </IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonInput
                onIonChange={(event) => {
                  handleTextChange(event, setPassword);
                }}
                value={password}
                type="password"
              >
                <IonLabel>{getTranslation("password")}</IonLabel>
              </IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonText color="danger">{serverError}</IonText>
          </IonRow>

          <IonRow className="ion-justify-content-end">
            <IonButton
              onClick={() => {
                showRegister
                  ? tryLoginOrRegister(register)
                  : tryLoginOrRegister(login);
              }}
            >
              {showRegister
                ? getTranslation("register")
                : getTranslation("login")}
            </IonButton>
          </IonRow>
          <IonRow className="ion-padding-top ion-justify-content-center">
            <IonCol>
              <span>
                {getTranslation(
                  showRegister
                    ? "footnote.register.start"
                    : "footnote.login.start"
                )}
              </span>
              <a
                className="text-link"
                onClick={() => {
                  setServerError("");
                  setShowRegister(!showRegister);
                }}
              >
                {getTranslation(
                  showRegister
                    ? "footnote.register.link"
                    : "footnote.login.link"
                )}
              </a>
              <span>
                {getTranslation(
                  showRegister ? "footnote.register.end" : "footnote.login.end"
                )}
              </span>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
