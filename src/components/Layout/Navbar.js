import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <div>
      <nav className='navbar nav bg-success'>
        <h1>
          <i className={icon} />
          {title}
        </h1>
        <ul>
          <li>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/About' className='nav-link'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github px-3'
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
