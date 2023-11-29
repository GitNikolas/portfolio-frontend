import { Link, useLocation } from 'react-router-dom';

function Footer() {
  let location = useLocation();

  return (
    <footer className={`footer ${location.pathname === '/signin' ? 'footer_display_none' : ''}
    ${location.pathname === '/signup' ? 'footer_display_none' : ''}
    ${location.pathname === '/profile' ? 'footer_display_none' : ''}`}>
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>

      <div className="footer__menu">
      <p className="footer__copyright">©2023</p>

      <nav className="footer__navigation">
        <Link
        className="link"
        to='https://practicum.yandex.ru/'
        target="_blank"
        >Яндекс.Практикум</Link>
        <Link
        className="link"
        to='https://github.com/'
        target="_blank"
        >Github</Link>
      </nav>
      </div>

      </footer>
  );
}

export default Footer;
