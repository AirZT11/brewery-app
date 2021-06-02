import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/containers/NavBar';
import About from './components/About';
import Profile from './components/Profile';
import BrewerContainer from './components/containers/BreweryContainer';

function App() {
  return (
    <div className="App">
      <Router>
        < NavBar />

        <div className='content'>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/profile">
              < Profile />
            </Route>
            <Route exact path="/">
              < BrewerContainer />
            </Route>
          </Switch>
        </div>

    </Router>

    </div>
    
  );
}

export default App;
