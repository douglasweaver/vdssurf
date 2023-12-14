// Apollo Settings
import {
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';
import { ApolloLink } from '@apollo/client';

// AppSync
import { Auth } from 'aws-amplify';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from '@apollo/client';
import awsconfig from '../aws-exports';

export default function client(typePolicies) {

// jwtToken is used for AWS Cognito.
const client = new ApolloClient({
    link: ApolloLink.from([
        createAuthLink({
            url: awsconfig.aws_appsync_graphqlEndpoint,
            region: awsconfig.aws_appsync_region,
            auth: {
                type: awsconfig.aws_appsync_authenticationType,
                apiKey: awsconfig.aws_appsync_apiKey,
                jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
            },
        }),
        createHttpLink({ uri: awsconfig.aws_appsync_graphqlEndpoint }),
    ]),
    cache: new InMemoryCache({
        typePolicies: typePolicies
    })
})

return client
}
// const client = new ApolloClient({
//     link: ApolloLink.from([
//         createAuthLink({
//             url: awsconfig.aws_appsync_graphqlEndpoint,
//             region: awsconfig.aws_appsync_region,
//             auth: {
//                 type: awsconfig.aws_appsync_authenticationType,
//                 apiKey: awsconfig.aws_appsync_apiKey,
//                 jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
//             },
//         }),
//         createHttpLink({ uri: awsconfig.aws_appsync_graphqlEndpoint }),
//     ]),
//     cache: new InMemoryCache({
//         typePolicies: {
//             Query: {
//                 fields: {
//                     VDSBookingsByDate: {
//                         keyArgs: false,
//                         merge(existing, incoming, { readField }) {
//                             if (existing === undefined) return incoming
//                             const items = (existing ? existing.items : []).concat(incoming.items)
//                             return {
//                                 ...existing,
//                                 items: items,
//                                 nextToken: incoming.nextToken,
//                             };
//                         },
//                         // read(existing) {
//                         //     if (existing) {
//                         //         return {
//                         //             nextToken: existing.nextToken,
//                         //             items: existing.items,
//                         //             // items: Object.values(existing.items),
//                         //         };
//                         //     }
//                         // },
//                     },
//                 },
//             }
//         },
//     })
// })

// export default client;

