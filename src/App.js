import React, { createContext } from 'react';
import NAV from './Components/LeftNavBar';
import TOBAR from './Components/TopBar';


// Router
import { HashRouter, Switch, Route } from 'react-router-dom';
import HOME from './Routes/Home';
import MOVIES from './Routes/Movies';
import TVSHOWS from './Routes/TvShows';
import SETTINGS from './Routes/Settings';
import FAVO from './Routes/Favorites';
import TPAGE from './Routes/TitlePage';
import SEARCH from './Routes/Search';

import useInventory from './useInventory';
import { Loader } from 'react-feather';



export const DATABASE = createContext();

function App() {
  const [data, setData] = useInventory();
  return (
    <HashRouter>
      <NAV />
      <DATABASE.Provider value={[data, setData]}>
        <div id="app">
          <TOBAR />
          <Switch>
            {data.length === 0 ? <>
              <h1 style={{ textAlign: 'center' }}> <Loader /> </h1>
              <Route exact path="/settings" component={SETTINGS} />
            </> : <>
              <Route exact path="/" component={HOME} />
              <Route exact path="/movies" component={MOVIES} />
              <Route exact path="/tvshows" component={TVSHOWS} />
              <Route exact path="/settings" component={SETTINGS} />
              <Route exact path="/favorites" component={FAVO} />
              <Route exact path="/search" component={SEARCH} />
              <Route exact path="/tittle/:id" component={TPAGE} />
            </>}
          </Switch>
        </div>
      </DATABASE.Provider>
    </HashRouter>
  );
}

export default App;


// Root
// Nav | Body
//     | Body flex Close
//     |           Main Area - Over (width of nav minus rem)