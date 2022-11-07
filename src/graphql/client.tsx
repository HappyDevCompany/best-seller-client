import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  uri:"https://best-seller-server.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
