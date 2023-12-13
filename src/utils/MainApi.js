// const baseUrl = 'https://api.movies-explorer.pna.nomoredomainsrocks.ru';
const baseUrl = 'http://localhost:8080';

export async function register({ name, email, password }) {
  try{
    let response = await fetch(`${baseUrl}/register`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    console.log(response);
    if(response.status === 409) {
      throw new Error('Пользователь с таким email уже существует');
    }
    else if (!response.ok){
      throw new Error('Произошла ошибка, проверьте корректность введённых данных');
    }
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function login({ email, password }) {
  try{
    let response = await fetch(`${baseUrl}/login`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if(response.status === 401) {
      throw new Error('Неправильная почта или пароль');
    }
    else if (!response.ok){
      throw new Error('Произошла ошибка, проверьте корректность введённых данных');
    }
    let res = await response.json();
    localStorage.setItem('JWT', `${res.accessToken}`);
    localStorage.setItem('ownerId', `${res.user.id}`);
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function getUser() {
  try{
    let token = localStorage.getItem('JWT');
    let ownerId = localStorage.getItem('ownerId');
    let response = await fetch(`${baseUrl}/users/${ownerId}`, {
      method:'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(!response.ok){
      throw new Error('Необходима авторизация');
    };
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function patchUser({ name, email }) {
  try{
    let token = localStorage.getItem('JWT');
    let ownerId = localStorage.getItem('ownerId');
    let response = await fetch(`${baseUrl}/users/${ownerId}`, {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email }),
    });
    if(!response.ok){
      let message = await response.json();
      throw new Error(message.message);
    };
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function postFilm({ country, director, duration, year, description,
  image, trailerLink, id, nameRU, nameEN, }) {
  try{
    let ownerId = localStorage.getItem('ownerId');
    let response = await fetch(`${baseUrl}/movies`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ country, director, duration, year, description,
        image: `https://api.nomoreparties.co/${image.url}`,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        trailerLink,
        movieNumber: id,
        nameRU, nameEN,
        userId: ownerId,
        id: Number(ownerId + id)
      })
    });
     if (!response.ok){
      throw new Error('Произошла ошибка, проверьте корректность введённых данных');
    }
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function getUserFilms() {
  try{
    let ownerId = localStorage.getItem('ownerId');
    let response = await fetch(`${baseUrl}/movies?userId=${ownerId}`, {
      method:'GET'
    });
    if(!response.ok){
      throw new Error('Необходима авторизация');
    };
    let filmList = await response.json();
    return filmList;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function deleteFilm(movieId) {
  try{
    let response = await fetch(`${baseUrl}/movies/${movieId}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}
