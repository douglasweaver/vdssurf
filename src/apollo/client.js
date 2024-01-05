import { createAuthLink } from 'aws-appsync-auth-link';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink
} from '@apollo/client';

import config from '../amplifyconfiguration.json';
import { fetchAuthSession } from 'aws-amplify/auth';

async function getCognitoCredentials() {
  try {
    // customCredentialsProvider.loadFederatedLogin({
    //   domain,
    //   token: idToken
    // });
    const fetchSessionResult = await fetchAuthSession({ forceRefresh: true }); // will return the credentials
    console.log('fetchSessionResult: ', fetchSessionResult);
  } catch (err) {
    console.log(err);
  }
}


export default function client(typePolicies) {

  // jwtToken is used for AWS Cognito.
  const client = new ApolloClient({
    link: ApolloLink.from([
      createAuthLink({
        url: config.aws_appsync_graphqlEndpoint,
        region: config.aws_appsync_region,
        auth: {
          type: config.aws_appsync_authenticationType,
          apiKey: config.aws_appsync_apiKey,
          jwtToken: async () => (await fetchAuthSession()).tokens?.accessToken?.toString(),
        },
      }),
      createHttpLink({ uri: config.aws_appsync_graphqlEndpoint }),
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

//                 jwtToken: async () => (await fetchAuthSession()).tokens?.accessToken?.toString(),

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

