import React from "react";
import { IonLoading } from "@ionic/react";
import { getTranslation } from "../translations";

export const Loading: React.FC = () => {
  return (
    <IonLoading
      isOpen={true}
      onDidDismiss={() => {}}
      message={getTranslation("loading.handler.message")}
    />
  );
};
