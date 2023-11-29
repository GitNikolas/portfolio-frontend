import   { React, useState, useEffect } from 'react';
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login'
import NotFound from './404/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { useAuthorization } from './UseAuthorization/UseAuthorization';

function App() {

  const { isAuthorized, dataIsReady, currentUser, setCurrentUser, checkToken, logout } = useAuthorization();

  return (
    <CurrentUserContext.Provider value={{ currentUser, dataIsReady, setCurrentUser, isAuthorized }}>
      <div className="page">

      <Header />

      <div className="content">

        <Routes>

          <Route
          path='/'
          element={
          <Main />
          }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                isAuthorized={isAuthorized}
                component={Profile}
                logout={logout}
              />
            }
          />

          <Route
          path='/movies'
          element = {
            <ProtectedRoute
            isAuthorized={isAuthorized}
            component={Movies}
            />
          }
          />

          <Route
          path='/saved-movies'
          element = {
            <ProtectedRoute
            isAuthorized={isAuthorized}
            component={SavedMovies}
            />
          }
          />

          <Route
          path='/signup'
          element={
          <Register
          checkToken={checkToken}
          isAuthorized={isAuthorized}
          />
          }
          />

          <Route
          path='/signin'
          element={
          <Login
          checkToken={checkToken}
          isAuthorized={isAuthorized}
          />
          }
          />

          <Route
          path='*'
          element={
          <NotFound />
          }
          />

        </Routes>

      </div>

      <Footer />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
