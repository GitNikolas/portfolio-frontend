import { Link, useLocation } from 'react-router-dom';

function Techs() {
  return (
    <section
      className="techs"
    >
      <h2 className="title">Технологии</h2>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <ul className="techs__list list-style">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
