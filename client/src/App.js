import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Banner from './components/Banner';
import Cards from './components/Cards';
import Footer from './components/Footer';
import VideoCall from './components/VideoCall';

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
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Banner />
          <Cards />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          {/* {Auth.loggedIn() ? (<VideoCall />):(null)} */}
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
