import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// imported form component to be routed to after sign up
import Login from './pages/Login';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
// import VideoPlayer from './components/VideoCall/videoPlayer';
import AboutMe from './pages/AboutMe';
import Auth from './utils/auth';
import Profile from './pages/Profile';
import { ContextProvider } from './components/SocketContext';
import { UserContextProvider } from './components/UserContext';
import Questionnaire from './pages/Questionnaire';

// import AboutMe from './pages/AboutMe';
import Directory from './components/Directory';


const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <UserContextProvider>
        <ContextProvider>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/about" element={<Directory />} />
          </Routes>
          <Footer />
        </div>
        </ContextProvider>
      </UserContextProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
