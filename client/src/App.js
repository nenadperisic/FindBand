import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import CreateAd from './components/CreateAd';
import ShowForum from './components/ShowForum';
import MusicianProfile from './components/ConfigureMusicianProfile';
import Musicians from './components/Musicians';
import ViewProfileMusician from './components/ViewProfileMusician';
import BandProfile from './components/BandProfile';


function App() {
  
  return (
    
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/ShowForum" exact component={ShowForum} /> 
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />   
          <Route path="/CreateAd" exact component={CreateAd} />
          <Route path="/Musicians" exact component={Musicians} />  
          <Route path="/profile/musician" exact component={ViewProfileMusician} />  
          <Route path="/profile/band" exact component={BandProfile} />
          {/* <Route path="/profile/tavern" exact component={TavernProfile} /> */}
          <Route path="/configure/musician" exact component={MusicianProfile} />
          <Route path="/configure/band" exact component={MusicianProfile} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;