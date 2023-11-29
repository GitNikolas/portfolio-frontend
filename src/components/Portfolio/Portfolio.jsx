import { Link, useLocation } from 'react-router-dom';

function Portfolio() {

  return (
    <section
    className="portfolio"
    >
      <h3
      className="portfolio__title"
      >Портфолио</h3>

      <Link
      to='https://github.com/GitNikolas/how-to-learn'
      className='portfolio__link link'
      target='_blank'>Статичный сайт</Link>

      <Link
      to='https://github.com/GitNikolas/russian-travel'
      className='portfolio__link link'
      target='_blank'>Адаптивный сайт</Link>

      <Link
      to='https://github.com/GitNikolas/react-mesto-api-full-gha'
      className='portfolio__link link'
      target='_blank'>Одностраничное приложение</Link>

    </section>
  );
}

export default Portfolio;
