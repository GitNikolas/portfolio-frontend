export async function getFilms() {
  try {
    let response = await fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      method: 'GET',
    });
    if (response.ok) {
      return response.json();
    };
    throw new Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};
