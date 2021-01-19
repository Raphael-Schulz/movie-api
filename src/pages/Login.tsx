import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { LoginAndRegister } from "../components";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginAndRegister />
      </IonContent>
    </IonPage>
  );
};

export default Login;
