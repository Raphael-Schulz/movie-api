import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTHORIZATION, SERVER_URL, WEB_SOCKET_URL } from "./index";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

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

function getConnectionParamsForWs() {
  return {
    authorization: localStorage.getItem(AUTHORIZATION)
      ? `Bearer ${localStorage.getItem(AUTHORIZATION)}`
      : "",
  };
}

const wsLink = new WebSocketLink({
  uri: WEB_SOCKET_URL,
  options: {
    reconnect: true,
    connectionParams: getConnectionParamsForWs,
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

export const APOLLO_CLIENT = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
