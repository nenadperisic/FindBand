import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import CreateAd from './components/CreateAd';
import CreateAdMusician from './components/CreateAdMusician';
import ShowForum from './components/ShowForum';
import Musicians from './components/Musicians';
import Bands from './components/Bands';
import MusicianProfile from './components/MusicianProfile';
import ConfigureMusicianProfile from './components/ConfigureMusicianProfile';
import BandProfile from './components/BandProfile';
import ConfigureBandProfile from './components/ConfigureBandProfile';
import TavernProfile from './components/TavernProfile';
import ConfigureTavernProfile from './components/ConfigureTavernProfile';
// import Logout from './components/Logout';


function App() {
  
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/ShowForum" exact component={ShowForum} /> 
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/CreateAd" exact component={CreateAd} />
          <Route path="/CreateAdMusician" exact component={CreateAdMusician} />
          <Route path="/Musicians" exact component={Musicians} />
          <Route path="/Bands" exact component={Bands} />  
          <Route path="/profile/musician" exact component={MusicianProfile} />
          <Route path="/profile/band" exact component={BandProfile} />
          <Route path="/profile/tavern" exact component={TavernProfile} />
          {/* <Route path="/profile/venue" exact component={VenueProfile} /> */}
          <Route path="/configure/musician" exact component={ConfigureMusicianProfile} />
          <Route path="/configure/band" exact component={ConfigureBandProfile} />
          <Route path="/configure/tavern" exact component={ConfigureTavernProfile} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;