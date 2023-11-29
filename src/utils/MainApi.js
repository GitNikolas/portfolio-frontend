const baseUrl = 'https://api.movies-explorer.pna.nomoredomainsrocks.ru';

export async function register({ name, email, password }) {
  try{
    let response = await fetch(`${baseUrl}/signup`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
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
    let response = await fetch(`${baseUrl}/signin`, {
      method:'POST',
      credentials: 'include',
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
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function getUser() {
  try{
    let response = await fetch(`${baseUrl}/users/me`, {
      method:'GET',
      credentials: 'include',
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
    let response = await fetch(`${baseUrl}/users/me`, {
      method:'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
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

export async function signOut() {
  try{
    let response = await fetch(`${baseUrl}/signout`, {
      method:'POST',
      credentials: 'include',
    });
    if(!response.ok) {
      throw new Error('Необходима авторизация');
    }
    return response;
  } catch(err) {
    console.error(err);
    return err;
  }
}

export async function postFilm({ country, director, duration, year, description,
  image, trailerLink, id, nameRU, nameEN, }) {
  try{
    let response = await fetch(`${baseUrl}/movies`, {
      method:'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ country, director, duration, year, description,
        image: `https://api.nomoreparties.co/${image.url}`,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        trailerLink,
        movieId: id,
        nameRU, nameEN, })
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
    let response = await fetch(`${baseUrl}/movies`, {
      method:'GET',
      credentials: 'include',
    });
    if(!response.ok){
      throw new Error('Необходима авторизация');
    };
    return response.json();
  } catch(err) {
    console.error(err);
    return err.message;
  }
}

export async function deleteFilm(movieId) {
  try{
    let response = await fetch(`${baseUrl}/movies/${movieId}`, {
      method:'DELETE',
      credentials: 'include',
    });
    return response;
  } catch(err) {
    console.error(err);
    return err.message;
  }
}
