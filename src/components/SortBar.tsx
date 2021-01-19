import {
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { arrowDown, arrowUp } from "ionicons/icons";
import { Field } from "../models";
import { SORT_DESC } from "../constants";

interface ContainerProps {
  filterDefinition: Array<Field>;
  selectedSortField: string;
  setSelectedSortField: Function;
  direction: number;
}

export const SortBar: React.FC<ContainerProps> = (props) => {
  const arrow = props.direction === SORT_DESC ? arrowDown : arrowUp;

  return (
    <IonGrid>
      <IonRow>
        <IonCol className="ion-text-center">
          {props.filterDefinition.map((field, index) => (
            <IonChip
              key={index}
              onClick={() => props.setSelectedSortField(field.sortName)}
            >
              {field.sortName === props.selectedSortField ? (
                <IonIcon icon={arrow} />
              ) : (
                ""
              )}
              <IonLabel>{field.displayName}</IonLabel>
            </IonChip>
          ))}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
