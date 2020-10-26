import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Botones.css';
import './Letras.css';
import '../App.css';
import './Navbar.css'
import Dropdown from './Dropdown';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <i className="fab fa-react"/>UOH-TUI
          
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item-inicio'>
            <Link to='/' className='nav-links-inicio' onClick={closeMobileMenu}>
            <i className="fas fa-home"/>{" "}
              INICIO
            </Link>
          </li>
          <li className='nav-item-servicios' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link to='/servicios' className='nav-links-servircios' onClick={closeMobileMenu}> 
              <i className="fas fa-tools"/>{" "}
                SERVICIOS 
              <i className='fas fa-caret-down'/>
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li>
            <Link to='/ajustes' className='nav-links-mobile' onClick={closeMobileMenu}>
              <i className="fas fa-cogs"/>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;