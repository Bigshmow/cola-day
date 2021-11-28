import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { URL_API } from "../core/constants";
import { setContext } from "@apollo/client/link/context";

const link = new HttpLink({ uri: `${URL_API}/ql` });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: `${URL_API}/ql`,
  link: authLink.concat(link),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});
