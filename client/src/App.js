import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import CreateAd from './components/CreateAd';
import ShowForum from './components/ShowForum';
import MusicianProfile from './components/MusicianProfile';

function App() {
  
  return (
    
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/ShowForum" exact component={ShowForum} /> 
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />   
          <Route path="/CreateAd" exact component={CreateAd} />
          <Route path="/musicianProfile" exact component={MusicianProfile} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;