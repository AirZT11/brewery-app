import './css/App.css';
import './css/NavBar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './components/About';
import Profile from './components/Profile';
import BrewerContainer from './components/containers/BreweryContainer';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Brewery App!</h1>

      <Router>
      <div>
        <nav className='nav-bar' >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            < Profile />
          </Route>
          <Route path="/">
            < BrewerContainer />
          </Route>
        </Switch>
      </div>
    </Router>

    </div>
    
  );
}

export default App;
