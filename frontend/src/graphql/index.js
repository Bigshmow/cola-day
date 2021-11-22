import { ApolloClient, InMemoryCache } from '@apollo/client';
import { URL_API } from '../core/constants';

export const client = new ApolloClient({
    uri: `${URL_API}/ql`,
    cache: new InMemoryCache()
});