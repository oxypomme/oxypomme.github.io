import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase/app';
import firebaseConfig from "./firebase/config.json";

import Navbar from "./features/commons/Navbar";
import Footer from "./features/commons/Footer";

import Home from "./views/home";
import Portfolio from './views/portfolio';

import NotFound from "./views/errors/NotFound";

const AppContainer = styled.div`
  margin-top: var(--nav-size);
  text-align: center;
  min-height: calc(100vh - var(--nav-size) - var(--footer-size) - 14px);
`;

const App = () => {
  return (
    <Router basename='/'>
      <Navbar />
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <AppContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/Pulse" component={() => { window.location.href = 'https://oxypomme.github.io/Pulse/'; return null; }} />
            <Route exact path="/gdcgraph" component={() => { window.location.href = 'https://oxypomme.github.io/GDCGraph/'; return null; }} />
            <Route exact path="/Matchable" component={() => { window.location.href = 'https://matchable-80a41.web.app/'; return null; }} />
            <Route component={NotFound} />
          </Switch>
        </AppContainer>
      </FirebaseDatabaseProvider>
      <Footer />
    </Router>
  );
}

export default App;
