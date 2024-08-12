/* src/App.js */
import { useState, useEffect, Fragment } from 'react';

import {
  Authenticator,
  useAuthenticator
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { I18n } from 'aws-amplify/utils';

import {
  Text,
} from "@aws-amplify/ui-react";

import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import VDSErrorBoundary from './components/vdserrorboundary';
import { BookingsContextProvider } from "./routes/bookings/vdsBookingsContext";
import { VDSBookings, vdsBookingsTypePolicies } from './routes/bookings/vdsbookings.js';
import { VDSNotes, vdsNotesTypePolicies } from './routes/notes/vdsnotes.js';

import VDSGallery from './routes/vdsgallery'
import VDSAppBar from './vdsappbar';

import { ApolloProvider, } from '@apollo/client';
import client from './apollo/client.js'

import { fetchUserAttributes, } from 'aws-amplify/auth'


const appTitle = 'VDS ✌🏄';

const apolloTypePolicies =
{
  Query: {
    fields: {
      ...vdsBookingsTypePolicies,
      ...vdsNotesTypePolicies,
    }
  }
}
const apolloClient = client(apolloTypePolicies);

const pages = [
  { label: 'Gallery', link: '/gallery', },
  { label: 'Bookings', link: '/bookings', },
  { label: 'Notes', link: '/notes', },
]

const SignInText = 'Drop-In';
const SignOutText = 'Bail';
I18n.putVocabulariesForLanguage('en', {
  'Sign In': SignInText, // Tab header
  'Sign in': SignInText, // Button label
  'Sign in to your account': 'Welcome Back!',
  Username: 'Enter your username', // Username label
  Password: 'Enter your password', // Password label
  'Forgot your password?': 'Rewax Password',
});


function accountInitials(attributes) {
  return (attributes === undefined ? "UNK" :
    (attributes["custom:initials"] ?? "???"))
}

// function Login() {

//   const { user, signOut } = useAuthenticator((context) => [context.user]);
//   return (
//     (user === undefined ?
//       <Authenticator loginMechanisms={['email']} variation="modal" hideSignUp={true} />
//       : <Avatar sx={{ bgcolor: deepOrange[500] }}>{accountInitials(user)}</Avatar>
//     )
//   )
// };

// function App({ signOut, user }) {
function App() {

  const [userAttributes, setUserAttributes] = useState()
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAtt = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes)
      } catch {
        setUserAttributes(undefined)
      }
    }
    fetchAtt()
  }, [user]);


  const handleNavigate = (selection) => {
    navigate(selection.link)
  }

  const handleSettingsClick = (selection) => {

    if (selection === SignOutText) {
      signOut();
      setUserAttributes(undefined)
      navigate('/gallery')
    } else if (selection === SignInText) {
      navigate('/login')
    };
  };

  return (
    <ApolloProvider client={apolloClient} >
      <VDSErrorBoundary>

        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          width="100%"
          sx={{
            // border: "4px solid purple",
          }}
        >

          <VDSAppBar
            title={appTitle}
            pages={pages}
            setPage={handleNavigate}
            rightMenu={(user !== undefined ? [SignOutText] : [SignInText])}
            rightMenuIcon={
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                <Text fontSize={16}>
                  {accountInitials(userAttributes)}
                </Text>
              </Avatar>
            }
            selectRightMenu={handleSettingsClick}
          />

          <Box
            display="flex"
            flex={1}
            overflow='auto'
            width='100%'
            sx={{
              // border: "3px solid green",
            }}
          >

            <Routes>
              <Route path="/" element={<VDSGallery />} />
              <Route path="/gallery" element={<VDSGallery />} />
              <Route
                path="/login"
                element={
                  <Fragment>
                    <Authenticator variation="modal" hideSignUp={true} />
                    <VDSGallery />
                  </Fragment>
                }
              />
              <Route
                path="/bookings"
                element={
                  <Fragment>
                    <Authenticator variation="modal" hideSignUp={true} />
                    {user !== undefined &&
                      (<BookingsContextProvider>
                        <VDSBookings />
                      </BookingsContextProvider>
                      )}
                  </Fragment>
                }
              />
              <Route
                path="/notes"
                element={
                  <Fragment>
                    <Authenticator variation="modal" hideSignUp={true} />
                    {user !== undefined && (<VDSNotes />)}
                  </Fragment>
                }
              />

            </Routes>
          </Box>
        </Box>
      </VDSErrorBoundary>
    </ApolloProvider>
  );
}

function AppWithProvider() {

  return (

    // <Authenticator loginMechanisms={['email']}
    //   variation="modal"
    //   hideSignUp={true} >

    <Authenticator.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authenticator.Provider>

    // </ Authenticator >
  )

}

export default AppWithProvider;

// function AppWithProvider({ signOut, user }) {

//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )

// }

// export default withAuthenticator(AppWithProvider);
