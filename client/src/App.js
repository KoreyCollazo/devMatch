import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// imported form component to be routed to after sign up
import Login from './pages/Login';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import Settings from './pages/Settings';
// import VideoPlayer from './components/VideoCall/videoPlayer';
import Form from './components/Form/Form';
import AboutMe from './pages/AboutMe';

// import VideoCall from './components/VideoCall';

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
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<Form />} />
              <Route path="/aboutme" element={<AboutMe />} />
            </Routes>
          <Footer /> 
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
