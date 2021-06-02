import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/NavBar.css';

const NavBar = (props) => {
  return (
    <div>
      <nav className='nav-bar' >
          <ul>
            <li>
              <a><NavLink to="/">Home</NavLink></a>
            </li>
            <li>
              <a><NavLink to="/about">About</NavLink></a>
            </li>
            <li>
              <a><NavLink to="/profile">Profile</NavLink></a>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar