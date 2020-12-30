import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from "./views/home";
import Navbar from "./features/commons/Navbar";
import Footer from "./features/commons/Footer";

const App = () => {
  return (
    <HashRouter basename='/'>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Footer />
    </HashRouter>
  );
}

export default App;
