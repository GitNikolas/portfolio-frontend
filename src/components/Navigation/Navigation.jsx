import { React, useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerButton from '../UI/BurgerButton/BurgerButton';
import './navigation.css';

function Navigation() {
  const [width, setWidth] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  function toggleOpenMenu() {
    if(width <= 768) {
      setOpenMenu(!openMenu);
    }
    if(!openMenu){
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
      let screenWidth = event.target.innerWidth;
      if(screenWidth > 768) {
        setOpenMenu(false);
        document.body.classList.remove('no-scroll');
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [width])

  return (
    <>
      <BurgerButton
      openMenu={openMenu}
      onClick={toggleOpenMenu}
      />

      <nav className={`navigation ${openMenu ? 'navigation_oppened' : ''}`} onClick={toggleOpenMenu}>
        <nav className='navigation__menu'>
          <Link to='/' className={`navigation__menu-link link
          ${location.pathname === '/' ? 'navigation__menu-link_active' : ''}`}>Главная</Link>
          <Link to='/movies' className={`navigation__menu-link link
          ${location.pathname === '/movies' ? 'navigation__menu-link_active' : ''}`}>Фильмы</Link>
          <Link to='/saved-movies' className={`navigation__menu-link link
          ${location.pathname === '/saved-movies' ? 'navigation__menu-link_active' : ''}`}>Сохранённые фильмы</Link>
        </nav>

        <Link to='/profile' className='navigation__account-link'>Аккаунт</Link>

      </nav>
    </>

  );
}

export default Navigation;
