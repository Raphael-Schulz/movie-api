import React from "react";
import { IonItem, IonAvatar } from "@ionic/react";
import { DEFAULT_LANGUAGE, LANGUAGE, setLanguage } from "../constants";

interface ContainerProps {
  setLanguageChanged: Function;
}

export const LangugageSelection: React.FC<ContainerProps> = (props) => {
  const langugage = localStorage.getItem(LANGUAGE) || DEFAULT_LANGUAGE;

  return (
    <>
      <IonItem>
        <IonAvatar
          className="ion-no-margin"
          slot="start"
          onClick={() => {
            setLanguage();
            props.setLanguageChanged();
          }}
        >
          <img
            src={"assets/languages/" + langugage + ".png"}
            alt={langugage || "language"}
          />
        </IonAvatar>
      </IonItem>
    </>
  );
};
