import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ApolloProvider } from "@apollo/client";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { APOLLO_CLIENT, DASHBOARD_ROUTE, LOGIN_ROUTE } from "./constants";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const client = APOLLO_CLIENT;

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={LOGIN_ROUTE} component={Login} exact={true} />
          <Route path={DASHBOARD_ROUTE} component={Dashboard} exact={true} />
          <Route
            path="/"
            render={() => <Redirect to={DASHBOARD_ROUTE} />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </ApolloProvider>
);

export default App;
