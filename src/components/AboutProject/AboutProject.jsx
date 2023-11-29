import { Link, useLocation } from 'react-router-dom';

function AboutProject() {
  return (
    <section
      className="aboutProject"
    >
      <h2 className="title">О проекте</h2>
      <article className="aboutProject__table">
        <h3 className="aboutProject__table-title">Дипломный проект включал 5 этапов</h3>
        <p className="aboutProject__table-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="aboutProject__table-title">На выполнение диплома ушло 5 недель</h3>
        <p className="aboutProject__table-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>

      <div className="aboutProject__illustrarion">
        <p className="aboutProject__illustrarion-title aboutProject__illustrarion-title_type_1week">1 неделя</p>
        <p className="aboutProject__illustrarion-title aboutProject__illustrarion-title_type_4week">4 недели</p>
        <p className="aboutProject__illustrarion-subtitle">Back-end</p>
        <p className="aboutProject__illustrarion-subtitle">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
