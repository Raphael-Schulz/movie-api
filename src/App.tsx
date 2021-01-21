import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {
  AUTHORIZATION,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  SERVER_URL,
  WEB_SOCKET_URL,
} from "./constants";

import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

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

const httpLink = createHttpLink({
  uri: SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTHORIZATION);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: WEB_SOCKET_URL,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem(AUTHORIZATION)
        ? `Bearer ${localStorage.getItem(AUTHORIZATION)}`
        : "",
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

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
