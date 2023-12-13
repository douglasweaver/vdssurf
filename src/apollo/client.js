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


export default function client({
    typePolicies
}) {
    let newClient = 
        // jwtToken is used for AWS Cognito.
        new ApolloClient({
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
        return newClient
}


// following are suggestions for migrating between unauthenticated and authenticated

// import { createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloLink
// } from '@apollo/client';
// import config from './amplifyconfiguration.json';

// const url = config.aws_appsync_graphqlEndpoint;
// const region = config.aws_appsync_region;
// const auth = {
//   type: config.aws_appsync_authenticationType,
//   apiKey: config.aws_appsync_apiKey
// };

// const httpLink = new HttpLink({ uri: url });

// const link = ApolloLink.from([
//   createAuthLink({ url, region, auth }),
//   createSubscriptionHandshakeLink({ url, region, auth }, httpLink)
// ]);

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });


// and another examople

// import {
//     ApolloClient,
//     InMemoryCache,
//     HttpLink,
//     ApolloLink,
// } from "@apollo/client";
// import { setContext } from 'apollo-link-context';
// import { Auth } from 'aws-amplify';
// import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

// import appSyncConfig from "./aws-exports";

// const url = appSyncConfig.aws_appsync_graphqlEndpoint;

// const region = appSyncConfig.aws_appsync_region;

// const auth: AuthOptions = {
//     type: AUTH_TYPE.API_KEY,
//     apiKey: appSyncConfig.aws_appsync_apiKey,
// };

// const httpLink = new HttpLink({ uri: url });

// // Hack for removing x-api-key (api key authentication) and adding jwt token (cognito oAuth user)
// // as the Authorization header won't be recognised by the aws api if the x-api-key is present
// const authLink = setContext(() => new Promise((resolve) => {
//     Auth.currentSession()
//         .then(session => {
//             const token = session.getIdToken().getJwtToken();

//             // Resolve with jwt token in header
//             resolve({
//                 headers: { Authorization: token, 'x-api-key': '' }
//             });
//         }).catch(() => {
//             // Resolve with default api key
//             resolve({})
//         })
// }));

// const link = ApolloLink.from([
//     (authLink as unknown) as ApolloLink,
//     createAuthLink({ url, region, auth }),
//     createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
// ]);
