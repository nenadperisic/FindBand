import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import CreateAd from './components/CreateAd';
import CreateAdMusician from './components/CreateAdMusician';
import CreateAdTavern from './components/CreateAdTavern'
import CreateAdBand from './components/CreateAdBand'
import ShowForum from './components/ShowForum';
import Musicians from './components/Musicians';
import Bands from './components/Bands';
import Taverns from './components/Taverns';
import MusicianProfile from './components/MusicianProfile';
import ConfigureMusicianProfile from './components/ConfigureMusicianProfile';
import BandProfile from './components/BandProfile';
import ConfigureProfile from './components/ConfigureProfile';
import ConfigureBandProfile from './components/ConfigureBandProfile';
import TavernProfile from './components/TavernProfile';
import ConfigureTavernProfile from './components/ConfigureTavernProfile';
import Verify from './components/Verify';
import ShowAds from './components/ShowAds';
// import Logout from './components/Logout';


function App() {
  
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/ShowForum" exact component={ShowForum} /> 
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/showAds" exact component={ShowAds} />
          <Route path="/verify" exact component={Verify} />
          <Route path="/CreateAd" exact component={CreateAd} />
          <Route path="/CreateAdMusician" exact component={CreateAdMusician} />
          <Route path="/CreateAdTavern" exact component={CreateAdTavern} />
          <Route path="/CreateAdBand" exact component={CreateAdBand} />
          <Route path="/Musicians" exact component={Musicians} />
          <Route path="/Bands" exact component={Bands} />  
          <Route path="/Taverns" exact component={Taverns} />  
          <Route path="/profile/musician" exact component={MusicianProfile} />
          <Route path="/profile/band" exact component={BandProfile} />
          <Route path="/profile/tavern" exact component={TavernProfile} />
          <Route path="/configure" exact component={ConfigureProfile} />
          <Route path="/configure/musician" exact component={ConfigureMusicianProfile} />
          <Route path="/configure/band" exact component={ConfigureBandProfile} />
          <Route path="/configure/tavern" exact component={ConfigureTavernProfile} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;