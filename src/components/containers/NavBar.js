import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/NavBar.css';

const NavBar = (props) => {
  return (
    <div>
      <nav className='nav-bar' >
          <ul>
            <li>
              <NavLink exact className='nav-link' to="/">Home</NavLink>
            </li>
            <li>
              <NavLink exact className='nav-link' to="/about">About</NavLink>
            </li>
            <li>
              <NavLink exact className='nav-link' to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink exact className='nav-link' to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default NavBar