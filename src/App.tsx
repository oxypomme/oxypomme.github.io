import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
    <HashRouter basename='/'>
      <Navbar />
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <AppContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Portfolio" component={Portfolio} />
            <Route component={NotFound} />
          </Switch>
        </AppContainer>
      </FirebaseDatabaseProvider>
      <Footer />
    </HashRouter>
  );
}

export default App;
