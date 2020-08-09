import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import CreateAd from './components/CreateAd';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />   
        <Route path="/CreateAd" exact component={CreateAd} />   
      </Switch>
    </BrowserRouter>
  );
}

export default App;