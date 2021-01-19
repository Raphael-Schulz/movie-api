import React from "react";
import { IonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import { DASHBOARD_ROUTE } from "../constants";
import { getTranslation } from "../translations";

export const ErrorHandler: React.FC = () => {
  const history = useHistory();

  return (
    <IonLoading
      isOpen={true}
      onDidDismiss={() => {
        history.replace(DASHBOARD_ROUTE);
      }}
      duration={3000}
      message={getTranslation("error.handler.message")}
    />
  );
};
