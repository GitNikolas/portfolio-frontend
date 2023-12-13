import { Link } from 'react-router-dom';
import me from '../../images/IMG_20230907_095722.jpg'

function AboutMe() {
  return (
    <section
      className="aboutMe"
    >
      <h2 className='title'>Студент</h2>
      <div
      className="aboutMe__content"
      >
        <div className="aboutMe__profile">
          <p className="aboutMe__name">Николай</p>
          <p className="aboutMe__status">Студент курса "веб-разработчик", 25 лет</p>
          <p className="aboutMe__info">Я родился и живу в городе Чита. Люблю путешествовать. С 2019 года работаю в ОАО "РЖД", но решил сменить сферу деятельности и учусь Web-разработке. 😉</p>

          <Link
            to='https://github.com/GitNikolas'
            className="link"
            target='_blank'
          >Github</Link>
        </div>

        <img
          className="aboutMe__myPhoto"
          src={me}
          alt='Моё фото'
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
