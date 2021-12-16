import {
  ApolloProvider,
  InMemoryCache,
  useQuery,
  gql,
  ApolloClient,
} from "@apollo/client";
import React from "react";
import { render } from "react-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const query = gql`
    query yo {
       yo
    }
  `;
  const { data } = useQuery(query);
  return <div>{JSON.stringify(data?.yo)}</div>;
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
