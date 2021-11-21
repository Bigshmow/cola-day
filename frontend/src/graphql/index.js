import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: `/api/ql`,
    cache: new InMemoryCache()
});