/* src/App.js */
import React from 'react';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { I18n } from 'aws-amplify';


import {
  Link,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";

import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import VDSErrorBoundary from './components/vdserrorboundary';
import {VDSBookings, vdsBookingsTypePolicies} from './routes/vdsbookings.js';
import VDSGallery from './routes/vdsgallery'
import VDSAppBar from './vdsappbar';
import { AddBoxOutlined } from '@mui/icons-material';
import { CssBaseline } from '@mui/material';

import {
  ApolloProvider,
} from '@apollo/client';
import client from './apollo/client.js'


const appTitle = 'VDS ✌🏄';

const apolloClient = client(vdsBookingsTypePolicies);

const pages = [
  { label: 'Gallery', link: '/gallery', },
  { label: 'Bookings', link: '/bookings', },
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

function SettingsMenuIcon(user) {

  return ((user === undefined ?
    <AccountCircleIcon />
    : <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.attributes.email.substring(0, 2).toUpperCase()}</Avatar>
  ));

};

function Login() {

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    (user === undefined ?
      <Authenticator variation="modal" hideSignUp={true} />
      : <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.attributes.email.substring(0, 2).toUpperCase()}</Avatar>
    )
  )
};


function App() {

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate()

  const handleNavigate = (selection) => {
    navigate(selection.link)
  }

  const handleSettingsClick = (selection) => {

    if (selection === SignOutText) {
      signOut();
      navigate('/gallery')
    } else if (selection === SignInText) {
      navigate('/login')
    };
  };

    //   React.useEffect(() => {
    //     console.log("user change",user)
    //     // changeBookingsStartDate()
    // }, [user]);

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
            rightMenuIcon={SettingsMenuIcon(user)}
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
                  <React.Fragment>
                    <Authenticator variation="modal" hideSignUp={true} />
                    <VDSGallery />
                  </React.Fragment>
                }
              />
              <Route
                path="/bookings"
                element={
                  <React.Fragment>
                    <Authenticator variation="modal" hideSignUp={true} />
                    {user !== undefined && ( <VDSBookings />)}
                  </React.Fragment>
                }
              />
            </Routes>
          </Box>
        </Box>
      </VDSErrorBoundary>
    </ApolloProvider>
  );
}


export default function AppWithProvider() {
  return (
    <React.StrictMode>
      <CssBaseline />
      <BrowserRouter>
        <Authenticator.Provider>
          <App></App>
        </Authenticator.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}


