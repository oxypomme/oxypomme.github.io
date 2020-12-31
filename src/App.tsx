import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import Home from "./views/home";
import Navbar from "./features/commons/Navbar";
import Footer from "./features/commons/Footer";

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
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AppContainer>
      <Footer />
    </HashRouter>
  );
}

export default App;
