import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from "./views/home";

const App = () => {
  return (
    <HashRouter basename='/'>
      <Route exact path="/" component={Home} />
    </HashRouter>
  );
}

export default App;
