import { React, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header() {
  let location = useLocation();

  const { isAuthorized } = useContext(CurrentUserContext);

  return (
    <header
      className={`header
      ${location.pathname === '/signup' ? 'header_display_none' : ''}
      ${location.pathname === '/signin' ? 'header_display_none' : ''}`}
    >
      <div className={`header__content ${location.pathname === '/' ? 'header__content_type_main' : ''}`}>
        <Link to='/' className="logo"/>

        {!isAuthorized && <nav className="header__navbar">
          <Link to='/signup' className='header__link'>Регистрация</Link>
          <Link to='/signin' className='header__link header__link_type_signin'>Войти</Link>
        </nav>}

        {isAuthorized && <Navigation />}
      </div>
    </header>
  );
}

export default Header;
